import React, { useRef } from "react";
import { ProductImage } from "@/shared/admin/products.interface";
import { SectionTitle } from "./SectionTitle";

interface Props {
  images?: ProductImage[];
  onFilesChange?: (files: File[]) => void;
  onRemoveImage?: (imageId: string) => void;
  onSetPrimary?: (imageId: string) => void;
}

export const ImagesSection: React.FC<Props> = ({
  images = [],
  onFilesChange,
  onRemoveImage,
  onSetPrimary
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && onFilesChange) {
      onFilesChange(files);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="mb-8">
      <SectionTitle icon="🖼">ИЗОБРАЖЕНИЯ</SectionTitle>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="mb-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
        + Добавить изображения
      </button>

      {images.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative h-32 w-32 overflow-hidden rounded-lg border-2 ${
                img.isPrimary ? 'border-[#F0882B]' : 'border-slate-200'
              }`}>
              <img
                src={img.url}
                alt={img.alt}
                className="h-full w-full object-cover"/>

              {img.isPrimary && (
                <div className="absolute left-1 top-1 rounded bg-[#F0882B] px-2 py-0.5 text-[10px] font-semibold text-white">
                  Основная
                </div>
              )}

              <div className="absolute right-1 top-1 flex flex-col gap-1">
                {onRemoveImage && (
                  <button
                    type="button"
                    onClick={() => onRemoveImage(img.id)}
                    className="rounded bg-red-500/90 hover:bg-red-600 p-1 text-white transition"
                    title="Удалить изображение">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}

                {!img.isPrimary && onSetPrimary && (
                  <button
                    type="button"
                    onClick={() => onSetPrimary(img.id)}
                    className="rounded bg-black/60 hover:bg-black/80 p-1 text-white transition"
                    title="Сделать основной">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="mt-3 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center">
          <p className="text-sm text-slate-500">Изображения не загружены</p>
          <p className="text-xs text-slate-400 mt-1">Нажмите кнопку выше для загрузки</p>
        </div>
      )}
    </section>
  );
};
