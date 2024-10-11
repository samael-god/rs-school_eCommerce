import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/store/types/StateSchema';
import {
  getCatalogPageHasMore,
  getCatalogPageIsLoading,
  getCatalogPageNumber,
} from '../selectors/catalogPageSelectors';
import { catalogActions } from '../slice/catalogSlice';
import { fetchProducts } from './fetchProducts';

export const fetchNextPart = createAsyncThunk<void, void, ThunkConfig<string>>(
  'catalog/fetchNextPart',
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;

    const page = getCatalogPageNumber(getState());
    const hasMore = getCatalogPageHasMore(getState());
    const isLoading = getCatalogPageIsLoading(getState());

    if (hasMore ?? !isLoading) {
      dispatch(catalogActions.setPage(page + 1));
      dispatch(fetchProducts({ scrolling: true }));
    }
  },
);
