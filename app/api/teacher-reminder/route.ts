import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type');
  
  let text = '';
  
  if (contentType?.includes('multipart/form-data')) {
    const formData = await request.formData();
    const audio = formData.get('audio') as Blob;
    
    // Transcribe voice
    const file = new File([audio], 'audio.webm', { type: 'audio/webm' });
    const transcription = await openai.audio.transcriptions.create({
      file,
      model: 'whisper-1'
    });
    text = transcription.text;
  } else {
    const body = await request.json();
    text = body.text;
  }

  // Parse with GPT-4 to extract homework/deadlines
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'Extract homework assignments and deadlines. Return JSON: {assignments: [{task: string, deadline: string}]}'
      },
      { role: 'user', content: text }
    ],
    response_format: { type: 'json_object' }
  });

  const parsed = JSON.parse(response.choices[0].message.content || '{}');
  
  // Store in database or send immediate notification
  // Implementation depends on your notification system
  
  return NextResponse.json({ success: true, parsed });
}