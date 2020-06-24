import api from "./api";
import { Category } from "./category";
import { Voucher } from "./voucher";

export enum Grind {
  BEAN = "bean",
  FILTER = "filter",
  ESPRESSO = "espresso",
}

export type Option = Grind;

export enum Feature {
  SIZE = "cup-size",
  MILK = "milk",
  SUGAR = "sugar",
}

export interface ProductFeature {
  id: number;
  slug: Feature | string;
  name: string;
  description: string;
  options: ProductOption[];
}

export interface ProductOption {
  id: number;
  slug: string;
  name: string;
  is_none: boolean;
  description: string;
}

export interface Product {
  id: number;
  slug: string;
  full_name: string;
  name: string;
  code: string;
  is_available: boolean;
  price: number; // Giá bán 10k
  original_price: number; // Giá gốc 15k
  images: string[]; // hình ảnh [hình 1, hình 2..]
  unit: string; // đơn vị tính
  description: string;
  is_default: boolean;
  is_feature: boolean;
  features: ProductFeature[]; // tùy chọn xay, đóng gói
  children: Product[]; // sản phẩm con: <xay pha phin, gói 500g>, <xay pha phin, 10kg>, <xay máy, 500g>
  options: number[];
  category: Category;
  badges: ProductBadge[];
  vouchers: Voucher[];
}

export interface ProductBadge {
  slug: string;
  description: string;
}

export interface ProductCollection {
  id: number;
  name: string;
  description: string;
  products: Product[];
}

export async function loadProductById(id: number) {
  return api.get<Product>(`/product?id=${id}`);
}

export async function loadProduct(slug: string) {
  return api.get<Product>(`/product?slug=${slug}`);
}

export async function loadProducts() {
  // await new Promise(resolve => setTimeout(resolve, 5000));-
  return api.get<Product[]>("/product/all");
}

export async function loadCollections() {
  return api.get<ProductCollection[]>("/product/collection/all");
}

export async function loadCollectionsByIds(ids: number[]) {
  return api.get<ProductCollection[]>(
    `/product/collection?ids=${ids.join(",")}`
  );
}
