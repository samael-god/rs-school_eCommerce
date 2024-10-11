import { createAsyncThunk } from '@reduxjs/toolkit';
import { CatalogPageData } from '../types/Catalog';

import { ThunkConfig } from '@/app/store/types/StateSchema';
import { getCategories, getDiscountProducts } from '@/shared/api';

export const getAdditionalInfo = createAsyncThunk<
  CatalogPageData,
  void,
  ThunkConfig<string>
>('catalog/getAdditionalInfo', async (_, { rejectWithValue }) => {
  const data: CatalogPageData = {
    categories: [],
    discountProducts: [],
  };
  try {
    const categories = await getCategories();
    const discountProducts = await getDiscountProducts();

    if (!categories) {
      throw new Error();
    }

    data.categories = categories;
    data.discountProducts = discountProducts;

    return data;
  } catch (e) {
    return rejectWithValue('Server Error');
  }
});
