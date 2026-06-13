import React, { useState } from 'react';

interface CreateColorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string, value: string) => void;
}

export function CreateColorModal({ isOpen, onClose, onCreate }: CreateColorModalProps) {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('#000000');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Название цвета не может быть пустым');
      return;
    }

    onCreate(title.trim(), value);
    setTitle('');
    setValue('#000000');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-black">Создать новый цвет</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название цвета
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              placeholder="Например, Красный"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Выберите цвет
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-20 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black font-mono"
                placeholder="#000000"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
