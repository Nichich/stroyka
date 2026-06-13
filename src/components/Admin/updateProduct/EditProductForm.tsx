"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductFormData } from "@/shared/admin/products.interface";
import { useProductForm } from "../createProduct/useProduct";
import { MainInfoSection } from "../createProduct/MainInfoSection";
import { ImagesSection } from "../createProduct/ImagesSection";
import { CharacteristicsSection } from "../createProduct/OptionsSection";
import { DescriptionsSection } from "../createProduct/DescriptionsSection";
import { EProductMeasure, EProductStatus } from "@/shared/types/product.interface";
import { CreateColorModal } from "../CreateColorModal";
import { useCreateColor } from "@/hooks/colors/useCreateColor";
import { productService } from "@/services/product.service";
import { useUpdateProduct } from "@/hooks/products/useUpdateProduct";
import { useQueryClient } from "@tanstack/react-query";

interface EditProductFormProps {
  initialProduct: ProductFormData;
}

export default function EditProductForm({ initialProduct }: EditProductFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { updateProduct } = useUpdateProduct();
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [initialImageUrls] = useState<string[]>(
    initialProduct.images?.filter(img => img.url.startsWith('http')).map(img => img.url) || []
  );

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
  } = useProductForm(initialProduct);

  const { createColor } = useCreateColor();

  const handleCreateColor = (title: string, value: string) => {
    createColor({ title, value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.id) return;

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
      categoryId: form.categoryId,
      status: finalStatus,
      description: form.description,
      delivery: form.delivery,
      return: form.return,
      payment: form.payment,
      useful: form.useful
    };

    try {
      await updateProduct({ productId: form.id, data: productData });

      const currentImageUrls = form.images
        .filter(img => img.url.startsWith('http'))
        .map(img => img.url);

      const deletedImageUrls = initialImageUrls.filter(
        url => !currentImageUrls.includes(url)
      );

      const newImageFiles = form.imageFiles || [];

      if (deletedImageUrls.length > 0 || newImageFiles.length > 0) {
        await productService.updateImages(form.id, deletedImageUrls, newImageFiles);
      }

      await queryClient.invalidateQueries({ queryKey: ['products-all'] });
      await queryClient.invalidateQueries({ queryKey: ['products-all-admin'] });
      await queryClient.invalidateQueries({ queryKey: ['product'] });

      router.push('/admin/products');
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      alert('Ошибка при сохранении товара: ' + (error instanceof Error ? error.message : 'Неизвестная ошибка'));
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-black">
      <main className="mx-auto max-w-[900px] px-6 py-8">
        <div className="mb-6 flex items-center gap-4">
          <Link
            href="/admin/products"
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            ← Назад
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            РЕДАКТИРОВАНИЕ ТОВАРА
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-8 shadow-sm"
        >
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
            onAddColorClick={() => setIsColorModalOpen(true)}
          />

          <DescriptionsSection form={form} handleChange={handleChange} />

          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Отменить
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#F0882B] px-5 py-2 text-sm font-semibold text-white hover:bg-[#d97316]"
            >
              Сохранить изменения
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