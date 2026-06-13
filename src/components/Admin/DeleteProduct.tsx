
"use client";

import React from "react";

interface DeleteProductModalProps {
  open: boolean;
  productName?: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  open,
  productName,
  onClose,
  onConfirm,
  loading = false,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-[760px] rounded-2xl bg-white p-8 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-slate-400 hover:text-slate-600"
          aria-label="Закрыть"
        >
          ✕
        </button>

        <h2 className="text-black mb-4 text-2xl font-semibold tracking-tight">
          ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ
        </h2>

        <p className="mb-2 text-sm text-slate-900">
          Внимание! Вы собираетесь удалить товар{" "}
          {productName && (
            <span className="font-semibold">«{productName}»</span>
          )}
          ?
        </p>

        <p className="mb-8 text-sm text-slate-600">
          Все данные о товаре будут полностью удалены из системы.
        </p>

        <div className="flex justify-end gap-6">
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-[#F0882B] hover:text-[#d97316]"
          >
            Отменить
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-[#F0882B] px-6 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#f3b47a] hover:bg-[#d97316]"
          >
            {loading ? "Удаление..." : "Удалить товар"}
          </button>
        </div>
      </div>
    </div>
  );
};