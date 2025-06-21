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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded p-6 max-w-sm w-full shadow-lg">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="mb-4 text-sm text-gray-700">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
