import React from 'react';

const Letter = () => {
    return (
    <div className="w-full min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-8 py-16">
            <header className="mb-5">
                <h1 className="text-5xl font-bold text-black mb-4 tracking-tight">Hyphen</h1>
            </header>

            <div className="space-y-8">

                {/* Pitch Content */}
                <div className="mt-8">
                    <section>
                        <h3 className="text-2xl font-semibold mb-6 text-black">why?</h3>
                        <div className="space-y-4 mb-10">
                            <p className="text-base text-gray-700 leading-relaxed">Students miss half of what happens in class. You zone out, the teacher talks fast, you're still writing down the last thing they said while they've moved three slides ahead. By the time you get home, your notes are incomplete and you have no idea what the homework actually was.</p>
                            <p className="text-base text-gray-700 leading-relaxed">Everyone's scrambling after class asking "wait what did they say the deadline was?" or texting the group chat "did anyone get what's on the test?" You waste time trying to reconstruct what happened instead of actually learning.</p>
                            <p className="text-base text-gray-700 leading-relaxed">Campus is confusing. You're late because you went to the wrong building. You miss class announcements. Schedule changes and you find out after showing up to an empty room. Teachers get substituted and nobody told you.</p>
                            <p className="text-base text-gray-700 leading-relaxed">Language shouldn't be a barrier to education. Teachers switch between languages mid-lecture. Content is in one language but the exam is in another. You understand the concept but can't follow the explanation because it's not in your strongest language.</p>
                            <p className="text-base text-gray-700 leading-relaxed">Parents want to know you're safe and actually going to class. Schools want to track attendance and safety. But current systems are clunky kiosks, paper sign-ins, or apps you have to remember to open.</p>
                            <p className="text-base text-gray-700 leading-relaxed">Nobody's making the ID card actually useful. It's just a piece of plastic that opens doors. We're making it do the work for you.</p>
                        </div>

                        <h3 className="text-2xl font-semibold mb-6 text-black">why now?</h3>
                        <div className="space-y-4 mb-10">
                            <p className="text-base text-gray-700 leading-relaxed">Every student has a phone. Every school requires ID cards. But they're separate things doing separate jobs, both annoying to carry.</p>
                            <p className="text-base text-gray-700 leading-relaxed">AI can now process audio and images in real-time. Translation models work instantly across dozens of languages. Old phones are everywhere, basically free. 3D printing makes custom hardware accessible. PWAs work offline and don't need app store approval.</p>
                            <p className="text-base text-gray-700 leading-relaxed">Schools are desperate for better attendance and safety systems. Students are drowning in missed information and disorganized notes. Parents want visibility without being helicopter parents. Multi-lingual education is the reality but tools haven't caught up.</p>
                            <p className="text-base text-gray-700 leading-relaxed">The problem is massive. And everyone already has the habit of wearing an ID card to school.</p>
                        </div>

                        <h3 className="text-2xl font-semibold mb-6 text-black">value proposition:</h3>
                        <div className="space-y-6 mb-10">
                            <div>
                                <p className="text-base mb-3"><strong className="text-black">Session Recording</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- one button press when class starts records the entire lecture using the phone's microphone</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- press again when class ends to stop recording</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- AI automatically processes the audio and emails you a complete transcript with intelligent summary</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- works across all supported languages with automatic language detection</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- extracts homework assignments, identifies deadlines, and generates study questions</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- no more missing what the teacher said or forgetting assignments</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-base mb-3"><strong className="text-black">Multi-Lingual Support</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- automatic transcription in Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, and more</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- instant translation of lectures into your preferred language</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- handles code-switching when teachers mix languages mid-sentence</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- translates captured whiteboard text and textbook images into any supported language</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- summaries and study materials generated in the language you learn best in</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- breaks down language barriers so you can focus on understanding concepts</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-base mb-3"><strong className="text-black">Photo Capture</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- instant capture of whiteboards, textbooks, diagrams, and worksheets</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- AI extracts all text from images automatically in any language</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- translates captured text into your preferred language</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- explains complex diagrams and mathematical formulas in plain language</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- integrates captured content directly into your daily summary</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- never miss a diagram or rush to copy down notes from the board again</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-base mb-3"><strong className="text-black">Daily Schedule</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- live schedule display right on your dashboard in your preferred language</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- real-time updates for substitute teachers and room changes</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- instant notifications when schedules change last minute</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- prevents showing up to empty rooms or missing relocated classes</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- always know where you need to be and when</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-base mb-3"><strong className="text-black">Attendance Tracking</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- GPS automatically detects when you're on school grounds</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- marks you present without any manual check-in required</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- tracks and logs if you leave campus during class hours</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- maintains complete attendance history for parents and administrators</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- eliminates kiosks, paper sign-ins, and apps you forget to open</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-base mb-3"><strong className="text-black">GPS Tracking</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- continuous location tracking while on campus using built-in GPS</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- helps you navigate large campuses and find the right buildings</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- prevents bunking by verifying you're in the correct location</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- links directly with attendance to confirm physical presence</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- location data remains private on your device unless you choose to share</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-base mb-3"><strong className="text-black">Safety Monitoring</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- continuous audio monitoring detects shouting, distress calls, and aggressive speech patterns</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- camera-based visual detection using MediaPipe or TensorFlow.js identifies rapid motion and aggressive body language</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- multi-modal AI combines audio and video for accurate incident detection</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- instant alerts sent when potential fights or dangerous situations are detected</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- runs silently in the background without interrupting normal use</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-base mb-3"><strong className="text-black">The Hardware</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- custom 3D-printed case designed and printed in modular parts for perfect fit</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- repurposed old phone disassembled and integrated into compact form</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- versatile hook system clips to belt, hangs from ID string, or functions as desk phone stand</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- lightweight and portable enough for all-day wear</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- durable protective case keeps internal components safe during daily use</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-base mb-3"><strong className="text-black">Triple Tap Interface</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- three quick taps instantly switches from ID display to full dashboard</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- minimal interface design with only essential buttons and clear text</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- interface available in all supported languages</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- zero clutter or unnecessary features that slow you down</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- optimized for quick access to recording, photos, and schedule</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 mb-10">
                            <div>
                                <p className="text-2xl mb-3"><strong className="text-black">customer relationships</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- partnering directly with schools and districts</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- building community of students</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- giving parents visibility and peace of mind</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- supporting multi-lingual education across diverse student populations</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-2xl mb-3"><strong className="text-black">revenue streams</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- school licenses: $20-30 per student per year</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- individual student subscriptions: $10/month</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- parent dashboard premium features</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- teacher app subscriptions</p>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-semibold mb-6 text-black">market fit:</h3>
                        <div className="space-y-4 mb-10">
                            <p className="text-base text-gray-700 leading-relaxed">there are 250+ million students in India. every single one has to wear an ID card. every single one takes notes. every single one misses information in class.</p>
                            <p className="text-base text-gray-700 leading-relaxed">India speaks 22 official languages. students learn in one language at home, another at school, and take exams in English. teachers code-switch constantly. textbooks are in multiple languages. this isn't a bug, it's reality.</p>
                            <p className="text-base text-gray-700 leading-relaxed">schools already require ID cards. we're just combining them into something that actually helps, in whatever language students need.</p>
                            <p className="text-base text-gray-700 leading-relaxed">parents want to know their kids are safe and actually attending class. schools have massive campuses where students get lost. class sizes are huge and teachers can't track everyone.</p>
                            <p className="text-base text-gray-700 leading-relaxed">we solve all these problems with one device they're already required to wear, accessible in every major Indian language.</p>
                        </div>

                        <div className="space-y-3 mb-10">
                            <p className="text-base"><strong className="text-black">Actually Useful ID Cards</strong></p>
                            <p className="text-base"><strong className="text-black">Never Miss Class Info Again</strong></p>
                            <p className="text-base"><strong className="text-black">Learn in Your Language</strong></p>
                            <p className="text-base"><strong className="text-black">Automatic Attendance</strong></p>
                            <p className="text-base"><strong className="text-black">Safety Without Surveillance Feel</strong></p>
                            <p className="text-base"><strong className="text-black">Notes That Organize Themselves</strong></p>
                            <p className="text-base text-gray-700 leading-relaxed mt-4">we offer all of them.</p>
                        </div>

                        <div className="space-y-4 mb-10">
                            <p className="text-base text-gray-700 leading-relaxed">everyone says "pay attention in class" like that's realistic for 6 hours a day.</p>
                            <p className="text-base text-gray-700 leading-relaxed">we say that's not how humans work.</p>
                            <p className="text-base text-gray-700 leading-relaxed">your brain zones out. teachers talk fast. you can't write and listen at the same time. you forget which building your next class is in. you miss the announcement about the schedule change. the teacher switches languages and you lose the thread. that's all normal.</p>
                            <p className="text-base text-gray-700 leading-relaxed">everyone says "just be more organized" or "try harder" or "check the board."</p>
                            <p className="text-base text-gray-700 leading-relaxed">we say stop putting all the work on students.</p>
                            <p className="text-base text-gray-700 leading-relaxed">Hyphen records your lectures so you can actually listen. translates content into the language you understand best. snaps the whiteboard so you don't miss diagrams. tracks your location so you don't get lost. updates your schedule automatically so you don't show up to empty rooms. monitors safety in the background so incidents get caught early.</p>
                            <p className="text-base text-gray-700 leading-relaxed">you just wear it. press buttons when you need to. everything else happens automatically, in whatever language works for you.</p>
                        </div>

                        <div className="space-y-4 mb-10">
                            <p className="text-base text-gray-700 leading-relaxed">ID cards shouldn't just open doors. they should help you learn, keep you safe, navigate campus, track attendance, and make school actually manageable.</p>
                            <p className="text-base text-gray-700 leading-relaxed">language shouldn't be a barrier. if you understand better in Tamil, get your notes in Tamil. if your teacher switches between Hindi and English, get both.</p>
                            <p className="text-base text-gray-700 leading-relaxed">AI shouldn't be a tool you have to remember to use. it should be running in the background doing the boring work while you focus on understanding.</p>
                            <p className="text-base text-gray-700 leading-relaxed">School is hard enough. Your ID card should make it easier.</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Letter;