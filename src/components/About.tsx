"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-24 bg-neutral-950 text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 relative aspect-[3/4] md:aspect-square"
                    >
                        <div className="absolute inset-0 bg-neutral-800 rounded-lg transform rotate-3" />
                        <div className="absolute inset-0 overflow-hidden rounded-lg">
                            <Image
                                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop"
                                alt="Photographer Portrait"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-1/2"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                            About Me
                        </h2>
                        <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                            <p>
                                I am a passionate photographer dedicated to capturing the raw
                                beauty and authentic emotions of every moment. With a keen eye
                                for detail and a love for storytelling, I strive to create
                                images that resonate on a deeper level.
                            </p>
                            <p>
                                My journey began with a simple film camera and a curiosity about
                                the world. Over the years, I've honed my craft, exploring
                                various styles from landscape to portraiture, always seeking the
                                perfect interplay of light and shadow.
                            </p>
                            <p>
                                I believe that every photograph holds a story waiting to be
                                told. Whether it's the quiet solitude of a mountain peak or the
                                vibrant chaos of a city street, my goal is to freeze time and
                                preserve memories that last a lifetime.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-3xl font-bold text-white">5+</h3>
                                <p className="text-sm text-gray-500 mt-1">Years Experience</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white">100+</h3>
                                <p className="text-sm text-gray-500 mt-1">Projects Done</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white">12</h3>
                                <p className="text-sm text-gray-500 mt-1">Awards Won</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
