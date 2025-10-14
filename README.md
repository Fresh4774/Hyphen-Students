This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# ABOUT:

SigmaSkibidi

PWA designed to run only on phone

a student places the phone in the classroom, presses one button to start the session, and the device handles everything automatically. 

During class, it continuously records audio. once class ended the student can end the session

the AI processing pipeline kicks in, using OpenAI Whisper to transcribe the entire lecture, GPT-4 to generate intelligent summaries, 

automatically extracting homework assignments and deadlines from the teacher's speech, creating study questions for review, and compiling everything into a beautifully formatted email sent directly to the student. 

The device includes a Smart Photo Notes feature where students can photograph whiteboards, textbooks, or worksheets, and GPT-4 Vision will extract text, explain diagrams and formulas, and integrate these visual notes into the daily summary. 

For safety monitoring, the system employs multi-modal AI fight detection—analyzing both audio patterns (shouting, distress, aggressive speech) and visual cues (rapid motion, aggressive poses detected via MediaPipe or TensorFlow.js) sending instant alerts when incidents are detected. 

Additional smart features include GPS tracking and attendance tracking and homework reminder notifications. 

The entire system is built as a Next.js PWA using Vercel AI SDK, Tailwind CSS, browser APIs (camera, microphone, geolocation), OpenAI APIs for intelligence, and email delivery via Nodemailer gmail mail. 

The interface is deliberately minimalist
