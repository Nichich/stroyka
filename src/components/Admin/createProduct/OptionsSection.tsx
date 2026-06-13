import React from "react";
import { ProductFormData } from "@/shared/admin/products.interface";
import { SectionTitle } from "./SectionTitle";

interface ColorOption {
  id: string;
  name: string;
  hex: string;
}

interface Props {
  form: ProductFormData;
  selectedColorId: string;
  selectedColorIds?: string[];
  heightValue: string;
  newCharName: string;
  newCharValue: string;
  colorOptions: ColorOption[];
  isLoadingColors: boolean;

  setHeightValue: (v: string) => void;
  setNewCharName: (v: string) => void;
  setNewCharValue: (v: string) => void;

  handleAddHeight: () => void;
  handleColorChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAddColor?: (colorId: string) => void;
  handleRemoveColor?: (colorId: string) => void;
  handleAddCustomCharacteristic: () => void;
  handleRemoveCharacteristic: (id: string) => void;
  onAddColorClick?: () => void;
}

export const CharacteristicsSection: React.FC<Props> = ({
  form,
  selectedColorId,
  selectedColorIds = [],
  heightValue,
  newCharName,
  newCharValue,
  colorOptions,
  isLoadingColors,
  setHeightValue,
  setNewCharName,
  setNewCharValue,
  handleAddHeight,
  handleColorChange,
  handleAddColor,
  handleRemoveColor,
  handleAddCustomCharacteristic,
  handleRemoveCharacteristic,
  onAddColorClick,
}) => {
  const [tempColorId, setTempColorId] = React.useState("");

  const handleAddColorClick = () => {
    if (tempColorId && handleAddColor) {
      handleAddColor(tempColorId);
      setTempColorId("");
    }
  };

  return (
  <section>
    <SectionTitle icon="⚙">ХАРАКТЕРИСТИКИ</SectionTitle>

    <div className="space-y-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Высота
          </label>
          <input
            type="number"
            min={0}
            value={heightValue}
            onChange={(e) => setHeightValue(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
            placeholder="Например, 60"/>
        </div>
        <div className="mt-auto flex items-center gap-2">
          <span className="inline-flex h-[38px] items-center rounded-lg border border-slate-200 bg-slate-50 px-4 text-xs font-medium text-slate-600">
            ММ
          </span>
          <button
            type="button"
            onClick={handleAddHeight}
            className="text-xs text-[#F0882B] hover:text-[#d97316]">
            Добавить
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-medium text-slate-500">
            Цвета
          </label>
          {onAddColorClick && (
            <button
              type="button"
              onClick={onAddColorClick}
              className="text-xs text-[#F0882B] hover:text-[#d97316]">
              + Новый цвет
            </button>
          )}
        </div>

        {selectedColorIds.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedColorIds.map((colorId) => {
              const color = colorOptions.find((c) => c.id === colorId);
              if (!color) return null;
              return (
                <div
                  key={colorId}
                  className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5"
                >
                  <div
                    className="h-4 w-4 rounded border border-slate-300"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-sm text-slate-700">{color.name}</span>
                  {handleRemoveColor && (
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(colorId)}
                      className="text-slate-400 hover:text-red-500 ml-1"
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded border border-slate-200">
            <div
              className="h-full w-full rounded"
              style={{
                backgroundColor:
                  colorOptions.find((c) => c.id === tempColorId)?.hex ??
                  "#ffffff",
              }}/>
          </div>
          <select
            value={tempColorId}
            onChange={(e) => setTempColorId(e.target.value)}
            disabled={isLoadingColors}
            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400">
            <option value="">{isLoadingColors ? "Загрузка..." : "Выберите цвет для добавления"}</option>
            {colorOptions.filter(c => !selectedColorIds.includes(c.id)).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {handleAddColor && (
            <button
              type="button"
              onClick={handleAddColorClick}
              disabled={!tempColorId}
              className="px-4 py-2 text-xs font-semibold text-[#F0882B] hover:text-[#d97316] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Добавить
            </button>
          )}
        </div>
      </div>

      
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto]">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Название характеристики
          </label>
          <input
            type="text"
            value={newCharName}
            onChange={(e) => setNewCharName(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
            placeholder="Например, Вес поддона, кг."/>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Значение
          </label>
          <input
            type="text"
            value={newCharValue}
            onChange={(e) => setNewCharValue(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
            placeholder="Например, 1935"/>
        </div>
        <div className="flex items-end md:items-end">
          <button
            type="button"
            onClick={handleAddCustomCharacteristic}
            className="w-full rounded-lg bg-[#F5F5F7] px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200">
            Добавить +
          </button>
        </div>
      </div>

      
      {form.characteristics.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="border-b border-slate-200 px-4 py-2 text-left text-xs font-semibold text-slate-500">
                  Название характеристики
                </th>
                <th className="border-b border-slate-200 px-4 py-2 text-left text-xs font-semibold text-slate-500">
                  Значение
                </th>
                <th className="border-b border-slate-200 px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {form.characteristics.map((char) => (
                <tr key={char.id} className="even:bg-slate-50/40">
                  <td className="border-b border-slate-100 px-4 py-2">
                    {char.name}
                  </td>
                  <td className="border-b border-slate-100 px-4 py-2">
                    {char.value}
                    {char.unit ? ` ${char.unit}` : ""}
                  </td>
                  <td className="border-b border-slate-100 px-4 py-2 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemoveCharacteristic(char.id)}
                      className="text-xs text-slate-400 hover:text-red-500">
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </section>
  );
};