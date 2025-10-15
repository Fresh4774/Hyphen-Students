import React from 'react';

const Letter = () => {
    return (
    <div className="w-full min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-8 py-16">
            <header className="mb-5">
                <h1 className="text-5xl font-bold text-black mb-4 tracking-tight">Hyphen</h1>
            </header>

            <div className="space-y-8">
                <section>
                    <p className="text-lg mb-6 text-gray-700 leading-relaxed">Hyphen is an ID card that runs a PWA on an old phone inside a 3D-printed case. It has a hook so you can attach it to your belt, hang it on an ID string, or dock it on your table as a phone stand.</p>
                        
                    <p className="text-lg mb-6 text-gray-700 leading-relaxed">Triple tap the screen to go from the ID display to the main dashboard.</p>

                    <p className="text-lg text-gray-700 leading-relaxed">The case was printed in parts and the old phone had to be torn apart to fit.</p>
                </section>

                <section>
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold mb-6 text-black">Session Recording</h3>
                            <div className="space-y-5">
                                <div>
                                    <p className="text-base text-gray-700 leading-relaxed"><strong className="text-black">Start Recording:</strong> Press the button on the dashboard. It records audio of your class.</p>
                                </div>
                                <div>
                                    <p className="text-base text-gray-700 leading-relaxed"><strong className="text-black">Stop Recording:</strong> Press the button again when class ends.</p>
                                </div>
                                <div>
                                    <p className="text-base text-gray-700 leading-relaxed"><strong className="text-black">Get Summary:</strong> After stopping, a button appears. Press it to send yourself the transcript with AI summary, homework assignments, deadlines, and study questions via email.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-base text-gray-700 leading-relaxed">The recording uses the phone's microphone. The AI processes everything and emails you the organized notes.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6 text-black">Photo Capture</h2>
                    <p className="text-base mb-6 text-gray-700 leading-relaxed">There's another button next to the session recorder.</p>
                    <div className="space-y-4">
                        <p className="text-base text-gray-700 leading-relaxed">Take photos of whiteboards, textbooks, or worksheets</p>
                        <p className="text-base text-gray-700 leading-relaxed">AI extracts the text from the image</p>
                        <p className="text-base text-gray-700 leading-relaxed">Explains diagrams and formulas</p>
                        <p className="text-base text-gray-700 leading-relaxed">Adds these notes to your daily summary</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6 text-black">Daily Schedule</h2>
                    <p className="text-base mb-6 text-gray-700 leading-relaxed">Shows your schedule for the day on the dashboard.</p>
                    <div className="space-y-4">
                        <p className="text-base text-gray-700 leading-relaxed">Updates with substitute teachers</p>
                        <p className="text-base text-gray-700 leading-relaxed">Shows last minute changes to classes</p>
                        <p className="text-base text-gray-700 leading-relaxed">Notifies you when something changes</p>
                        <p className="text-base text-gray-700 leading-relaxed">Keeps you from missing class or going to the wrong room</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6 text-black">Attendance Tracking</h2>
                    
                    <div className="space-y-10">
                        <div>
                            <p className="text-base text-gray-700 mb-4 leading-relaxed">This is an MVP. My old phone doesn't have NFC and I didn't want to deal with GPS testing.</p>
                            <div className="space-y-3">
                                <p className="text-base text-gray-700 leading-relaxed">You click a button on the home page to mark attendance</p>
                                <p className="text-base text-gray-700 leading-relaxed">Static clicks for now</p>
                                <p className="text-base text-gray-700 leading-relaxed">Keeps a log of when you were in class</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-base text-gray-700 mb-4 leading-relaxed">In the full version, attendance works with GPS tracking. The system knows when you're in school and marks you present automatically.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6 text-black">GPS Tracking</h2>
                    <p className="text-base mb-6 text-gray-700 leading-relaxed">Tracks your location while you're in school.</p>
                    <div className="space-y-4 mb-8">
                        <p className="text-base text-gray-700 leading-relaxed">Prevents getting lost on campus</p>
                        <p className="text-base text-gray-700 leading-relaxed">Stops you from bunking classes</p>
                        <p className="text-base text-gray-700 leading-relaxed">Uses the phone's built-in GPS</p>
                        <p className="text-base text-gray-700 leading-relaxed">Links with attendance tracking to verify you're in the right place</p>
                    </div>
                    
                    <p className="text-base text-gray-700 leading-relaxed">The GPS checks if you're on school grounds. If you leave during class hours, the system logs it. If you're wandering around campus, it helps you find your way back. Location data stays on your device unless you share it.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6 text-black">Safety Monitoring</h2>
                    <p className="text-base mb-6 text-gray-700 leading-relaxed">The system watches for fights or incidents.</p>
                    <div className="space-y-5 mb-8">
                        <div>
                            <p className="text-base text-gray-700 leading-relaxed"><strong className="text-black">Audio Analysis:</strong> Listens for shouting, distress, or aggressive speech patterns</p>
                        </div>
                        <div>
                            <p className="text-base text-gray-700 leading-relaxed"><strong className="text-black">Visual Detection:</strong> Uses MediaPipe or TensorFlow.js to detect rapid motion or aggressive poses through the camera</p>
                        </div>
                        <div>
                            <p className="text-base text-gray-700 leading-relaxed"><strong className="text-black">Instant Alerts:</strong> Sends notifications when something looks wrong</p>
                        </div>
                    </div>
                    
                    <div className="border-l-4 border-black pl-6 py-2">
                        <p className="text-base text-black leading-relaxed"><strong>Multi-modal AI:</strong> Combines audio and video to detect incidents.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6 text-black">The Hardware</h2>
                    <p className="text-base mb-6 text-gray-700 leading-relaxed">The ID card is physical hardware you wear.</p>
                    <div className="space-y-5 mb-8">
                        <div>
                            <p className="text-base text-gray-700 leading-relaxed"><strong className="text-black">3D-Printed Case:</strong> Custom designed and printed in parts</p>
                        </div>
                        <div>
                            <p className="text-base text-gray-700 leading-relaxed"><strong className="text-black">Old Phone Inside:</strong> Had to tear apart an old phone to fit it in the case</p>
                        </div>
                        <div>
                            <p className="text-base text-gray-700 leading-relaxed"><strong className="text-black">Hook Attachment:</strong> Clips to your belt, hangs on an ID string, or sits on your desk as a phone stand</p>
                        </div>
                        <div>
                            <p className="text-base text-gray-700 leading-relaxed"><strong className="text-black">Portable:</strong> Small enough to wear all day</p>
                        </div>
                    </div>
                    
                    <p className="text-base text-gray-700 leading-relaxed">The case protects the phone and makes it wearable. You can dock it on your table when you're sitting or clip it to your belt when moving around.</p>
                </section>

                <section>
                    <p className="text-base text-gray-700 leading-relaxed">The interface is minimal. Just buttons and text. Nothing extra.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6 text-black">How It Works</h2>
                    <div className="space-y-4">
                        <p className="text-base text-gray-700 leading-relaxed">Wear the ID card to school</p>
                        <p className="text-base text-gray-700 leading-relaxed">Triple tap to open the dashboard</p>
                        <p className="text-base text-gray-700 leading-relaxed">Check your schedule for the day</p>
                        <p className="text-base text-gray-700 leading-relaxed">GPS tracks you on campus</p>
                        <p className="text-base text-gray-700 leading-relaxed">Mark attendance with a button click</p>
                        <p className="text-base text-gray-700 leading-relaxed">Start recording when class begins</p>
                        <p className="text-base text-gray-700 leading-relaxed">Take photos of the board or your notes</p>
                        <p className="text-base text-gray-700 leading-relaxed">Stop recording when class ends</p>
                        <p className="text-base text-gray-700 leading-relaxed">Get your AI-organized summary via email</p>
                        <p className="text-base text-gray-700 leading-relaxed">Safety monitoring runs in the background</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6 text-black">Future</h2>
                    <p className="text-base mb-6 text-gray-700 leading-relaxed">This is what's coming next.</p>
                    
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-black">Management Dashboard</h3>
                            <p className="text-base text-gray-700 mb-4 leading-relaxed">A web dashboard for students and parents.</p>
                            <div className="space-y-3">
                                <p className="text-base text-gray-700 leading-relaxed">View all class transcripts and summaries</p>
                                <p className="text-base text-gray-700 leading-relaxed">Track attendance history</p>
                                <p className="text-base text-gray-700 leading-relaxed">See homework deadlines in one place</p>
                                <p className="text-base text-gray-700 leading-relaxed">Review safety alerts and GPS logs</p>
                                <p className="text-base text-gray-700 leading-relaxed">Export notes and summaries</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-black">Teacher App</h3>
                            <p className="text-base text-gray-700 mb-4 leading-relaxed">A separate app for teachers to manage their classes.</p>
                            <div className="space-y-3">
                                <p className="text-base text-gray-700 leading-relaxed">Post assignments directly to students</p>
                                <p className="text-base text-gray-700 leading-relaxed">Update schedules and notify students of changes</p>
                                <p className="text-base text-gray-700 leading-relaxed">Mark attendance from their side</p>
                                <p className="text-base text-gray-700 leading-relaxed">Send announcements to the class</p>
                                <p className="text-base text-gray-700 leading-relaxed">Track which students are present or bunking</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-black">Communication Device</h3>
                            <p className="text-base text-gray-700 mb-4 leading-relaxed">The ID card becomes a two-way communication device.</p>
                            <div className="space-y-3">
                                <p className="text-base text-gray-700 leading-relaxed">Receive alerts from teachers and admin</p>
                                <p className="text-base text-gray-700 leading-relaxed">Get notified of schedule changes instantly</p>
                                <p className="text-base text-gray-700 leading-relaxed">Emergency broadcasts reach all students</p>
                                <p className="text-base text-gray-700 leading-relaxed">Prevents missing important updates</p>
                                <p className="text-base text-gray-700 leading-relaxed">Students can't claim they didn't know about changes</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pitch Content */}
                <div className="border-t-2 border-gray-300 mt-16 pt-16">
                    <section>
                        <h2 className="text-3xl font-bold mb-8 text-black">The Pitch</h2>

                        <h3 className="text-2xl font-semibold mb-6 text-black">what?</h3>
                        <div className="space-y-4 mb-10">
                            <p className="text-base text-gray-700 leading-relaxed">We built an ID card that's actually smart.</p>
                            <p className="text-base text-gray-700 leading-relaxed">it's an cool screen designed inside a 3D-printed case with a hook. wear it on your belt, hang it on an ID string, or dock it on your table like a phone in a phone stand.</p>
                            <p className="text-base text-gray-700 leading-relaxed">triple tap the screen to go from your ID display to the main dashboard.</p>
                            <p className="text-base text-gray-700 leading-relaxed">one button to record your entire class. one button to snap the whiteboard. AI handles the rest and emails you organized notes with homework deadlines, summaries, and study questions.</p>
                            <p className="text-base text-gray-700 leading-relaxed">your schedule updates in real-time. GPS keeps you from getting lost on campus. attendance tracks automatically. safety monitoring runs in the background detecting fights or incidents before they escalate.</p>
                            <p className="text-base text-gray-700 leading-relaxed">stop missing deadlines because you zoned out in class. stop getting lost on campus. stop having no idea what the homework was. start having every class recorded, transcribed, and summarized without lifting a finger.</p>
                            <p className="text-base text-gray-700 leading-relaxed">The AI processes everything and sends you the organized notes. You just wear the card and press buttons.</p>
                        </div>

                        <h3 className="text-2xl font-semibold mb-6 text-black">why?</h3>
                        <div className="space-y-4 mb-10">
                            <p className="text-base text-gray-700 leading-relaxed">Students miss half of what happens in class. You zone out, the teacher talks fast, you're still writing down the last thing they said while they've moved three slides ahead. By the time you get home, your notes are incomplete and you have no idea what the homework actually was.</p>
                            <p className="text-base text-gray-700 leading-relaxed">Everyone's scrambling after class asking "wait what did they say the deadline was?" or texting the group chat "did anyone get what's on the test?" You waste time trying to reconstruct what happened instead of actually learning.</p>
                            <p className="text-base text-gray-700 leading-relaxed">Campus is confusing. You're late because you went to the wrong building. You miss class announcements. Schedule changes and you find out after showing up to an empty room. Teachers get substituted and nobody told you.</p>
                            <p className="text-base text-gray-700 leading-relaxed">Parents want to know you're safe and actually going to class. Schools want to track attendance and safety. But current systems are clunky kiosks, paper sign-ins, or apps you have to remember to open.</p>
                            <p className="text-base text-gray-700 leading-relaxed">Nobody's making the ID card actually useful. It's just a piece of plastic that opens doors. We're making it do the work for you.</p>
                        </div>

                        <h3 className="text-2xl font-semibold mb-6 text-black">why now?</h3>
                        <div className="space-y-4 mb-10">
                            <p className="text-base text-gray-700 leading-relaxed">Every student has a phone. Every school requires ID cards. But they're separate things doing separate jobs, both annoying to carry.</p>
                            <p className="text-base text-gray-700 leading-relaxed">AI can now process audio and images in real-time. Old phones are everywhere, basically free. 3D printing makes custom hardware accessible. PWAs work offline and don't need app store approval.</p>
                            <p className="text-base text-gray-700 leading-relaxed">Schools are desperate for better attendance and safety systems. Students are drowning in missed information and disorganized notes. Parents want visibility without being helicopter parents.</p>
                            <p className="text-base text-gray-700 leading-relaxed">The problem is massive. And everyone already has the habit of wearing an ID card to school.</p>
                        </div>

                        <h3 className="text-2xl font-semibold mb-6 text-black">value proposition:</h3>
                        <div className="space-y-6 mb-10">
                            <div>
                                <p className="text-base mb-3"><strong className="text-black">Session Recording</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- press button when class starts, records audio</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- press again when class ends</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- AI emails you transcript with summary, homework, deadlines, and study questions</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- uses phone's mic, processes everything automatically</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-base mb-3"><strong className="text-black">Photo Capture</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- snap whiteboards, textbooks, worksheets</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- AI extracts text from images</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- explains diagrams and formulas</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- adds to your daily summary</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-base mb-3"><strong className="text-black">Daily Schedule</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- shows your schedule on the dashboard</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- updates with substitute teachers</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- notifies you of last minute changes</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- keeps you from missing class or going to wrong room</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-base mb-3"><strong className="text-black">Attendance Tracking</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- GPS knows when you're in school</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- marks you present automatically</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- tracks if you leave during class hours</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- logs everything for parents and admin</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-base mb-3"><strong className="text-black">GPS Tracking</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- prevents getting lost on campus</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- stops you from bunking classes</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- links with attendance to verify you're in right place</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- location data stays on your device unless you share it</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-base mb-3"><strong className="text-black">Safety Monitoring</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- listens for shouting, distress, aggressive speech</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- uses MediaPipe/TensorFlow.js to detect rapid motion or aggressive poses</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- combines audio and video for multi-modal detection</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- sends instant alerts when something looks wrong</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-base mb-3"><strong className="text-black">The Hardware</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- 3D-printed case, custom designed and printed in parts</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- old phone torn apart to fit inside</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- hook clips to belt, ID string, or sits on desk as phone stand</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- portable enough to wear all day</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-base mb-3"><strong className="text-black">Triple Tap Interface</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- tap three times to go from ID to dashboard</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- minimal interface, just buttons and text</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- nothing extra, just what you need</p>
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

                        <h3 className="text-2xl font-semibold mb-6 text-black">future:</h3>
                        <div className="space-y-6 mb-10">
                            <div>
                                <p className="text-2xl mb-3"><strong className="text-black">Management Dashboard</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- web dashboard for students and parents</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- view all transcripts and summaries</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- track attendance history</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- see homework deadlines in one place</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- review safety alerts and GPS logs</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-2xl mb-3"><strong className="text-black">Teacher App</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- post assignments directly to students</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- update schedules and notify students instantly</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- mark attendance from their side</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- send announcements to entire class</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- track which students are present or bunking</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-2xl mb-3"><strong className="text-black">Communication Device</strong></p>
                                <div className="space-y-2 pl-4">
                                    <p className="text-base text-gray-700 leading-relaxed">- receive alerts from teachers and admin</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- get notified of schedule changes instantly</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- emergency broadcasts reach all students</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- prevents missing important updates</p>
                                    <p className="text-base text-gray-700 leading-relaxed">- students can't claim they didn't know</p>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-semibold mb-6 text-black">market fit:</h3>
<div className="space-y-4 mb-10">
                            <p className="text-base text-gray-700 leading-relaxed">there are 250+ million students in India. every single one has to wear an ID card. every single one takes notes. every single one misses information in class.</p>
                            <p className="text-base text-gray-700 leading-relaxed">schools already require ID cards. we're just combining them into something that actually helps.</p>
                            <p className="text-base text-gray-700 leading-relaxed">parents want to know their kids are safe and actually attending class. schools have massive campuses where students get lost. class sizes are huge and teachers can't track everyone.</p>
                            <p className="text-base text-gray-700 leading-relaxed">we solve all these problems with one device they're already required to wear.</p>
                        </div>

                        <div className="space-y-3 mb-10">
                            <p className="text-base"><strong className="text-black">Actually Useful ID Cards</strong></p>
                            <p className="text-base"><strong className="text-black">Never Miss Class Info Again</strong></p>
                            <p className="text-base"><strong className="text-black">Automatic Attendance</strong></p>
                            <p className="text-base"><strong className="text-black">Safety Without Surveillance Feel</strong></p>
                            <p className="text-base"><strong className="text-black">Notes That Organize Themselves</strong></p>
                            <p className="text-base text-gray-700 leading-relaxed mt-4">we offer all of them.</p>
                        </div>

<div className="space-y-4 mb-10">
                            <p className="text-base text-gray-700 leading-relaxed">everyone says "pay attention in class" like that's realistic for 6 hours a day.</p>
                            <p className="text-base text-gray-700 leading-relaxed">we say that's not how humans work.</p>
                            <p className="text-base text-gray-700 leading-relaxed">your brain zones out. teachers talk fast. you can't write and listen at the same time. you forget which building your next class is in. you miss the announcement about the schedule change. that's all normal.</p>
                            <p className="text-base text-gray-700 leading-relaxed">everyone says "just be more organized" or "try harder" or "check the board."</p>
                            <p className="text-base text-gray-700 leading-relaxed">we say stop putting all the work on students.</p>
                            <p className="text-base text-gray-700 leading-relaxed">Hyphen records your lectures so you can actually listen. snaps the whiteboard so you don't miss diagrams. tracks your location so you don't get lost. updates your schedule automatically so you don't show up to empty rooms. monitors safety in the background so incidents get caught early.</p>
                            <p className="text-base text-gray-700 leading-relaxed">you just wear it. press buttons when you need to. everything else happens automatically.</p>
                        </div>

                        <div className="space-y-4 mb-10">
                            <p className="text-base text-gray-700 leading-relaxed">ID cards shouldn't just open doors. they should help you learn, keep you safe, navigate campus, track attendance, and make school actually manageable.</p>
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