"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Calendar, Mail, MessageSquare, Phone, User, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";

export default function BookingPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        type: "Wedding",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");

        const { error } = await supabase
            .from("bookings")
            .insert([formData]);

        setLoading(false);

        if (error) {
            console.error("Booking error:", error);
            setStatus("error");
        } else {
            setStatus("success");
            setFormData({ name: "", email: "", phone: "", date: "", type: "Wedding", message: "" });
        }
    };

    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />

            <div className="pt-32 pb-20 px-6 container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Book a Session</h1>
                        <p className="text-gray-400">Tell me about your vision, and let's make it happen.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 backdrop-blur-sm">

                        {/* Status Messages */}
                        {status === "success" && (
                            <div className="bg-green-500/10 text-green-500 p-4 rounded-lg border border-green-500/20 text-center">
                                Booking request sent successfully! I'll get back to you soon.
                            </div>
                        )}
                        {status === "error" && (
                            <div className="bg-red-500/10 text-red-500 p-4 rounded-lg border border-red-500/20 text-center">
                                Something went wrong. Please try again or contact me directly on WhatsApp.
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 flex items-center gap-2">
                                    <User size={16} /> Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-neutral-800 p-3 rounded-lg border border-neutral-700 focus:border-white focus:outline-none transition-colors"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 flex items-center gap-2">
                                    <Mail size={16} /> Email
                                </label>
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-neutral-800 p-3 rounded-lg border border-neutral-700 focus:border-white focus:outline-none transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 flex items-center gap-2">
                                    <Phone size={16} /> Phone
                                </label>
                                <input
                                    required
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-neutral-800 p-3 rounded-lg border border-neutral-700 focus:border-white focus:outline-none transition-colors"
                                    placeholder="+91 "
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 flex items-center gap-2">
                                    <Camera size={16} /> Shoot Type
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full bg-neutral-800 p-3 rounded-lg border border-neutral-700 focus:border-white focus:outline-none transition-colors appearance-none"
                                >
                                    <option>Wedding</option>
                                    <option>Pre-Wedding</option>
                                    <option>Portrait</option>
                                    <option>Event</option>
                                    <option>Commercial</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 flex items-center gap-2">
                                <Calendar size={16} /> Preferred Date
                            </label>
                            <input
                                required
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full bg-neutral-800 p-3 rounded-lg border border-neutral-700 focus:border-white focus:outline-none transition-colors invert-calendar-icon"
                                style={{ colorScheme: "dark" }}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 flex items-center gap-2">
                                <MessageSquare size={16} /> Message
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-neutral-800 p-3 rounded-lg border border-neutral-700 focus:border-white focus:outline-none transition-colors"
                                placeholder="Tell me more about the event, location, or specific requirements..."
                            />
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            {loading ? "Sending Request..." : "Submit Booking Request"}
                        </button>

                    </form>
                </motion.div>
            </div>

            <Contact />
        </div>
    );
}
