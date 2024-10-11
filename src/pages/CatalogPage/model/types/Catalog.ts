import { ProductProjection } from '@commercetools/platform-sdk';
import { CategoryCustom } from '@/shared/api';

export enum ParentCategoryName {
  PERSONAL_CARE_PRODUCTS = 'Personal care products',
  ACCESSORIES = 'Accessories',
  TABLEWARE = 'Tableware',
  HOME = 'Home',
}

export enum ItemsCategoryName {
  GLASSES = 'Glasses',
  BOTTLES = 'Bottles',
  BAGS = 'Bags',
  CASES = 'Cases',
  CANDLES = 'Candles',
  CLEANING = 'Cleaning',
  ORAL_HYGIENE = 'Oral hygiene',
  SHOWER_AND_SHAVE = 'Shower and shave',
}

export interface CatalogPageData {
  products?: ProductProjection[];
  discountProducts?: ProductProjection[];
  categories?: CategoryCustom[];
  isLoading?: boolean;
}

export type SortFields = 'price' | 'name.en-GB' | 'default';
export type SortOrder = 'asc' | 'desc' | '';

export interface CatalogSortObject {
  field: SortFields;
  order: SortOrder;
}

export interface CatalogSchema {
  isLoading?: boolean;

  products: ProductProjection[];
  discountProducts: ProductProjection[];
  categories: CategoryCustom[];

  page: number;
  hasMore: boolean;
  limit: number;

  search: string;
  sort: CatalogSortObject;
  selectedBrands: string[];
  brands: string[];
  maxPrice: string;
  minPrice: string;
  selectedCategoryId: string;
}
