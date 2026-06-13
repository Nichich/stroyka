"use client";

import { useEffect, useState, useMemo } from "react";
import {
  ProductFormData,
  ProductCharacteristic,
} from "@/shared/admin/products.interface";
import { useGetColors } from "@/hooks/colors/useGetColors";
import { EProductStatus } from "@/shared/types/product.interface";

const emptyForm: ProductFormData = {
  name: "",
  categoryId: "",
  quantityInStock: 0,
  perPalletCount: 0,
  pricePerPallet: 0,
  priceUnit: "per_m2",
  images: [],
  characteristics: [],
};

export function useProductForm(initial?: ProductFormData) {
  const [form, setForm] = useState<ProductFormData>(initial ?? emptyForm);
  const { colors, isLoading: isLoadingColors } = useGetColors();

  const colorOptions = useMemo(() => {
    if (!colors) return [];
    return colors.map((c) => ({
      id: c.id,
      name: c.title,
      hex: c.value
    }));
  }, [colors]);

  useEffect(() => {
    if (initial) {
      setForm(initial);
      const colorChars = initial.characteristics.filter(c => c.name === 'Цвет');
      if (colorChars.length > 0) {
        const colorIds = colorChars.map(c => (c as any).colorId).filter(Boolean);
        setSelectedColorIds(colorIds);
      }
    }
  }, [initial]);

  const [selectedColorId, setSelectedColorId] = useState<string>("");
  const [selectedColorIds, setSelectedColorIds] = useState<string[]>([]);
  const [heightValue, setHeightValue] = useState<string>("");
  const [newCharName, setNewCharName] = useState("");
  const [newCharValue, setNewCharValue] = useState("");

  const handleChange =
    (field: keyof ProductFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = e.target.value;

      if (
        field === "quantityInStock" ||
        field === "perPalletCount" ||
        field === "pricePerPallet"
      ) {
        setForm((prev) => ({
          ...prev,
          [field]: value === "" ? 0 : Number(value),
        }));
        return;
      }

      if (field === "status") {
        setForm((prev) => ({
          ...prev,
          status: value as any,
          quantityInStock: value === EProductStatus.OUT_OF_STOCK ? 0 : prev.quantityInStock,
        }));
        return;
      }

      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleAddHeight = () => {
    if (!heightValue.trim()) return;

    const char: ProductCharacteristic = {
      id: `height-${Date.now()}`,
      name: "Высота",
      value: heightValue.trim(),
      unit: "мм",
    };

    setForm((prev) => ({
      ...prev,
      characteristics: [...prev.characteristics, char],
    }));
    setHeightValue("");
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedColorId(id);
    const color = colorOptions.find((c) => c.id === id);
    if (!color) return;

    setForm((prev) => {
      const existingIndex = prev.characteristics.findIndex(
        (c) => c.name === "Цвет"
      );
      const characteristics = [...prev.characteristics];

      if (existingIndex >= 0) {
        characteristics[existingIndex] = {
          ...characteristics[existingIndex],
          value: color.name,
        };
      } else {
        characteristics.push({
          id: `color-${Date.now()}`,
          name: "Цвет",
          value: color.name,
        });
      }

      return { ...prev, characteristics };
    });
  };

  const handleAddColor = (colorId: string) => {
    if (selectedColorIds.includes(colorId)) return;

    const color = colorOptions.find((c) => c.id === colorId);
    if (!color) return;

    setSelectedColorIds(prev => [...prev, colorId]);
  };

  const handleRemoveColor = (colorId: string) => {
    setSelectedColorIds(prev => prev.filter(id => id !== colorId));
  };

  const handleAddCustomCharacteristic = () => {
    if (!newCharName.trim() || !newCharValue.trim()) return;

    const char: ProductCharacteristic = {
      id: `char-${Date.now()}`,
      name: newCharName.trim(),
      value: newCharValue.trim(),
    };

    setForm((prev) => ({
      ...prev,
      characteristics: [...prev.characteristics, char],
    }));

    setNewCharName("");
    setNewCharValue("");
  };

  const handleRemoveCharacteristic = (id: string) => {
    setForm((prev) => ({
      ...prev,
      characteristics: prev.characteristics.filter((c) => c.id !== id),
    }));
  };

  const handleFilesChange = (files: File[]) => {
    setForm((prev) => {
      const existingFiles = prev.imageFiles || [];
      const existingImages = prev.images || [];
      const newFiles = [...existingFiles, ...files];

      const newImages = files.map((file, index) => ({
        id: `temp-${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        alt: file.name,
        isPrimary: existingImages.length === 0 && index === 0
      }));

      return {
        ...prev,
        imageFiles: newFiles,
        images: [...existingImages, ...newImages]
      };
    });
  };

  const handleRemoveImage = (imageId: string) => {
    setForm((prev) => {
      const imageIndex = prev.images.findIndex(img => img.id === imageId);
      if (imageIndex === -1) return prev;

      const newImages = prev.images.filter(img => img.id !== imageId);
      const newImageFiles = prev.imageFiles?.filter((_, index) => {
        const tempImageIndex = prev.images.findIndex(img => img.id === imageId);
        return index !== tempImageIndex;
      }) || [];

      if (prev.images[imageIndex].isPrimary && newImages.length > 0) {
        newImages[0].isPrimary = true;
      }

      return {
        ...prev,
        imageFiles: newImageFiles,
        images: newImages
      };
    });
  };

  const handleSetPrimaryImage = (imageId: string) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.map(img => ({
        ...img,
        isPrimary: img.id === imageId
      }))
    }));
  };

  return {
    form,
    setForm,
    selectedColorId,
    setSelectedColorId,
    selectedColorIds,
    setSelectedColorIds,
    heightValue,
    setHeightValue,
    newCharName,
    setNewCharName,
    newCharValue,
    setNewCharValue,
    colorOptions,
    isLoadingColors,
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
  };
}