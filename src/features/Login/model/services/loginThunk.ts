import { createAsyncThunk } from '@reduxjs/toolkit';

import { ByProjectKeyRequestBuilder, Cart } from '@commercetools/platform-sdk';
import { LoginSubmitData } from '../types/Login';
import { loginUser } from '@/shared/api';
import { userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/store/types/StateSchema';
import { cartActions } from '@/entities/Cart';
import { getLocalStorageValue } from '@/shared/util/LocalStorageHandler';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';

export const loginThunk = createAsyncThunk<
  ByProjectKeyRequestBuilder,
  LoginSubmitData,
  ThunkConfig<string>
>('login/loginThunk', async ({ email, password }, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;

  try {
    const response = await loginUser(email, password);

    if (!response) {
      throw new Error();
    }
    dispatch(userActions.setIsLogged(true));
    const cartFromLS = getLocalStorageValue(
      LocalStorageKeys.ACTIVE_CART,
    ).lineItems;
    if (cartFromLS) {
      dispatch(cartActions.setCart(cartFromLS));
    }

    return response;
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});
