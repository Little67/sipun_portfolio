"use client";

import { useEffect, useState } from "react";
import { InstagramEmbed } from 'react-social-media-embed';
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Instagram } from "lucide-react";

type Post = {
    id: number;
    type: "image" | "instagram";
    content_url: string;
    caption?: string;
    created_at: string;
};

export default function SocialPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            const { data } = await supabase
                .from("posts")
                .select("*")
                .order("created_at", { ascending: false });

            if (data) {
                setPosts(data as Post[]);
            }
            setLoading(false);
        }

        fetchPosts();
    }, []);

    return (
        <main className="bg-black min-h-screen text-white">
            <Navbar />

            <div className="container mx-auto px-6 py-24 md:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-3xl md:text-6xl font-bold mb-4 tracking-tighter">
                        Journal & Social
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Behind the scenes, daily updates, and featured shots from Instagram.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="text-center text-gray-500">Loading feed...</div>
                ) : (
                    <div className="max-w-xl mx-auto space-y-12">
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800"
                            >
                                {/* Header */}
                                <div className="p-4 flex items-center gap-3 border-b border-neutral-800">
                                    <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden">
                                        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">DRD Clicks</p>
                                        <p className="text-xs text-gray-400">
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    {post.type === "instagram" && (
                                        <Instagram className="ml-auto text-pink-500" size={20} />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="w-full">
                                    {post.type === "image" ? (
                                        <img
                                            src={post.content_url}
                                            alt="Post content"
                                            className="w-full h-auto"
                                        />
                                    ) : (
                                        <div className="w-full flex items-center justify-center bg-white">
                                            {post.content_url.includes("instagram.com") ? (
                                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                    <InstagramEmbed
                                                        url={post.content_url}
                                                        width="100%"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="aspect-square flex flex-col items-center justify-center gap-2 text-black p-8">
                                                    <Instagram size={48} />
                                                    <a
                                                        href={post.content_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm font-bold hover:underline"
                                                    >
                                                        View on Instagram
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Caption */}
                                {post.caption && (
                                    <div className="p-4">
                                        <p className="text-sm text-gray-300">
                                            <span className="font-bold text-white mr-2">drd_clicks</span>
                                            {post.caption}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {posts.length === 0 && (
                            <div className="text-center py-12 text-gray-500 bg-neutral-900/50 rounded-xl">
                                No posts yet. Check back soon!
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
