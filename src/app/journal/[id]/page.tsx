"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import ConfirmModal from "@/components/ConfirmModal";

export default function SingleJournalEntry({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = use(paramsPromise); // 👈 unwraps the actual { id: string }
  const router = useRouter();
  const [entry, setEntry] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/journal/${params.id}`);
      const data = await res.json();
      setEntry(data);
    })();
  }, [params.id, router]);

  const handleDelete = async () => {
    const res = await fetch(`/api/journal/${params.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/journal");
    } else {
      alert("Failed to delete entry.");
    }
  };

  if (status === "loading" || !entry)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;

  const affirmations = entry.affirmations ? JSON.parse(entry.affirmations) : [];
  const suggestions = entry.suggestions ? JSON.parse(entry.suggestions) : [];

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <p className="text-sm text-gray-400">
        {new Date(entry.createdAt).toLocaleString()}
      </p>

      <p className="text-xl mt-4 whitespace-pre-line">{entry.content}</p>

      {entry.summary && (
        <div className="mt-8 border-t pt-6">
          <h2 className="text-lg font-semibold text-amber-700 mb-2">
            Mental Health Summary
          </h2>
          <p className="mb-4">{entry.summary}</p>

          <h3 className="text-md font-semibold text-green-700 mb-1">
            Positive Affirmations
          </h3>
          <ul className="list-disc list-inside mb-4">
            {affirmations.map((a: string, i: number) => (
              <li key={i}>{a}</li>
            ))}
          </ul>

          <h3 className="text-md font-semibold text-blue-700 mb-1">
            Suggestions to Improve Your Day
          </h3>
          <ul className="list-disc list-inside">
            {suggestions.map((s: string, i: number) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <Link
          href={`/journal/${params.id}/edit`}
          className="inline-block text-sm text-blue-600 hover:underline"
        >
          Edit this entry
        </Link>

        <button
          onClick={() => setShowModal(true)}
          className="text-sm text-red-600 hover:underline"
        >
          Delete
        </button>

        <Link
          href="/journal"
          className="inline-block text-sm text-gray-600 hover:underline"
        >
          ← Back to Journal
        </Link>
      </div>

      <ConfirmModal
        open={showModal}
        title="Confirm Deletion"
        message="Are you sure you want to delete this journal entry?"
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}
