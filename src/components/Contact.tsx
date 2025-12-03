"use client";

import { motion } from "framer-motion";
import { Mail, Instagram, Twitter, Linkedin, Github } from "lucide-react";
import Link from "next/link";

export default function Contact() {
    return (
        <footer id="contact" className="bg-neutral-950 text-white py-24 border-t border-neutral-900">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
                        Let's Work Together
                    </h2>
                    <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                        Have a project in mind? I'd love to hear from you. Let's create
                        something amazing together.
                    </p>

                    <a
                        href="mailto:contact@drdclicks.com"
                        className="inline-flex items-center gap-2 text-2xl md:text-3xl font-medium hover:text-gray-400 transition-colors mb-16"
                    >
                        <Mail className="w-8 h-8" />
                        contact@drdclicks.com
                    </a>

                    <div className="flex justify-center gap-8 mb-16">
                        <Link
                            href="https://www.instagram.com/_drd_clicks_/"
                            target="_blank"
                            className="p-4 bg-neutral-900 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <Instagram className="w-6 h-6" />
                        </Link>
                        <Link
                            href="#"
                            className="p-4 bg-neutral-900 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <Twitter className="w-6 h-6" />
                        </Link>
                        <Link
                            href="#"
                            className="p-4 bg-neutral-900 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <Linkedin className="w-6 h-6" />
                        </Link>
                        <Link
                            href="#"
                            className="p-4 bg-neutral-900 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <Github className="w-6 h-6" />
                        </Link>
                    </div>

                    <div className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} DRD Clicks. All rights reserved.
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
