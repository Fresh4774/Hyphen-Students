import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { image, type } = await request.json();

    const systemPrompt = type === 'quick' 
      ? 'You are an AI that analyzes images and provides a quick, concise summary of what you see. Focus on key information.'
      : 'You are an AI that analyzes educational images (whiteboards, textbooks, worksheets). Extract all text, explain diagrams and formulas in detail, and provide comprehensive notes.';

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: image }
            },
            {
              type: 'text',
              text: type === 'quick' ? 'Provide a quick summary of this image.' : 'Extract text, explain diagrams and formulas, and provide detailed notes from this image.'
            }
          ]
        }
      ],
    });

    return NextResponse.json({ analysis: completion.choices[0].message.content });
  } catch (error) {
    console.error('Vision analysis error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}