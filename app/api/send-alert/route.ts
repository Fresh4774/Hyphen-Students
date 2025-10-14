import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { message, timestamp } = await request.json();

  await resend.emails.send({
    from: 'SigmaSkibidi Alert <alerts@yourdomain.com>',
    to: process.env.TEACHER_EMAIL || process.env.STUDENT_EMAIL!,
    subject: '🚨 Classroom Alert',
    html: `
      <h2>Alert Detected</h2>
      <p><strong>${message}</strong></p>
      <p>Time: ${new Date(timestamp).toLocaleString()}</p>
    `
  });

  return NextResponse.json({ success: true });
}