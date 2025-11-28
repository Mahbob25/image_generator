"use client";

import React, { useState } from "react";
import { Loader2, Sparkles, Image as ImageIcon } from "lucide-react";

export default function Page() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ idea: string; imageUrl: string } | null>(
        null
    );
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate design");
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex flex-col items-center justify-center p-4 font-sans">
            <div className="max-w-4xl w-full bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                <div className="p-8 md:p-12">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400 mb-4">
                            AI Design Studio
                        </h1>
                        <p className="text-lg text-gray-300">
                            Turn your ideas into professional designs...
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe your design (e.g., 'A futuristic poster for a tech conference')"
                            className="flex-1 bg-black/20 border border-white/10 rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all placeholder-gray-500"
                            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                        />
                        <button
                            onClick={handleGenerate}
                            disabled={loading || !prompt.trim()}
                            className="bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white font-semibold rounded-xl px-8 py-4 text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" /> Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" /> Generate
                                </>
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl mb-8 text-center">
                            {error}
                        </div>
                    )}

                    {result && (
                        <div className="animate-fade-in grid md:grid-cols-2 gap-8 mt-8">
                            <div className="bg-black/20 rounded-2xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold mb-4 text-pink-300 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5" /> Designer's Idea
                                </h3>
                                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
                                    {result.idea}
                                </p>
                            </div>
                            <div className="bg-black/20 rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center min-h-[300px]">
                                <h3 className="text-xl font-semibold mb-4 text-violet-300 flex items-center gap-2 w-full">
                                    <ImageIcon className="w-5 h-5" /> Generated Design
                                </h3>
                                <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
                                    <img
                                        src={result.imageUrl}
                                        alt="Generated Design"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <a
                                            href={result.imageUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white text-sm font-medium hover:underline"
                                        >
                                            View Full Size
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
