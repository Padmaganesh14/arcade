import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);

interface PortraitRequestBody {
  name?: string;
  characterClass?: string;
  ancestry?: string;
  title?: string;
  alignment?: string;
  weapon?: string;
  curio?: string;
  appearance?: string;
  classVisual?: string;
  ancestryVisual?: string;
  variation?: number;
}

const VARIATION_COMPOSITIONS = [
  'Dynamic three-quarter hero portrait inside a candlelit stone alchemy chamber, confident determined expression, warm amber lantern light contrasting with faint mystical violet aura.',
  'Bold stylized action bust portrait, dramatic side-lit pose mid-gesture with swirling arcane purple sparks and glowing golden motes, focused battle-ready gaze.',
  'Close-up expressive character card portrait framed by ancient tarnished bronze astrolabe arches, slight knowing smirk, rich twilight indigo shadows and golden rim light.',
  'Heroic waist-up RPG character portrait on a windswept castle parapet at dusk, dramatic low-angle perspective, violet storm clouds and warm torchlight.',
  'Intricate alchemist-sanctum portrait surrounded by glowing potion vials and ancient brass instruments, calm enigmatic expression, emerald and amethyst reflections.',
  'Vibrant stylized tavern-guild portrait with warm hearth glow on one side and cool moonlight on the other, lively adventurous posture and expressive eyes.',
  'Dramatic front-facing RPG dialogue portrait with magical runes floating softly in the dark background, intense heroic gaze, ornate bronze and purple highlights.',
  'Atmospheric painterly side-angle portrait glancing over the shoulder, enchanted dust motes drifting through shafts of amber light in an ancient library.',
];

const POSE_VARIATIONS = [
  'chest-up heroic portrait facing slightly right',
  'dynamic angled three-quarter action stance wielding signature gear',
  'intense close-up portrait leaning forward slightly toward the viewer',
  'regal standing waist-up pose with one hand raised near arcane energy',
  'spirited over-the-shoulder glance with dramatic cloak or mantle sweep',
];

function getAiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    throw new Error('MISSING_API_KEY');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function buildPortraitPrompt(body: PortraitRequestBody): { prompt: string; variationIndex: number } {
  const name = (body.name || 'Unnamed Adventurer').trim();
  const characterClass = (body.characterClass || 'Alchemist').trim();
  const ancestry = (body.ancestry || 'Human').trim();
  const title = (body.title || '').trim();
  const weapon = (body.weapon || 'enchanted weapon').trim();
  const curio = (body.curio || 'glowing alchemical vial').trim();
  const appearance = (body.appearance || '').trim();
  const classVisual = (body.classVisual || '').trim();
  const ancestryVisual = (body.ancestryVisual || '').trim();
  const rawVariation = typeof body.variation === 'number' && Number.isFinite(body.variation)
    ? Math.max(0, Math.floor(body.variation))
    : 0;

  const composition = VARIATION_COMPOSITIONS[rawVariation % VARIATION_COMPOSITIONS.length];
  const poseCue = POSE_VARIATIONS[rawVariation % POSE_VARIATIONS.length];
  const variantFlavor =
    rawVariation === 0
      ? `Pose: ${poseCue}. Signature iconic hero portrait.`
      : `Pose: ${poseCue}. Alternative artistic variation #${rawVariation + 1}: render a distinctly different pose, facial expression, camera angle, and background lighting from previous portraits of this character.`;

  const promptParts = [
    `Cartoon video game-style fantasy RPG character portrait of "${name}", a ${ancestry} ${characterClass}${title ? ` (${title})` : ''}.`,
    'Art style: stylized hand-painted 2D video game character art and expressive fantasy cartoon illustration, crisp clean ink linework, rich cel-shaded painterly rendering, vibrant colors, clear facial features, no text or watermarks or UI borders.',
    ancestryVisual ? `Ancestry traits: ${ancestryVisual}.` : '',
    classVisual ? `Class attire and silhouette: ${classVisual}.` : '',
    appearance ? `Distinctive appearance: ${appearance}.` : '',
    `Signature gear visible in portrait: ${weapon} and ${curio}.`,
    `Composition & lighting: ${composition}`,
    variantFlavor,
  ].filter(Boolean);

  return {
    prompt: promptParts.join(' '),
    variationIndex: rawVariation,
  };
}

function formatApiError(err: unknown): { status: number; message: string } {
  const rawMessage = err instanceof Error ? err.message : String(err);

  if (rawMessage === 'MISSING_API_KEY') {
    return {
      status: 400,
      message:
        'Gemini API key is not configured. Please check or select your API key in the Settings > Secrets panel.',
    };
  }

  if (rawMessage.includes('PERMISSION_DENIED') || rawMessage.includes('API_KEY_INVALID') || rawMessage.includes('403') || rawMessage.includes('401')) {
    return {
      status: 403,
      message:
        'API key permission denied or invalid. Please check or select a valid paid API key in the Settings > Secrets panel.',
    };
  }

  if (rawMessage.includes('RESOURCE_EXHAUSTED') || rawMessage.includes('429')) {
    return {
      status: 429,
      message:
        'Image generation quota exceeded. This feature uses a paid image model—please select a billing-enabled API key in the Settings > Secrets panel.',
    };
  }

  if (rawMessage.includes('NOT_FOUND') || rawMessage.includes('404')) {
    return {
      status: 404,
      message: 'The image generation model could not be reached. Please verify model availability.',
    };
  }

  return {
    status: 500,
    message: rawMessage || 'Failed to generate character portrait.',
  };
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.post('/api/generate-portrait', async (req, res) => {
    try {
      const body = (req.body ?? {}) as PortraitRequestBody;
      if (!body.name || !body.characterClass) {
        res.status(400).json({ error: 'Character name and class are required to generate a portrait.' });
        return;
      }

      const ai = getAiClient();
      const { prompt, variationIndex } = buildPortraitPrompt(body);

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: '1:1',
          },
        },
      });

      const parts = response.candidates?.[0]?.content?.parts ?? [];
      let imageUrl: string | null = null;
      for (const part of parts) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType ?? 'image/png';
          imageUrl = `data:${mime};base64,${part.inlineData.data}`;
          break;
        }
      }

      if (!imageUrl) {
        res.status(502).json({
          error: 'The alchemical mirror returned no image data. Please try regenerating the portrait.',
        });
        return;
      }

      res.json({
        imageUrl,
        variation: variationIndex,
        characterName: body.name,
        characterClass: body.characterClass,
      });
    } catch (err) {
      const { status, message } = formatApiError(err);
      res.status(status).json({ error: message });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Arcanum Forge server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
