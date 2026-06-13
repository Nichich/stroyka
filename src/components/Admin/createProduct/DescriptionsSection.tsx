import React from "react";
import { ProductFormData } from "@/shared/admin/products.interface";
import { SectionTitle } from "./SectionTitle";

interface Props {
  form: ProductFormData;
  handleChange: (
    field: keyof ProductFormData
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export const DescriptionsSection: React.FC<Props> = ({ form, handleChange }) => {
  return (
    <section className="mb-8 mt-5">
      <SectionTitle icon="📝">ОПИСАНИЯ И ИНФОРМАЦИЯ</SectionTitle>

      <div className="space-y-5">

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Описание товара
          </label>
          <textarea
            value={form.description || ""}
            onChange={handleChange("description")}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 min-h-[100px]"
            placeholder="Качественная продукция для различных целей. Долговечность и надежность гарантированы."
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Информация о доставке
          </label>
          <textarea
            value={form.delivery || ""}
            onChange={handleChange("delivery")}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 min-h-[100px]"
            placeholder="Доставка осуществляется по всей России..."
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Условия возврата
          </label>
          <textarea
            value={form.return || ""}
            onChange={handleChange("return")}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 min-h-[100px]"
            placeholder="Возврат товара возможен в течение 14 дней..."
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Способы оплаты
          </label>
          <textarea
            value={form.payment || ""}
            onChange={handleChange("payment")}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 min-h-[100px]"
            placeholder="Оплата наличными, по карте, безналичный расчет..."
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Полезные материалы
          </label>
          <textarea
            value={form.useful || ""}
            onChange={handleChange("useful")}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400 min-h-[100px]"
            placeholder="Инструкции по укладке, советы по уходу..."
          />
        </div>
      </div>
    </section>
  );
};
