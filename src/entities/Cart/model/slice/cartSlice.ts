import { Cart, LineItem } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CartSchema } from '../types/Cart';
import { cartThunk } from '../services/cartThunk';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { getLocalStorageValue } from '@/shared/util/LocalStorageHandler';

const initialState: CartSchema = {
  products: getLocalStorageValue(LocalStorageKeys.ACTIVE_CART).lineItems || [],
  isLoading: false,
  getCartLoadingProductsIds: [],
  totalPrice:
    getLocalStorageValue(LocalStorageKeys.ACTIVE_CART).totalPrice || {},
  discountOnTotalPrice:
    getLocalStorageValue(LocalStorageKeys.ACTIVE_CART).discountOnTotalPrice ||
    {},
  error: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, { payload }: PayloadAction<LineItem[]>) => {
      state.products = payload;
    },
    clearCart: (state) => {
      state.products = [];
    },
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cartThunk.pending, (state, action) => {
        state.isLoading = true;
        state.getCartLoadingProductsIds?.push(action.meta.arg.cardId || '');
      })
      .addCase(
        cartThunk.fulfilled,
        (state, { payload }: PayloadAction<Cart>) => {
          state.products = payload.lineItems;
          state.totalPrice = payload.totalPrice;
          state.discountOnTotalPrice = payload.discountOnTotalPrice;
          state.isLoading = false;
          state.getCartLoadingProductsIds = [];
        },
      )
      .addCase(
        cartThunk.rejected,
        (state, { payload }: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = payload || '';
          state.getCartLoadingProductsIds = [];
        },
      );
  },
});

export const { actions: cartActions, reducer: cartReducer } = cartSlice;
