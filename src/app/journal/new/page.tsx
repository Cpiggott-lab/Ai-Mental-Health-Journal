"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

export default function NewJournalEntry() {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Adding in TTS ability for user to enter journal in through voice.
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

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-48 p-3 border rounded text-gray-800"
        placeholder="Write your thoughts..."
        disabled={loading}
      />

      <div className="mt-4 flex gap-4">
        <button
          onClick={handleSave}
          className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-500 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          onClick={() => router.push("/journal")}
          className="px-4 py-2 border rounded text-gray-600 hover:text-black"
          disabled={loading}
        >
          Cancel
        </button>
      </div>

      {loading && <Spinner />}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
