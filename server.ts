import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// API endpoint for AI Plain Language Legal Explainer
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
  "plazoAbierto": "Explicación concreta del plazo legal que se abre en días hábiles (ej. 3 días hábiles para apelar auto, 5 días para contestar, 10 días para casación) y consecuencias de no cumplirlo.",
  "queHacer": [
    "Paso 1 concreto y accionable para el litigante o ciudadano",
    "Paso 2 concreto...",
    "Paso 3 concreto..."
  ],
  "terminosExplicados": [
    {"termino": "término técnico 1", "significado": "explicación simple"},
    {"termino": "término técnico 2", "significado": "explicación simple"}
  ],
  "explicacionQuechua": "Resumen fiel y accesible en idioma Quechua (Runasimi) para ciudadanos quechuahablantes.",
  "explicacionAimara": "Resumen fiel y accesible en idioma Aimara para ciudadanos aimarahablantes."
}`;

    const result = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = result.text || '{}';
    const parsed = JSON.parse(responseText);
    return res.json(parsed);
  } catch (error) {
    console.error('Error al llamar a Gemini API:', error);
    return res.status(500).json({ error: 'Error al generar explicación con IA' });
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
