
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Conexión con Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

// Estado compartido de la aplicación (expedientes y agenda).
// Estas rutas usan la clave de servicio exclusivamente en el servidor.
app.get('/api/estado', async (_req: Request, res: Response) => {
  try {
    if (!supabase) {
      return res.status(503).json({ error: 'Supabase no está configurado en el servidor.' });
    }
    const { data, error } = await supabase
      .from('cej1_datos_compartidos')
      .select('contenido')
      .eq('clave', 'principal')
      .maybeSingle();

    if (error) {
      console.error('Error al consultar estado compartido:', error.message);
      return res.status(500).json({ error: 'No se pudo consultar el estado compartido.' });
    }
    return res.json({ contenido: data?.contenido ?? null });
  } catch (error) {
    console.error('Error al consultar estado compartido:', error);
    return res.status(500).json({ error: 'Ocurrió un error al consultar el estado compartido.' });
  }
});

app.put('/api/estado', async (req: Request, res: Response) => {
  try {
    if (!supabase) {
      return res.status(503).json({ error: 'Supabase no está configurado en el servidor.' });
    }
    const { expedientes, agendaMagistrados } = req.body ?? {};
    if (!Array.isArray(expedientes) || !Array.isArray(agendaMagistrados)) {
      return res.status(400).json({ error: 'El estado debe incluir expedientes y agendaMagistrados como listas.' });
    }

    const { error } = await supabase
      .from('cej1_datos_compartidos')
      .upsert({
        clave: 'principal',
        contenido: { expedientes, agendaMagistrados },
        actualizado_en: new Date().toISOString(),
      }, { onConflict: 'clave' });

    if (error) {
      console.error('Error al guardar estado compartido:', error.message);
      return res.status(500).json({ error: 'No se pudo guardar el estado compartido.' });
    }
    return res.json({ guardado: true });
  } catch (error) {
    console.error('Error al guardar estado compartido:', error);
    return res.status(500).json({ error: 'Ocurrió un error al guardar el estado compartido.' });
  }
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (file.mimetype !== 'application/pdf') {
      callback(new Error('Solo se permiten archivos PDF.'));
      return;
    }
    callback(null, true);
  },
});

// Subir un PDF y registrar sus datos
app.post(
  '/api/documentos',
  upload.single('archivo'),
  async (req: Request, res: Response) => {
    let rutaSubida: string | null = null;

    try {
      if (!supabase) {
        return res.status(503).json({
          error: 'Supabase no está configurado en el servidor.',
        });
      }

      const archivo = req.file;
      const { expedienteId, resolucionId, nombre, subidoPor } = req.body;

      if (!archivo) {
        return res.status(400).json({
          error: 'Debes seleccionar un archivo PDF.',
        });
      }

      if (!expedienteId || !resolucionId || !nombre) {
        return res.status(400).json({
          error: 'Faltan datos del expediente, resolución o documento.',
        });
      }

      const id = `arch-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;

      rutaSubida = `${id}.pdf`;

      const { error: errorStorage } = await supabase.storage
        .from('documentos-cej')
        .upload(rutaSubida, archivo.buffer, {
          contentType: 'application/pdf',
          upsert: false,
        });

      if (errorStorage) {
        console.error('Error de almacenamiento:', errorStorage.message);
        return res.status(500).json({
          error: 'No se pudo guardar el PDF en Supabase Storage.',
        });
      }

      const { error: errorTabla } = await supabase
        .from('documentos_cej')
        .insert({
          id,
          expediente_id: String(expedienteId),
          resolucion_id: String(resolucionId),
          nombre: String(nombre),
          tipo: 'application/pdf',
          tamano: `${(archivo.size / (1024 * 1024)).toFixed(2)} MB`,
          ruta_storage: rutaSubida,
          subido_por: subidoPor ? String(subidoPor) : null,
        });

      if (errorTabla) {
        console.error('Error al registrar documento:', errorTabla.message);
        await supabase.storage
          .from('documentos-cej')
          .remove([rutaSubida]);

        return res.status(500).json({
          error: 'El archivo se subió, pero no se pudo registrar.',
        });
      }

      const { data: urlPublica } = supabase.storage
        .from('documentos-cej')
        .getPublicUrl(rutaSubida);

      return res.status(201).json({
        id,
        nombre: String(nombre),
        tipo: 'PDF',
        tamano: `${(archivo.size / (1024 * 1024)).toFixed(2)} MB`,
        dataUrl: urlPublica.publicUrl,
        fechaSubida: new Date().toISOString().slice(0, 10),
        subidoPor: subidoPor ? String(subidoPor) : '',
      });
    } catch (error) {
      console.error('Error al guardar documento:', error);

      if (rutaSubida && supabase) {
        await supabase.storage
          .from('documentos-cej')
          .remove([rutaSubida])
          .catch(() => undefined);
      }

      return res.status(500).json({
        error: 'Ocurrió un error al guardar el documento.',
      });
    }
  }
);

// Consultar los documentos de una resolución
app.get('/api/documentos', async (req: Request, res: Response) => {
  try {
    if (!supabase) {
      return res.status(503).json({
        error: 'Supabase no está configurado en el servidor.',
      });
    }

    const { expedienteId, resolucionId } = req.query;

    if (!expedienteId || !resolucionId) {
      return res.status(400).json({
        error: 'Debes indicar expedienteId y resolucionId.',
      });
    }

    const { data, error } = await supabase
      .from('documentos_cej')
      .select('*')
      .eq('expediente_id', String(expedienteId))
      .eq('resolucion_id', String(resolucionId))
      .order('fecha_subida', { ascending: false });

    if (error) {
      console.error('Error al consultar documentos:', error.message);
      return res.status(500).json({
        error: 'No se pudieron consultar los documentos.',
      });
    }

    const documentos = (data || []).map((doc) => {
      const { data: urlPublica } = supabase.storage
        .from('documentos-cej')
        .getPublicUrl(doc.ruta_storage);

      return {
        id: doc.id,
        nombre: doc.nombre,
        tipo: doc.tipo,
        tamano: doc.tamano,
        dataUrl: urlPublica.publicUrl,
        fechaSubida: doc.fecha_subida,
        subidoPor: doc.subido_por || '',
      };
    });

    return res.json(documentos);
  } catch (error) {
    console.error('Error al consultar documentos:', error);
    return res.status(500).json({
      error: 'Ocurrió un error al consultar los documentos.',
    });
  }
});

// Explicación de resoluciones mediante IA
app.post('/api/ai-explain', async (req: Request, res: Response) => {
  try {
    const { tipo, titulo, contenido, materia } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY no configurada. Usando motor judicial local.',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Eres un asistente judicial experto en derecho procesal peruano y en lenguaje claro y accesible para ciudadanos.
Tu objetivo es traducir la siguiente resolución judicial a un lenguaje que cualquier persona sin formación legal entienda a la perfección, calcular con precisión el plazo que abre y dar instrucciones claras.

Datos de la resolución:
- Tipo: ${tipo} (DECRETO, AUTO o SENTENCIA)
- Título: ${titulo}
- Materia: ${materia || 'General'}
- Texto judicial íntegro:
"""
${contenido}
"""

Responde ESTRICTAMENTE con un objeto JSON válido (sin bloques de código markdown, solo el JSON) con la siguiente estructura:
{
  "enCristiano": "Explicación breve, cálida y directa en 2-3 párrafos en lenguaje cotidiano de qué significa esta resolución y qué decidió el juzgado.",
  "plazoAbierto": "Explicación concreta del plazo legal que se abre en días hábiles y consecuencias de no cumplirlo.",
  "queHacer": [
    "Paso 1 concreto y accionable para el litigante o ciudadano",
    "Paso 2 concreto...",
    "Paso 3 concreto..."
  ],
  "terminosExplicados": [
    {"termino": "término técnico 1", "significado": "explicación simple"},
    {"termino": "término técnico 2", "significado": "explicación simple"}
  ],
  "explicacionQuechua": "Resumen fiel y accesible en idioma Quechua (Runasimi).",
  "explicacionAimara": "Resumen fiel y accesible en idioma Aimara."
}`;

    const result = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(result.text || '{}');
    return res.json(parsed);
  } catch (error) {
    console.error('Error al llamar a Gemini API:', error);
    return res.status(500).json({
      error: 'Error al generar explicación con IA',
    });
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
