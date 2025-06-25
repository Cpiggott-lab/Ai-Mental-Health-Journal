"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmModal from "@/components/ConfirmModal";

export default function DeleteClientWrapper({ id }: { id: string }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    const res = await fetch(`/api/journal/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.push("/journal");
    } else {
      alert("Failed to delete entry.");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-sm text-red-600 hover:underline"
      >
        Delete
      </button>
      <ConfirmModal
        open={showModal}
        title="Confirm Deletion"
        message="Are you sure you want to delete this journal entry?"
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
}
