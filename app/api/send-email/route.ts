import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email, transcript, summary } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Class Notes Summary',
      html: `
        <h2>Class Notes</h2>
        
        <h3>AI Summary</h3>
        <div style="white-space: pre-wrap;">${summary}</div>
        
        <hr>
        
        <h3>Full Transcript</h3>
        <div style="white-space: pre-wrap;">${transcript}</div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
  }
}