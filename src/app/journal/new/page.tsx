"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewJournalEntry() {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    setError("");
    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) throw new Error("Failed to save entry");

      router.push("/journal");
    } catch (err) {
      setError("Error saving your entry.");
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
      />
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleSave}
          className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-500"
        >
          Save
        </button>
        <button
          onClick={() => router.push("/journal")}
          className="px-4 py-2 border rounded text-gray-600 hover:text-black"
        >
          Cancel
        </button>
      </div>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
