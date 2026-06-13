"use client";

import React from "react";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (!open) setChecked(false);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      aria-modal="true"
      role="dialog"
    >
      {/* карточка */}
      <div className="relative w-full max-w-[640px] rounded-2xl bg-white p-8 shadow-xl">
        {/* кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-slate-400 hover:text-slate-600"
          aria-label="Закрыть"
        >
          ✕
        </button>

        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          УДАЛЕНИЕ АККАУНТА
        </h2>

        <p className="mb-1 text-sm font-semibold text-slate-900">
          Вы собираетесь удалить свой аккаунт
        </p>
        <p className="mb-6 text-sm text-slate-600">
          Полное удаление аккаунта и всех связанных данных. Это действие
          необратимо.
        </p>

        <label className="mb-8 flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          <span>Я понимаю последствия и хочу удалить аккаунт</span>
        </label>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-[#F0882B] hover:text-[#d97316]"
          >
            Отменить
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={!checked}
            className="rounded-lg bg-[#F0882B] px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#f3b47a] hover:bg-[#d97316]"
          >
            Удалить аккаунт
          </button>
        </div>
      </div>
    </div>
  );
};