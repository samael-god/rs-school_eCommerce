import { StateSchema } from '@/app/store/types/StateSchema';

export const getCartIsLoading = (state: StateSchema) =>
  state.cart?.isLoading ?? '';
export const getCartError = (state: StateSchema) => state.cart?.error ?? '';
export const getCartLoadingProductsIds = (state: StateSchema) =>
  state.cart?.getCartLoadingProductsIds ?? '';
export const getCartProducts = (state: StateSchema) =>
  state.cart?.products ?? '';
export const getCartDiscountOnTotalPrice = (state: StateSchema) =>
  state.cart.discountOnTotalPrice ?? '';
export const getCartTotalPrice = (state: StateSchema) =>
  state.cart.totalPrice ?? '';
export const getQuantity = (state: StateSchema, id: string) =>
  state.cart.products.find((item) => item.id === id)?.quantity ?? 1;
