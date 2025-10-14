import { Resend } from 'resend';
import { ClassSession } from './db';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(session: ClassSession) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #2563eb; }
          h2 { color: #1e40af; margin-top: 20px; }
          .homework { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; }
          .summary { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>📚 Class Summary - ${new Date(session.startTime).toLocaleDateString()}</h1>
          
          <h2>Summary</h2>
          <div class="summary">
            ${session.summary?.replace(/\n/g, '<br>') || 'No summary available'}
          </div>
          
          ${session.homework && session.homework.length > 0 ? `
            <h2>Homework & Assignments</h2>
            <div class="homework">
              <ul>
                ${session.homework.map((hw: any) => `<li>${hw}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          <p><small>Duration: ${Math.round((session.endTime! - session.startTime) / 60000)} minutes</small></p>
        </div>
      </body>
    </html>
  `;

  await resend.emails.send({
    from: 'SigmaSkibidi <noreply@yourdomain.com>',
    to: process.env.STUDENT_EMAIL!,
    subject: `Class Summary - ${new Date(session.startTime).toLocaleDateString()}`,
    html
  });
}