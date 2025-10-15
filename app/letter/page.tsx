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
            </div>
        </div>
    </div>
    );
};

export default Letter;