import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  const { photoId } = await request.json();
  
  const db = await getDB();
  const photo = await db.get('photos', photoId);
  if (!photo) {
    return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
  }

  const base64 = await blobToBase64(photo.blob);

  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Extract all text, explain diagrams, formulas, and key concepts from this classroom note/whiteboard.'
          },
          {
            type: 'image_url',
            image_url: { url: `data:image/jpeg;base64,${base64}` }
          }
        ]
      }
    ],
    max_tokens: 1000
  });

  const analysis = response.choices[0].message.content;
  photo.analysis = analysis || '';
  await db.put('photos', photo);

  return NextResponse.json({ analysis });
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}