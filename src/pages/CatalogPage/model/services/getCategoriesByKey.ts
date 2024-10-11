import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/store/types/StateSchema';
import { getCategoryByKey } from '@/shared/api';

export const getCategoriesByKey = createAsyncThunk<
  string,
  string,
  ThunkConfig<string>
>('catalog/getCategoriesByKey', async (key, { rejectWithValue }) => {
  try {
    const id = await getCategoryByKey(key);

    return id;
  } catch (e) {
    return rejectWithValue('Wrong category Key');
  }
});
