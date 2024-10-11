import { Cart } from '@commercetools/platform-sdk';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/store/types/StateSchema';
import {
  UpdateCartParams,
  addNewProductInCartOrUpdateQuantity,
} from '@/shared/api';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { getLocalStorageValue } from '@/shared/util/LocalStorageHandler';

export const cartThunk = createAsyncThunk<
  Cart,
  UpdateCartParams,
  ThunkConfig<string>
>(
  'cart/cartThunk',
  async ({ cardId, mode, quantity = 1, code }, { rejectWithValue }) => {
    const cartFromLS: Cart = getLocalStorageValue(LocalStorageKeys.ACTIVE_CART);
    const cartData = Object.keys(cartFromLS).length === 0 ? null : cartFromLS;
    const promoCodeId = cartFromLS?.discountCodes?.[0]?.discountCode?.id;

    try {
      const response = await addNewProductInCartOrUpdateQuantity({
        mode,
        quantity,
        cardId,
        cartData,
        code,
        promoCodeId,
      });

      if (!response) {
        throw new Error();
      }

      return response;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
