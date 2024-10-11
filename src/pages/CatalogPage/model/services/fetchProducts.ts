import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCatalogPageSort,
  getCatalogPageSearch,
  getCatalogPageMaxPrice,
  getCatalogPageMinPrice,
  getCatalogPageSelectedBrands,
  getCatalogPageSelectedCategory,
  getCatalogPageLimit,
  getCatalogPageNumber,
} from '../selectors/catalogPageSelectors';

import { ThunkConfig } from '@/app/store/types/StateSchema';
import { ProductsResult, getFilterSortSearchProducts } from '@/shared/api';

interface FetchAProductsProps {
  scrolling?: boolean;
}

export const fetchProducts = createAsyncThunk<
  ProductsResult,
  FetchAProductsProps,
  ThunkConfig<string>
>('catalog/fetchProducts', async (_, { rejectWithValue, getState }) => {
  const search = getCatalogPageSearch(getState());
  const sort = getCatalogPageSort(getState());
  const selectedBrands = getCatalogPageSelectedBrands(getState());
  const maxPrice = Number(getCatalogPageMaxPrice(getState()));
  const minPrice = Number(getCatalogPageMinPrice(getState()));
  const selectedCategoryId = getCatalogPageSelectedCategory(getState());
  const limit = getCatalogPageLimit(getState());
  const page = getCatalogPageNumber(getState());

  try {
    const result = await getFilterSortSearchProducts({
      search,
      attributesToSort: sort,
      selectedFiltersList: Array.from(selectedBrands),
      categoryType: {
        selectedCategoryId,
        attributesToFilter: {
          name: selectedBrands.length !== 0 ? 'brand' : undefined,
        },
      },
      maxPrice,
      minPrice,
      currentOffSet: page * limit,
      itemPerPage: limit,
    });

    return result;
  } catch (e) {
    return rejectWithValue('No Products');
  }
});
