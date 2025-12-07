"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Plus, Trash2, LogOut, Image as ImageIcon, Instagram, Calendar, Mail, Phone, MessageSquare } from "lucide-react";

type Work = {
    id: number;
    title: string;
    category: string;
    image_url: string;
};

type Post = {
    id: number;
    type: "image" | "instagram";
    content_url: string;
    caption?: string;
    created_at: string;
};

type Booking = {
    id: number;
    created_at: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    type: string;
    message: string;
    status: string;
};

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"portfolio" | "social" | "bookings">("portfolio");
    const [works, setWorks] = useState<Work[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Form states
    const [newWork, setNewWork] = useState({ title: "", category: "", image_url: "" });
    const [newPost, setNewPost] = useState({ type: "instagram", content_url: "", caption: "" });

    useEffect(() => {
        checkUser();
        fetchData();
    }, []);

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            router.push("/login");
        }
    };

    const fetchData = async () => {
        setLoading(true);
        const { data: worksData } = await supabase.from("works").select("*").order("id", { ascending: false });
        const { data: postsData } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
        const { data: bookingsData } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });

        if (worksData) setWorks(worksData);
        if (postsData) setPosts(postsData as Post[]);
        if (bookingsData) setBookings(bookingsData);
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    const uploadImage = async (file: File) => {
        setUploading(true);
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('portfolio')
            .upload(filePath, file);

        if (uploadError) {
            alert("Error uploading image: " + uploadError.message);
            setUploading(false);
            return null;
        }

        const { data } = supabase.storage.from('portfolio').getPublicUrl(filePath);
        setUploading(false);
        return data.publicUrl;
    };

    const addWork = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from("works").insert([newWork]);
        if (!error) {
            setNewWork({ title: "", category: "", image_url: "" });
            fetchData();
        } else {
            alert("Error adding work: " + error.message);
        }
    };

    const deleteWork = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        await supabase.from("works").delete().eq("id", id);
        fetchData();
    };

    const addPost = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from("posts").insert([newPost]);
        if (!error) {
            setNewPost({ type: "instagram", content_url: "", caption: "" });
            fetchData();
        } else {
            alert("Error adding post: " + error.message);
        }
    };

    const deletePost = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        await supabase.from("posts").delete().eq("id", id);
        fetchData();
    };

    if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-400">
                        <LogOut size={20} /> Logout
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-neutral-800 pb-4">
                    <button
                        onClick={() => setActiveTab("portfolio")}
                        className={`px-4 py-2 rounded-lg transition-colors ${activeTab === "portfolio" ? "bg-white text-black font-bold" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Portfolio Works
                    </button>
                    <button
                        onClick={() => setActiveTab("social")}
                        className={`px-4 py-2 rounded-lg transition-colors ${activeTab === "social" ? "bg-white text-black font-bold" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Social / Journal
                    </button>
                    <button
                        onClick={() => setActiveTab("bookings")}
                        className={`px-4 py-2 rounded-lg transition-colors ${activeTab === "bookings" ? "bg-white text-black font-bold" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Bookings
                    </button>
                </div>

                {/* Portfolio Tab */}
                {activeTab === "portfolio" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Add Form */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 h-fit">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Plus size={20} /> Add New Work
                            </h2>
                            <form onSubmit={addWork} className="space-y-4">
                                <input
                                    placeholder="Title"
                                    value={newWork.title}
                                    onChange={(e) => setNewWork({ ...newWork, title: e.target.value })}
                                    className="w-full bg-neutral-800 p-3 rounded-lg border border-neutral-700 focus:outline-none focus:border-white"
                                    required
                                />
                                <input
                                    placeholder="Category"
                                    value={newWork.category}
                                    onChange={(e) => setNewWork({ ...newWork, category: e.target.value })}
                                    className="w-full bg-neutral-800 p-3 rounded-lg border border-neutral-700 focus:outline-none focus:border-white"
                                    required
                                />

                                <div className="space-y-4">
                                    <input
                                        placeholder="Image URL"
                                        value={newWork.image_url}
                                        onChange={(e) => setNewWork({ ...newWork, image_url: e.target.value })}
                                        className="w-full bg-neutral-800 p-3 rounded-lg border border-neutral-700 focus:outline-none focus:border-white"
                                    />

                                    <div className="flex items-center gap-4">
                                        <div className="h-px bg-neutral-800 flex-1" />
                                        <span className="text-sm text-gray-500">OR</span>
                                        <div className="h-px bg-neutral-800 flex-1" />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Upload Image</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    const url = await uploadImage(e.target.files[0]);
                                                    if (url) setNewWork({ ...newWork, image_url: url });
                                                }
                                            }}
                                            className="w-full bg-neutral-800 p-2 rounded-lg border border-neutral-700 text-sm text-gray-300"
                                        />
                                        {uploading && <p className="text-sm text-yellow-500 mt-2">Uploading...</p>}
                                    </div>
                                </div>

                                {newWork.image_url && (
                                    <div className="relative w-full h-40 rounded-lg overflow-hidden border border-neutral-700">
                                        <img src={newWork.image_url} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}

                                <button type="submit" disabled={uploading || !newWork.image_url} className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Add Work
                                </button>
                            </form>
                        </div>

                        {/* List */}
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {works.map((work) => (
                                <div key={work.id} className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex gap-4">
                                    <img src={work.image_url} alt={work.title} className="w-24 h-24 object-cover rounded-lg" />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg">{work.title}</h3>
                                        <p className="text-gray-400 text-sm">{work.category}</p>
                                        <button
                                            onClick={() => deleteWork(work.id)}
                                            className="mt-2 text-red-500 text-sm hover:underline flex items-center gap-1"
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Social Tab */}
                {activeTab === "social" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Add Form */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 h-fit">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Plus size={20} /> Add New Post
                            </h2>
                            <form onSubmit={addPost} className="space-y-4">
                                <select
                                    value={newPost.type}
                                    onChange={(e) => setNewPost({ ...newPost, type: e.target.value as "image" | "instagram" })}
                                    className="w-full bg-neutral-800 p-3 rounded-lg border border-neutral-700 focus:outline-none focus:border-white"
                                >
                                    <option value="instagram">Instagram Link</option>
                                    <option value="image">Image Upload</option>
                                </select>

                                {newPost.type === "image" ? (
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Upload Image</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    const url = await uploadImage(e.target.files[0]);
                                                    if (url) setNewPost({ ...newPost, content_url: url });
                                                }
                                            }}
                                            className="w-full bg-neutral-800 p-2 rounded-lg border border-neutral-700 text-sm text-gray-300"
                                        />
                                        {uploading && <p className="text-sm text-yellow-500 mt-2">Uploading...</p>}
                                        {newPost.content_url && (
                                            <div className="relative w-full h-40 rounded-lg overflow-hidden border border-neutral-700 mt-2">
                                                <img src={newPost.content_url} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <input
                                        placeholder="Instagram Post URL"
                                        value={newPost.content_url}
                                        onChange={(e) => setNewPost({ ...newPost, content_url: e.target.value })}
                                        className="w-full bg-neutral-800 p-3 rounded-lg border border-neutral-700 focus:outline-none focus:border-white"
                                        required
                                    />
                                )}

                                <textarea
                                    placeholder="Caption (Optional)"
                                    value={newPost.caption}
                                    onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                                    className="w-full bg-neutral-800 p-3 rounded-lg border border-neutral-700 focus:outline-none focus:border-white h-24"
                                />
                                <button
                                    type="submit"
                                    disabled={uploading || !newPost.content_url}
                                    className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Post
                                </button>
                            </form>
                        </div>

                        {/* List */}
                        <div className="lg:col-span-2 space-y-4">
                            {posts.map((post) => (
                                <div key={post.id} className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex gap-4 items-start">
                                    <div className="p-3 bg-neutral-800 rounded-lg">
                                        {post.type === "instagram" ? <Instagram size={24} /> : <ImageIcon size={24} />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-400 mb-1">{new Date(post.created_at).toLocaleDateString()}</p>
                                        <p className="font-medium mb-2 line-clamp-2">{post.caption || "No caption"}</p>
                                        <p className="text-xs text-blue-400 truncate">{post.content_url}</p>
                                        <button
                                            onClick={() => deletePost(post.id)}
                                            className="mt-2 text-red-500 text-sm hover:underline flex items-center gap-1"
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bookings Tab */}
                {activeTab === "bookings" && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Calendar size={20} /> Booking Requests
                        </h2>
                        <div className="grid gap-4">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
                                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{booking.name}</h3>
                                            <p className="text-gray-400 text-sm">{new Date(booking.created_at).toLocaleString()}</p>
                                        </div>
                                        <div className="px-3 py-1 bg-neutral-800 rounded-full text-xs uppercase tracking-wider font-medium text-gray-300 w-fit">
                                            {booking.type}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <Calendar size={16} className="text-neutral-500" />
                                            <span>Date: {new Date(booking.date).toDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <Mail size={16} className="text-neutral-500" />
                                            <a href={`mailto:${booking.email}`} className="hover:text-white underline">{booking.email}</a>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <Phone size={16} className="text-neutral-500" />
                                            <a href={`tel:${booking.phone}`} className="hover:text-white hover:underline">{booking.phone || "N/A"}</a>
                                        </div>
                                    </div>

                                    <div className="bg-neutral-800/50 p-4 rounded-lg">
                                        <div className="flex items-start gap-2">
                                            <MessageSquare size={16} className="text-neutral-500 mt-1" />
                                            <p className="text-gray-300 whitespace-pre-wrap">{booking.message}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {bookings.length === 0 && (
                                <div className="text-center text-gray-500 py-12">
                                    No bookings yet.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            );
}
