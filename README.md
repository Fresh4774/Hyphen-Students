# SigmaSkibidi

PWA designed to run only on phone

Starts as a normal id card when three times tapped goes to the main dashboard page

where there is a button when pressed it starts the session so it starts to records audio, and there would be a button to end the session too and stop recording

once recording stopped itll have a button displayed to send the class transcript with ai summary and noted homework assignments deadlines etc with study questions and more as well

with another button all of this will be availble to be seen in another page, that page can be saved in the previous classes where students always have a option to send the mail to their mails (students tho have to enter mail everytime since this is a mvp)

then comes the photo feature another button beside session record where students can capture and take pics of whiteboards, textbooks, or worksheets, and AI will extract text, explain diagrams and formulas, and integrate these visual notes into the daily summary. 

attendance tracking is suppose to either go with gps or nfc but since its a mvp and my old phone dont have nfc and im too lazy for this project to test gps, im going with static clicks in the home page

For safety monitoring, the system employs multi-modal AI fight detection analyzing both audio patterns (shouting, distress, aggressive speech) and visual cues (rapid motion, aggressive poses detected via MediaPipe or TensorFlow.js) sending instant alerts when incidents are detected. 

GPS tracking - in school (prevents getting lost/bunking)

The entire system is built as a Next.js PWA using Vercel AI SDK, Tailwind CSS, browser APIs (camera, microphone, geolocation), OpenAI APIs for intelligence, and email delivery via Nodemailer gmail mail. 

The interface is deliberately minimalist

name IDEAS:
- hyphen
- sigmaskibidi
- sweep
- trek
- dan
- bob