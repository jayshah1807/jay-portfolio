export const config = { runtime: 'edge' };

export default async function handler(req) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { system, messages } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'No messages provided.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Build OpenAI messages array — system prompt goes as first message with role "system"
  const openAiMessages = [
    { role: 'system', content: system || '' },
    ...messages,
  ];

  try {
    const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 1000,
        temperature: 0.7,
        messages: openAiMessages,
      }),
    });

    if (!openAiRes.ok) {
      const err = await openAiRes.text();
      console.error('OpenAI error:', err);
      return new Response(JSON.stringify({ error: 'AI service error. Try again shortly.' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await openAiRes.json();
    const reply = data.choices?.[0]?.message?.content ?? 'No response received.';

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    console.error('Proxy error:', err);
    return new Response(JSON.stringify({ error: 'Unexpected server error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}