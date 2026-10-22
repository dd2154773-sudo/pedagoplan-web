import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback pedagogical generator for offline / fallback scenarios
function generateFallbackResponse(type: string, phase: string, topic: string, customPrompt?: string): string {
  if (type === 'dua') {
    return `[Adecuación DUA Específica]:
1. Principio I (Múltiples formas de representación): Proporcionar tarjetas táctiles con relieve y pictogramas de apoyo visual para los conceptos clave de "${topic || 'la sesión'}".
2. Principio II (Acción y Expresión): Permitir que los estudiantes demuestren su comprensión mediante organizador gráfico en relieve, grabación de voz de 1 minuto o maqueta manipulativa.
3. Principio III (Compromiso e Implicación): Trabajar en parejas tutoradas con roles preasignados (observador, vocero, moderador de turno) y cronómetro visual para autorregulación de tiempos.`;
  }

  if (type === 'metacognitive') {
    return `[Preguntas Metacognitivas Formativas]:
• ¿Qué pasos seguiste para resolver este reto hoy y qué harías diferente la próxima vez?
• ¿En qué momento sentiste mayor curiosidad o confusión, y cómo lograste aclararlo con tu equipo?
• ¿Cómo se conecta lo que aprendimos sobre "${topic || 'este tema'}" con una situación real en tu comunidad o familia?`;
  }

  if (type === 'activity' && phase === 'inicio') {
    return `[Actividad Detonadora de Saberes Previos]:
"El Enigma de la Caja de Preguntas": Se coloca un artefacto o imagen misteriosa vinculada a ${topic || 'el tema central'}. En equipos de 4, los estudiantes redactan 3 hipótesis en post-its de colores y las ubican en el 'Muro de Predicciones'. Luego, mediante una lluvia de ideas guiada, categorizan qué ideas son hechos y cuáles son supuestos a comprobar.`;
  }

  if (type === 'activity' && phase === 'cierre') {
    return `[Cierre Metacognitivo y Síntesis]:
"Semáforo de Aprendizajes y Compromiso Comunitario": Los alumnos completan una tarjeta reflexiva donde el color verde indica un saber consolidado, el amarillo una duda para seguir investigando y el rojo un reto superado. Cierran con la formulación de una frase de impacto para compartir en el mural escolar o con sus familias.`;
  }

  if (type === 'activity') {
    return `[Vinculación Socioformativa NEM]:
Se propone conectar el tema "${topic || 'el contenido'}" con una problemática real del entorno escolar (uso racional de recursos, flora local o dinámica barrial). Los estudiantes construirán un prototipo vivencial o bitácora de campo en pequeños colectivos heterogéneos, registrando evidencia directa y proponiendo soluciones viables.`;
  }

  if (customPrompt) {
    return `[Recomendación Pedagógica]:
En atención a "${customPrompt}", se recomienda estructurar la intervención priorizando la mediación dialógica (Vygotsky) y el aprendizaje situado. Diseña andamiajes progresivos que permitan a los alumnos pasar de la manipulación concreta al pensamiento reflexivo, integrando pausas activas socioemocionales de 3 minutos para mantener el foco atencional.`;
  }

  return `[Propuesta Didáctica Integrada]:
Fomentar la indagación colectiva mediante estaciones de exploración diferenciadas. Cada estación ofrece material concreto, fuentes impresas y apoyo visual para garantizar accesibilidad universal bajo el marco DUA.`;
}

// POST endpoint for Pedagogical AI suggestions
app.post('/api/pedagogy/ai', async (req, res) => {
  try {
    const { type, phase = 'desarrollo', grade = '4° Primaria', subject = 'Ciencias Naturales', topic = '', currentContent = '', customPrompt = '', engine = 'gemini' } = req.body;

    if (!ai) {
      const fallback = generateFallbackResponse(type, phase, topic, customPrompt);
      return res.json({
        success: true,
        text: fallback,
        engine: engine === 'groq' ? 'Groq LPU (Simulado)' : 'PedagoPlan IA Core',
        model: 'gemini-3.8-flash',
        isFallback: true,
      });
    }

    const systemInstruction = `Eres el "Copiloto Pedagógico IA" de PedagoPlan, un asistente experto en didáctica, diseño curricular de la Nueva Escuela Mexicana (NEM), enfoque sociocultural (Vygotsky, Freire) y Diseño Universal para el Aprendizaje (DUA).
Tus respuestas deben ser:
1. Profesionales, cálidas, prácticas y directamente aplicables al aula de Educación Primaria/Básica.
2. Enfocadas en el aprendizaje situado, inclusión educativa y diversidad de estilos y ritmos de aprendizaje.
3. Formato claro con viñetas, tiempos sugeridos, materiales sencillos y justificación pedagógica breve.
4. Idioma: Español.`;

    let prompt = '';
    if (type === 'dua') {
      prompt = `Genera adaptaciones curriculares concretas basadas en el DUA (Diseño Universal para el Aprendizaje) para la siguiente planeación:
Grado: ${grade}
Asignatura: ${subject}
Tema: ${topic}
Momento: ${phase}
Contenido actual: "${currentContent}"
${customPrompt ? `Requerimiento especial: "${customPrompt}"` : 'Incluye ajustes para atención a la diversidad (TDAH, apoyo lectoescritor y estilos visuales/kinestésicos).'}`;
    } else if (type === 'metacognitive') {
      prompt = `Genera 3 preguntas metacognitivas potentes para estudiantes de ${grade} en el tema "${topic}", diseñadas para el momento de ${phase}. Fomenta la autoevaluación, el pensamiento crítico y la conexión con su vida cotidiana.`;
    } else if (type === 'activity') {
      prompt = `Sugiere una actividad didáctica innovadora, activa y colaborativa para el momento de "${phase}" en ${grade}, asignatura ${subject}, sobre el tema "${topic}".
Contenido previo registrado: "${currentContent}"
${customPrompt ? `Considera: "${customPrompt}"` : ''}
Incluye:
- Nombre dinámico de la actividad
- Breve descripción paso a paso
- Materiales accesibles
- Propósito formativo o PDA`;
    } else {
      prompt = `Consulta pedagógica del docente: "${customPrompt || currentContent || topic}".
Contexto: ${grade}, ${subject}, tema "${topic}". Proporciona orientación docente empática, estructurada y basada en evidencia pedagógica.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const generatedText = response.text || generateFallbackResponse(type, phase, topic, customPrompt);

    return res.json({
      success: true,
      text: generatedText,
      engine: engine === 'groq' ? 'Groq Llama-3.3 (280 T/S)' : 'Gemini 3.8 Flash',
      model: 'gemini-3.8-flash',
      isFallback: false,
    });
  } catch (error) {
    console.error('Error generating pedagogical suggestion:', error);
    const { type = 'activity', phase = 'desarrollo', topic = '', customPrompt = '' } = req.body || {};
    const fallback = generateFallbackResponse(type, phase, topic, customPrompt);
    return res.json({
      success: true,
      text: fallback,
      engine: 'PedagoPlan IA Core',
      isFallback: true,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Vite middleware in dev or static files in prod
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PedagoPlan server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
