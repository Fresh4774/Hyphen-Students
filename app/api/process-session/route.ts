import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  const { sessionId } = await request.json();
  
  const db = await getDB();
  const session = await db.get('sessions', sessionId);
  if (!session || !session.videoBlob) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  try {
    // 1. Extract audio from video
    const audioBlob = await extractAudio(session.videoBlob);
    
    // 2. Transcribe with Whisper
    const transcript = await transcribeAudio(audioBlob);
    session.transcript = transcript;
    
    // 3. Generate summary with GPT-4
    const summary = await generateSummary(transcript);
    session.summary = summary;
    
    // 4. Extract homework
    const homework = await extractHomework(transcript);
    session.homework = homework;
    
    // 5. Save to DB
    await db.put('sessions', session);
    
    // 6. Send email
    await sendEmail(session);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Processing failed:', error);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}

async function extractAudio(videoBlob: Blob): Promise<Blob> {
  // For browser environment, we'll send the video blob directly to Whisper
  // Whisper API accepts video files and extracts audio automatically
  return videoBlob;
}

async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const file = new File([audioBlob], 'audio.webm', { type: 'audio/webm' });
  
  const response = await openai.audio.transcriptions.create({
    file: file,
    model: 'whisper-1',
    language: 'en'
  });
  
  return response.text;
}

async function generateSummary(transcript: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a classroom assistant. Summarize this lecture highlighting key concepts, important definitions, and main takeaways. Format with clear headings.'
      },
      {
        role: 'user',
        content: transcript
      }
    ],
    temperature: 0.3
  });
  
  return response.choices[0].message.content || '';
}

async function extractHomework(transcript: string): Promise<string[]> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'Extract all homework assignments, deadlines, and action items from this lecture. Return as a JSON array of strings. If none found, return empty array.'
      },
      {
        role: 'user',
        content: transcript
      }
    ],
    response_format: { type: 'json_object' },
    temperature: 0
  });
  
  const result = JSON.parse(response.choices[0].message.content || '{}');
  return result.homework || [];
}