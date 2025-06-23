"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import VoiceRecorder from "@/components/VoiceRecorder";

export default function NewJournalEntry() {
  const [content, setContent] = useState("");
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setContent(transcript);
  }, [transcript]);

  const handleSave = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) throw new Error("Failed to save entry");

      const data = await res.json();
      router.push(`/journal/${data.id}`);
    } catch (err) {
      setError("Error saving your entry.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4 text-amber-800">
        New Journal Entry
      </h1>
      <p className="text-gray-600 mb-4">
        Use the voice recorder below to dictate your thoughts, or type them out
        directly.
      </p>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-48 p-3 border rounded mt-4 text-gray-800 focus:outline-none focus:ring focus:border-amber-500"
        placeholder="Write your thoughts..."
        disabled={loading}
      />

      <div className="mt-6 flex flex-wrap gap-4 justify-between items-center">
        <VoiceRecorder transcript={transcript} setTranscript={setTranscript} />
        <div className="flex gap-4 justify-end">
          <button
            onClick={handleSave}
            className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-500 disabled:opacity-50 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => router.push("/journal")}
            className="px-6 py-2 border border-gray-400 text-gray-600 rounded hover:text-black hover:border-black disabled:opacity-50 transition"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>

      {loading && <Spinner />}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
