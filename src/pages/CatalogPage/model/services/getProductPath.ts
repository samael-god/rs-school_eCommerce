import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/store/types/StateSchema';
import { getCategoryById, getProductTypeById } from '@/shared/api';

interface GetProductPathProps {
  productId: string;
  categoryId: string;
}

interface ReturnedValue {
  category?: string;
  subCategory?: string;
}

export const getProductPath = createAsyncThunk<
  ReturnedValue,
  GetProductPathProps,
  ThunkConfig<string>
>(
  'catalog/getProductPath',
  async ({ productId, categoryId }, { rejectWithValue }) => {
    try {
      const [{ key: category }] = await getProductTypeById(productId);
      const [{ key: subCategory }] = await getCategoryById(categoryId);

      return { category, subCategory };
    } catch (e) {
      return rejectWithValue('Wrong Path');
    }
  },
);
