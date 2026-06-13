import { EProductStatus } from "../types/product.interface";

export interface ProductCategory {
  id: string;
  name: string;
  count: number;
}


export type PriceUnit = 'per_piece' | 'per_m2' | 'per_pallet';


export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}


export interface ProductCharacteristic {
  id: string;
  name: string;   
  value: string; 
  unit?: string;  
}

export interface ProductFormData {
  id?: string;
  name: string;
  categoryId: string;
  quantityInStock: number;
  perPalletCount: number;
  pricePerPallet: number;
  priceUnit: PriceUnit;
  status?: EProductStatus;
  images: ProductImage[];
  imageFiles?: File[];
  characteristics: ProductCharacteristic[];
  description?: string;
  delivery?: string;
  return?: string;
  payment?: string;
  useful?: string;
}
