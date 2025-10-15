import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { transcript } = await request.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant that summarizes class lectures. Extract and organize: 1) Main topics covered, 2) Homework assignments with deadlines, 3) Important student questions, 4) Key notes and concepts. Format clearly with headers.'
        },
        {
          role: 'user',
          content: `Summarize this class transcript:\n\n${transcript}`
        }
      ],
    });

    return NextResponse.json({ summary: completion.choices[0].message.content });
  } catch (error) {
    console.error('Summary error:', error);
    return NextResponse.json({ error: 'Summary failed' }, { status: 500 });
  }
}