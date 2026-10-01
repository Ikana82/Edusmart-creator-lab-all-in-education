import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini if key is provided
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      app: 'EduSmart Creator Lab'
    });
  });

  // Generic Gemini endpoint for generation
  app.post('/api/gemini/:type', async (req: Request, res: Response) => {
    const { type } = req.params;
    const payload = req.body;

    if (!ai) {
      // Return 200 with null so client fallback handler responds instantaneously
      return res.json({ result: null, note: 'Using domain-tuned offline generator' });
    }

    try {
      const prompt = `You are the lead educational content architect of EduSmart Creator Lab.
Generate high quality Indonesian educational structured content for tool type: "${type}".
Input Parameters: ${JSON.stringify(payload)}

Return a structured JSON object matching the standard EduSmart schema for this resource with Indonesian content, age-appropriate language, learning objectives, and image/video prompts in English suitable for AI tools. Return only valid JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const responseText = response.text || '';
      let parsed = null;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = { text: responseText };
      }

      return res.json({ result: parsed });
    } catch (err: unknown) {
      console.error('Gemini API Error:', err);
      return res.json({ result: null, error: String(err) });
    }
  });

  // Serve static or Vite middleware
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduSmart Creator Lab server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start EduSmart server:', err);
});
