"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProductForm } from "./useProduct";
import { MainInfoSection } from "./MainInfoSection";
import { ImagesSection } from "./ImagesSection";
import { CharacteristicsSection } from "./OptionsSection";
import { DescriptionsSection } from "./DescriptionsSection";
import { useCreateProduct } from "@/hooks/products/useCreateProduct";
import { EProductMeasure, EProductStatus } from "@/shared/types/product.interface";
import { CreateColorModal } from "../CreateColorModal";
import { useCreateColor } from "@/hooks/colors/useCreateColor";

export default function CreateProductForm() {
  const router = useRouter();
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);

  const {
    form,
    selectedColorId,
    selectedColorIds,
    heightValue,
    newCharName,
    newCharValue,
    colorOptions,
    isLoadingColors,
    setHeightValue,
    setNewCharName,
    setNewCharValue,
    handleChange,
    handleAddHeight,
    handleColorChange,
    handleAddColor,
    handleRemoveColor,
    handleAddCustomCharacteristic,
    handleRemoveCharacteristic,
    handleFilesChange,
    handleRemoveImage,
    handleSetPrimaryImage,
  } = useProductForm();

  const { createProduct, isLoadingCreate } = useCreateProduct();
  const { createColor } = useCreateColor();

  const handleCreateColor = (title: string, value: string) => {
    createColor({ title, value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let finalStatus = form.status;
    let finalQuantity = form.quantityInStock;

    if (form.status === EProductStatus.OUT_OF_STOCK) {
      finalQuantity = 0;
    }

    if (!finalStatus) {
      finalStatus = finalQuantity > 0 ? EProductStatus.IN_STOCK : EProductStatus.ON_ORDER;
    }

    let measure = EProductMeasure.PALLET;
    if (form.priceUnit === 'per_piece') {
      measure = EProductMeasure.THING;
    } else if (form.priceUnit === 'per_m2') {
      measure = EProductMeasure.SQMETERS;
    } else if (form.priceUnit === 'per_pallet') {
      measure = EProductMeasure.PALLET;
    }

    const productData = {
      title: form.name,
      quantity: finalQuantity,
      meters: form.perPalletCount,
      price: form.pricePerPallet,
      measure: measure,
      height: parseFloat(form.characteristics.find(c => c.name === 'Высота')?.value || '0'),
      palletArea: form.perPalletCount,
      colorIds: selectedColorIds.length > 0 ? selectedColorIds : undefined,
      optionIds: [],
      images: form.imageFiles || [],
      categoryId: form.categoryId,
      status: finalStatus,
      description: form.description,
      delivery: form.delivery,
      return: form.return,
      payment: form.payment,
      useful: form.useful
    };

    createProduct(
      {
        categoryId: form.categoryId,
        data: productData
      },
      {
        onSuccess: () => {
          router.push('/admin/products');
        },
        onError: (error) => {
          console.error('Ошибка при создании продукта:', error);
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-black">
      <main className="mx-auto max-w-[900px] px-6 py-8">
        <div className="mb-6 flex items-center gap-4 max-[386px]:flex-col max-[386px]:items-start">
          <Link
            href="/admin/products"
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
            ← Назад
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            СОЗДАНИЕ ТОВАРА
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 shadow-sm">
          <MainInfoSection form={form} handleChange={handleChange} />
          <ImagesSection
            images={form.images}
            onFilesChange={handleFilesChange}
            onRemoveImage={handleRemoveImage}
            onSetPrimary={handleSetPrimaryImage}
          />
          <CharacteristicsSection
            form={form}
            selectedColorId={selectedColorId}
            selectedColorIds={selectedColorIds}
            heightValue={heightValue}
            newCharName={newCharName}
            newCharValue={newCharValue}
            colorOptions={colorOptions}
            isLoadingColors={isLoadingColors}
            setHeightValue={setHeightValue}
            setNewCharName={setNewCharName}
            setNewCharValue={setNewCharValue}
            handleAddHeight={handleAddHeight}
            handleColorChange={handleColorChange}
            handleAddColor={handleAddColor}
            handleRemoveColor={handleRemoveColor}
            handleAddCustomCharacteristic={handleAddCustomCharacteristic}
            handleRemoveCharacteristic={handleRemoveCharacteristic}
            onAddColorClick={() => setIsColorModalOpen(true)}/>

          <DescriptionsSection form={form} handleChange={handleChange} />

          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Отменить
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#F0882B] px-5 py-2 text-sm font-semibold text-white hover:bg-[#d97316]">
              Сохранить товар
            </button>
          </div>
        </form>

        <CreateColorModal
          isOpen={isColorModalOpen}
          onClose={() => setIsColorModalOpen(false)}
          onCreate={handleCreateColor}
        />
      </main>
    </div>
  );
}