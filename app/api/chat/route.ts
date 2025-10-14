import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { NextRequest } from 'next/server';
import { getDB } from '@/lib/db';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  const { messages } = await request.json();
  const userMessage = messages[messages.length - 1].content;

  // Get all session transcripts as context
  const db = await getDB();
  const sessions = await db.getAll('sessions');
  
  const context = sessions
    .filter(s => s.transcript)
    .map(s => `[${new Date(s.startTime).toLocaleDateString()}]\n${s.transcript}`)
    .join('\n\n');

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `You are a helpful classroom assistant. Answer questions based on these class transcripts:\n\n${context}`
      },
      ...messages
    ]
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}