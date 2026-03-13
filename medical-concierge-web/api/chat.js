// POST /api/chat — Proxies user messages to Claude API for AI medical concierge responses
// Rate-limited to 10 requests per minute per IP (in-memory store)

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';
const MAX_TOKENS = 1024;

// ── In-memory rate limiter ──────────────────────────────────────────────────
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  // Reset window if expired
  if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

// Periodic cleanup to prevent memory leak (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// ── System prompt ───────────────────────────────────────────────────────────
const LANGUAGE_INSTRUCTIONS = {
  en: 'Respond in English.',
  th: 'Respond in Thai (ภาษาไทย). Use polite Thai language with appropriate particles.',
  cn: 'Respond in Simplified Chinese (简体中文).',
};

function buildSystemPrompt(language) {
  const langInstruction = LANGUAGE_INSTRUCTIONS[language] || LANGUAGE_INSTRUCTIONS.en;

  return `You are the AI medical concierge assistant for Bioconnext, a premium medical tourism concierge service based in Thailand.

Company context:
- Bioconnext partners with JCI-accredited hospitals across Bangkok including Bumrungrad International, Bangkok Heart Institute, Samitivej, and MedPark Hospital.
- We coordinate care with 50+ board-certified specialist doctors across cardiology, orthopedics, oncology, neurology, stem cell therapy, cosmetic surgery, and dental care.
- Services include: specialist appointment booking, VIP airport transport, medical record translation, second opinion coordination, post-surgery nursing care, hotel accommodation, visa assistance, and dedicated language interpreters.
- Pricing is transparent and all-inclusive. Typical ranges: Cardiac $20,000-$35,000, Orthopedic $12,000-$20,000, Stem Cell $10,000-$18,000, Cosmetic $5,000-$15,000, Dental from $800.

${langInstruction}

Critical rules:
- NEVER provide medical diagnoses, prescribe medications, or give specific medical advice.
- ALWAYS recommend consulting with a qualified specialist for medical questions.
- Be warm, professional, and reassuring. You are a concierge, not a doctor.
- When discussing costs, always mention that final pricing depends on individual assessment.
- At the end of each response, suggest 2-4 relevant next actions the user might want to take.
- Keep responses concise but helpful — aim for 2-4 paragraphs maximum.
- Format suggestions as a JSON array of short action strings at the end of your response, on a new line prefixed with "SUGGESTIONS:" — for example: SUGGESTIONS:["Book Appointment","Get Cost Estimate","Upload Records"]`;
}

// ── Handler ─────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'https://bio.techdev.in.th');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Body size limit
  const bodyStr = JSON.stringify(req.body);
  if (bodyStr.length > 50 * 1024) {
    return res.status(413).json({ error: 'Request payload too large.' });
  }

  // Rate limiting
  const ip = req.headers['x-real-ip'] || (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a moment before trying again.',
      retryAfterSeconds: 60,
    });
  }

  // Validate API key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('[api/chat] ANTHROPIC_API_KEY is not configured');
    return res.status(500).json({
      error: 'AI service is not configured. Please contact support.',
    });
  }

  // Parse and validate request body
  const { messages, language = 'en' } = req.body || {};

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      error: 'Invalid request: messages array is required and must not be empty.',
    });
  }

  if (messages.length > 20) {
    return res.status(400).json({ error: 'Maximum 20 messages per request.' });
  }

  // Validate each message has role and content
  for (const msg of messages) {
    if (!msg.role || !msg.content) {
      return res.status(400).json({
        error: 'Invalid request: each message must have a "role" and "content" field.',
      });
    }
    if (!['user', 'assistant'].includes(msg.role)) {
      return res.status(400).json({
        error: 'Invalid request: message role must be "user" or "assistant".',
      });
    }
    if (typeof msg.content !== 'string' || msg.content.length > 4000) {
      return res.status(400).json({ error: 'Each message must be a string under 4000 characters.' });
    }
  }

  // Validate language
  const validLanguages = ['en', 'th', 'cn'];
  const lang = validLanguages.includes(language) ? language : 'en';

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: buildSystemPrompt(lang),
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[api/chat] Anthropic API error ${response.status}:`, errorBody);

      if (response.status === 429) {
        return res.status(429).json({
          error: 'AI service is temporarily busy. Please try again in a moment.',
        });
      }

      return res.status(502).json({
        error: 'AI service is temporarily unavailable. Please try again later.',
      });
    }

    const data = await response.json();
    const fullText = data.content?.[0]?.text || '';

    // Parse suggestions from the response
    let reply = fullText;
    let suggestions = [];

    const suggestionsMatch = fullText.match(/SUGGESTIONS:\s*(\[.*\])\s*$/s);
    if (suggestionsMatch) {
      try {
        suggestions = JSON.parse(suggestionsMatch[1]);
        reply = fullText.slice(0, suggestionsMatch.index).trim();
      } catch {
        // If parsing fails, keep full text as reply with no suggestions
        suggestions = [];
      }
    }

    // Fallback suggestions if none were parsed
    if (suggestions.length === 0) {
      suggestions = ['Book Appointment', 'Get Cost Estimate', 'Find a Specialist'];
    }

    return res.status(200).json({ reply, suggestions });
  } catch (error) {
    console.error('[api/chat] Unexpected error:', error);
    return res.status(500).json({
      error: 'An unexpected error occurred. Please try again later.',
    });
  }
}
