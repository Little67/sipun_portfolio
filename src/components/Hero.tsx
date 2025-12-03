"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Hero() {
    return (
        <section id="home" className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2548&auto=format&fit=crop')",
                }}
            >
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6"
                >
                    CAPTURING <br className="md:hidden" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
                        SOULS
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10"
                >
                    Professional photography that tells your unique story through light,
                    shadow, and emotion.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Link
                        href="#portfolio"
                        className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors duration-300"
                    >
                        View Portfolio
                    </Link>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                >
                    <Link href="#about" className="text-white/50 hover:text-white transition-colors">
                        <ArrowDown className="animate-bounce" size={32} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
