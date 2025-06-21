"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ConfirmModal from "@/components/ConfirmModal";

export default function ClientJournal({ entries }: { entries: any[] }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);

  if (!entries || !Array.isArray(entries)) {
    return <p className="text-red-600">Error loading entries.</p>;
  }

  const handleDeleteClick = (id: string) => {
    setEntryToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!entryToDelete) return;
    const res = await fetch(`/api/journal/${entryToDelete}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setShowModal(false);
      setEntryToDelete(null);
      router.refresh();
    } else {
      alert("Failed to delete entry.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-amber-800 mb-6">
        Your Journal Entries
      </h1>

      <Link
        href="/journal/new"
        className="mb-4 inline-block px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-500"
      >
        + New Entry
      </Link>

      {entries.length === 0 ? (
        <p className="text-gray-600">No entries yet.</p>
      ) : (
        <ul className="space-y-4">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="bg-white p-4 rounded shadow border border-amber-100"
            >
              <p className="text-sm text-gray-400">
                {new Date(entry.createdAt).toLocaleString()}
              </p>

              <Link href={`/journal/${entry.id}`}>
                <p className="text-lg mt-1 text-gray-800 hover:underline cursor-pointer whitespace-pre-line">
                  {entry.content.slice(0, 100)}
                  {entry.content.length > 100 ? "..." : ""}
                </p>
              </Link>

              <div className="flex gap-4 mt-2">
                <Link
                  href={`/journal/${entry.id}/edit`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteClick(entry.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmModal
        open={showModal}
        title="Confirm Deletion"
        message="Are you sure you want to delete this journal entry?"
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}
