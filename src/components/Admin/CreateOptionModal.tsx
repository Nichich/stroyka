"use client";

import React, { useState } from 'react';
import { useCreateOption } from '@/hooks/options/useCreateOption';

interface CreateOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
}

export function CreateOptionModal({ isOpen, onClose, productId }: CreateOptionModalProps) {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const { createOption, isLoadingCreate } = useCreateOption();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Название характеристики не может быть пустым');
      return;
    }

    if (!value.trim()) {
      setError('Значение характеристики не может быть пустым');
      return;
    }

    createOption(
      {
        title: title.trim(),
        value: value.trim(),
        productId: productId,
      },
      {
        onSuccess: () => {
          setTitle('');
          setValue('');
          setError('');
          onClose();
        },
        onError: (error) => {
          console.error('Ошибка при создании характеристики:', error);
          setError('Ошибка при создании характеристики');
        }
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Создать характеристику
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название характеристики
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              placeholder="Например, Толщина"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Значение
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              placeholder="Например, 60 мм"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              disabled={isLoadingCreate}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={isLoadingCreate}
            >
              {isLoadingCreate ? 'Создание...' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
