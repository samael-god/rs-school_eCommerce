import { StateSchema } from '@/app/store/types/StateSchema';

export const getCatalogPageIsLoading = (state: StateSchema) =>
  state.catalog?.isLoading ?? '';
export const getCatalogPageProducts = (state: StateSchema) =>
  state.catalog?.products ?? '';
export const getCatalogPageCategories = (state: StateSchema) =>
  state.catalog?.categories ?? '';
export const getCatalogPageDiscountProducts = (state: StateSchema) =>
  state.catalog?.discountProducts ?? '';
export const getCatalogPageBrands = (state: StateSchema) =>
  state.catalog?.brands ?? '';
export const getCatalogPageSearch = (state: StateSchema) =>
  state.catalog?.search ?? '';
export const getCatalogPageSort = (state: StateSchema) =>
  state.catalog?.sort ?? '';
export const getCatalogPageSelectedBrands = (state: StateSchema) =>
  state.catalog?.selectedBrands ?? '';
export const getCatalogPageMaxPrice = (state: StateSchema) =>
  state.catalog?.maxPrice ?? '';
export const getCatalogPageMinPrice = (state: StateSchema) =>
  state.catalog?.minPrice ?? '';
export const getCatalogPageSelectedCategory = (state: StateSchema) =>
  state.catalog?.selectedCategoryId ?? '';
export const getCatalogPageNumber = (state: StateSchema) =>
  state.catalog?.page ?? '';
export const getCatalogPageHasMore = (state: StateSchema) =>
  state.catalog?.hasMore ?? '';
export const getCatalogPageLimit = (state: StateSchema) =>
  state.catalog?.limit ?? '';
