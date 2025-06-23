//confirmation window for actions like delete

"use client";

import React from "react";

export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40">
      <div className="bg-amber-50 rounded-xl p-6 max-w-sm w-full shadow-xl border border-amber-200">
        <h2 className="text-xl font-bold text-amber-800 mb-2">{title}</h2>
        <p className="mb-4 text-sm text-amber-700">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-amber-300 text-amber-700 hover:bg-amber-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-500 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
