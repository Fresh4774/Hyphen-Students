# SigmaSkibidi

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
