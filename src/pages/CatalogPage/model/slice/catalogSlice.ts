import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { enableMapSet } from 'immer';
import { CatalogPageData, CatalogSchema } from '../types/Catalog';
import { SortMapper, SortingConsts } from '@/shared/const/SortingParams';
import { fetchProducts } from '../services/fetchProducts';
import { getAdditionalInfo } from '../services/getAdditionalInfo';

const initialState: CatalogSchema = {
  isLoading: false,
  products: [],
  discountProducts: [],
  categories: [],
  search: '',
  sort: { field: 'default', order: '' },
  brands: [],
  selectedBrands: [],
  maxPrice: '',
  minPrice: '',
  selectedCategoryId: '',
  page: 0,
  hasMore: true,
  limit: 6,
};

enableMapSet();

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setOrder: (state, { payload }: PayloadAction<SortingConsts>) => {
      state.sort.field = SortMapper[payload].field;
      state.sort.order = SortMapper[payload].order;
    },
    setSelectedBrands: (state, { payload }: PayloadAction<string>) => {
      state.selectedBrands.push(payload);
    },
    setSelectedCategoryId: (state, { payload }: PayloadAction<string>) => {
      state.selectedCategoryId = payload;
    },
    removeSelectedBrands: (state, { payload }: PayloadAction<string>) => {
      state.selectedBrands = state.selectedBrands.filter(
        (item) => item !== payload,
      );
    },
    removeSelectedPrice: (state) => {
      state.maxPrice = '';
      state.minPrice = '';
    },
    removeAllFilters: (state) => {
      state.selectedBrands = [];
      state.maxPrice = '';
      state.minPrice = '';
    },
    changeMaxPrice: (state, { payload }: PayloadAction<string>) => {
      state.maxPrice = payload;
    },
    changeMinPrice: (state, { payload }: PayloadAction<string>) => {
      state.minPrice = payload;
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (action.meta.arg?.scrolling) {
          state.products.push(...action.payload.products);
        } else {
          state.products = action.payload.products;
        }
        state.hasMore = action.payload.products.length >= state.limit;
        state.brands = action.payload.brands;
      })
      .addCase(getAdditionalInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAdditionalInfo.fulfilled,
        (state, { payload }: PayloadAction<CatalogPageData>) => {
          state.discountProducts = payload.discountProducts || [];
          state.categories = payload.categories || [];
          state.isLoading = false;
        },
      );
  },
});

export const { actions: catalogActions, reducer: catalogReducer } =
  catalogSlice;
