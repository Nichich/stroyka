import React from "react";
import { ProductFormData } from "@/shared/admin/products.interface";
import { priceUnitLabels } from "@/data/admin/Product";
import { SectionTitle } from "./SectionTitle";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { EProductStatus } from "@/shared/types/product.interface";

interface Props {
  form: ProductFormData;
  handleChange: (
    field: keyof ProductFormData
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const MainInfoSection: React.FC<Props> = ({ form, handleChange }) => {
  const { categories, isLoading: isLoadingCategories } = useGetCategories();

  return (
  <section className="mb-8">
    <SectionTitle icon="i">ОСНОВНАЯ ИНФОРМАЦИЯ</SectionTitle>

    <div className="space-y-5">
      
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-500">
          Название товара
        </label>
        <input
          type="text"
          value={form.name}
          onChange={handleChange("name")}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          placeholder="Введите название товара"/>
      </div>

 
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-500">
          Категория
        </label>
        <select
          value={form.categoryId}
          onChange={handleChange("categoryId")}
          disabled={isLoadingCategories}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400">
          <option value="">{isLoadingCategories ? "Загрузка..." : "---"}</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-500">
          Кол-во товара в наличии
        </label>
        <input
          type="number"
          min={0}
          value={form.quantityInStock || ""}
          onChange={handleChange("quantityInStock")}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          placeholder="Например, 240"/>
      </div>

   
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Товар продается кратно поддону по
          </label>
          <input
            type="number"
            min={0}
            step="0.1"
            value={form.perPalletCount || ""}
            onChange={handleChange("perPalletCount")}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
            placeholder="Например, 10.8"/>
        </div>
        <div className="mt-auto">
          <span className="inline-flex h-[38px] items-center rounded-lg border border-slate-200 bg-slate-50 px-4 text-xs font-medium text-slate-600">
            КВ.М
          </span>
        </div>
      </div>

     
      <div className="grid grid-cols-[1.5fr_minmax(0,1fr)] gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Цена за один поддон
          </label>
          <input
            type="number"
            min={0}
            value={form.pricePerPallet || ""}
            onChange={handleChange("pricePerPallet")}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
            placeholder="Например, 14500"/>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Единица цены
          </label>
          <select
            value={form.priceUnit}
            onChange={handleChange("priceUnit")}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400">
            {(
              Object.keys(priceUnitLabels) as Array<keyof typeof priceUnitLabels>
            ).map((key) => (
              <option key={key} value={key}>
                {priceUnitLabels[key]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-slate-500">
          Статус товара
        </label>
        <select
          value={form.status || ""}
          onChange={handleChange("status")}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400">
          <option value="">Автоматически (в наличии если есть количество)</option>
          <option value={EProductStatus.IN_STOCK}>В наличии</option>
          <option value={EProductStatus.ON_ORDER}>Под заказ</option>
          <option value={EProductStatus.OUT_OF_STOCK}>Нет в наличии</option>
        </select>
      </div>
    </div>
  </section>
  );
};