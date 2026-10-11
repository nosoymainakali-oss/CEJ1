// server.ts
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
dotenv.config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
app.use(express.json({ limit: "10mb" }));
var supabaseUrl = process.env.SUPABASE_URL;
var supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
var supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
var upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (file.mimetype !== "application/pdf") {
      callback(new Error("Solo se permiten archivos PDF."));
      return;
    }
    callback(null, true);
  }
});
app.post(
  "/api/documentos",
  upload.single("archivo"),
  async (req, res) => {
    let rutaSubida = null;
    try {
      if (!supabase) {
        return res.status(503).json({
          error: "Supabase no est\xE1 configurado en el servidor."
        });
      }
      const archivo = req.file;
      const { expedienteId, resolucionId, nombre, subidoPor } = req.body;
      if (!archivo) {
        return res.status(400).json({
          error: "Debes seleccionar un archivo PDF."
        });
      }
      if (!expedienteId || !resolucionId || !nombre) {
        return res.status(400).json({
          error: "Faltan datos del expediente, resoluci\xF3n o documento."
        });
      }
      const id = `arch-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      rutaSubida = `${id}.pdf`;
      const { error: errorStorage } = await supabase.storage.from("documentos-cej").upload(rutaSubida, archivo.buffer, {
        contentType: "application/pdf",
        upsert: false
      });
      if (errorStorage) {
        console.error("Error de almacenamiento:", errorStorage.message);
        return res.status(500).json({
          error: "No se pudo guardar el PDF en Supabase Storage."
        });
      }
      const { error: errorTabla } = await supabase.from("documentos_cej").insert({
        id,
        expediente_id: String(expedienteId),
        resolucion_id: String(resolucionId),
        nombre: String(nombre),
        tipo: "application/pdf",
        tamano: `${(archivo.size / (1024 * 1024)).toFixed(2)} MB`,
        ruta_storage: rutaSubida,
        subido_por: subidoPor ? String(subidoPor) : null
      });
      if (errorTabla) {
        console.error("Error al registrar documento:", errorTabla.message);
        await supabase.storage.from("documentos-cej").remove([rutaSubida]);
        return res.status(500).json({
          error: "El archivo se subi\xF3, pero no se pudo registrar."
        });
      }
      const { data: urlPublica } = supabase.storage.from("documentos-cej").getPublicUrl(rutaSubida);
      return res.status(201).json({
        id,
        nombre: String(nombre),
        tipo: "PDF",
        tamano: `${(archivo.size / (1024 * 1024)).toFixed(2)} MB`,
        dataUrl: urlPublica.publicUrl,
        fechaSubida: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        subidoPor: subidoPor ? String(subidoPor) : ""
      });
    } catch (error) {
      console.error("Error al guardar documento:", error);
      if (rutaSubida && supabase) {
        await supabase.storage.from("documentos-cej").remove([rutaSubida]).catch(() => void 0);
      }
      return res.status(500).json({
        error: "Ocurri\xF3 un error al guardar el documento."
      });
    }
  }
);
app.get("/api/documentos", async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({
        error: "Supabase no est\xE1 configurado en el servidor."
      });
    }
    const { expedienteId, resolucionId } = req.query;
    if (!expedienteId || !resolucionId) {
      return res.status(400).json({
        error: "Debes indicar expedienteId y resolucionId."
      });
    }
    const { data, error } = await supabase.from("documentos_cej").select("*").eq("expediente_id", String(expedienteId)).eq("resolucion_id", String(resolucionId)).order("fecha_subida", { ascending: false });
    if (error) {
      console.error("Error al consultar documentos:", error.message);
      return res.status(500).json({
        error: "No se pudieron consultar los documentos."
      });
    }
    const documentos = (data || []).map((doc) => {
      const { data: urlPublica } = supabase.storage.from("documentos-cej").getPublicUrl(doc.ruta_storage);
      return {
        id: doc.id,
        nombre: doc.nombre,
        tipo: doc.tipo,
        tamano: doc.tamano,
        dataUrl: urlPublica.publicUrl,
        fechaSubida: doc.fecha_subida,
        subidoPor: doc.subido_por || ""
      };
    });
    return res.json(documentos);
  } catch (error) {
    console.error("Error al consultar documentos:", error);
    return res.status(500).json({
      error: "Ocurri\xF3 un error al consultar los documentos."
    });
  }
});
app.post("/api/ai-explain", async (req, res) => {
  try {
    const { tipo, titulo, contenido, materia } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: "GEMINI_API_KEY no configurada. Usando motor judicial local."
      });
    }
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Eres un asistente judicial experto en derecho procesal peruano y en lenguaje claro y accesible para ciudadanos.
Tu objetivo es traducir la siguiente resoluci\xF3n judicial a un lenguaje que cualquier persona sin formaci\xF3n legal entienda a la perfecci\xF3n, calcular con precisi\xF3n el plazo que abre y dar instrucciones claras.

Datos de la resoluci\xF3n:
- Tipo: ${tipo} (DECRETO, AUTO o SENTENCIA)
- T\xEDtulo: ${titulo}
- Materia: ${materia || "General"}
- Texto judicial \xEDntegro:
"""
${contenido}
"""

Responde ESTRICTAMENTE con un objeto JSON v\xE1lido (sin bloques de c\xF3digo markdown, solo el JSON) con la siguiente estructura:
{
  "enCristiano": "Explicaci\xF3n breve, c\xE1lida y directa en 2-3 p\xE1rrafos en lenguaje cotidiano de qu\xE9 significa esta resoluci\xF3n y qu\xE9 decidi\xF3 el juzgado.",
  "plazoAbierto": "Explicaci\xF3n concreta del plazo legal que se abre en d\xEDas h\xE1biles y consecuencias de no cumplirlo.",
  "queHacer": [
    "Paso 1 concreto y accionable para el litigante o ciudadano",
    "Paso 2 concreto...",
    "Paso 3 concreto..."
  ],
  "terminosExplicados": [
    {"termino": "t\xE9rmino t\xE9cnico 1", "significado": "explicaci\xF3n simple"},
    {"termino": "t\xE9rmino t\xE9cnico 2", "significado": "explicaci\xF3n simple"}
  ],
  "explicacionQuechua": "Resumen fiel y accesible en idioma Quechua (Runasimi).",
  "explicacionAimara": "Resumen fiel y accesible en idioma Aimara."
}`;
    const result = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    const parsed = JSON.parse(result.text || "{}");
    return res.json(parsed);
  } catch (error) {
    console.error("Error al llamar a Gemini API:", error);
    return res.status(500).json({
      error: "Error al generar explicaci\xF3n con IA"
    });
  }
});
async function startServer() {
  const isProduction = process.env.NODE_ENV === "production";
  if (!isProduction) {
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
startServer();
