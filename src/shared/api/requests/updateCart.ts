import {
  Cart,
  MyCartAddDiscountCodeAction,
  MyCartAddLineItemAction,
  MyCartChangeLineItemQuantityAction,
  MyCartRemoveDiscountCodeAction,
  MyCartRemoveLineItemAction,
  MyCartUpdateAction,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import {
  apirootPassword,
  constructClientAnonymousFlow,
  constructClientRefresh,
} from '../BuildClient';
import { tokenInstance } from '../tokenHandlers';
import { UpdateCartParams } from '../types/apiTypes';

const { VITE_CTP_PROJECT_KEY } = import.meta.env;

function setLocalStorage(isAllTokens: boolean): void {
  if (tokenInstance.get().token) {
    localStorage.setItem(LocalStorageKeys.TOKEN, tokenInstance.get().token);
  }
  if (
    tokenInstance.get().refreshToken &&
    (isAllTokens || !localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN))
  ) {
    localStorage.setItem(
      LocalStorageKeys.REFRESH_TOKEN,
      tokenInstance.get().refreshToken || '',
    );
  }
}

async function getCorrectApiRoot(): Promise<ByProjectKeyRequestBuilder> {
  const user = localStorage.getItem(LocalStorageKeys.USER);
  const refreshToken = localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN);
  let result;

  if (user && apirootPassword) {
    result = apirootPassword;
    setLocalStorage(true);
  } else if (refreshToken) {
    try {
      result = constructClientRefresh();
      setLocalStorage(false);
    } catch {
      result = constructClientAnonymousFlow();
      setLocalStorage(true);
    }
  } else {
    result = constructClientAnonymousFlow();
    setLocalStorage(true);
  }

  return result;
}

let apiRootForRequest = await getCorrectApiRoot();

export async function changeApiRootToPassword(): Promise<void> {
  if (apirootPassword) {
    apiRootForRequest = apirootPassword;
  }
}

export async function createNewCart(): Promise<Cart | undefined> {
  try {
    const result = await apiRootForRequest
      .me()
      .carts()
      .post({
        body: {
          currency: 'USD',
          country: 'RU',
        },
      })
      .execute();
    setLocalStorage(false);
    return result.body;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
  return undefined;
}

export async function addNewProductInCartOrUpdateQuantity(
  props: UpdateCartParams,
): Promise<Cart | undefined> {
  const {
    cartData,
    mode,
    cardId,
    quantity = 1,
    firstFunctionCall,
    code = '',
    promoCodeId = '',
  } = props;

  let tempActions:
    | MyCartAddLineItemAction
    | MyCartAddDiscountCodeAction
    | MyCartRemoveDiscountCodeAction
    | MyCartChangeLineItemQuantityAction
    | MyCartRemoveLineItemAction
    | MyCartRemoveLineItemAction[] = [];

  switch (mode) {
    case 'new':
      tempActions = {
        action: 'addLineItem',
        productId: cardId,
        quantity,
      };
      break;
    case 'update':
      tempActions = {
        action: 'changeLineItemQuantity',
        lineItemId: cardId,
        quantity,
      };
      break;
    case 'addDiscountCode':
      tempActions = {
        action: 'addDiscountCode',
        code,
      };
      break;
    case 'removeDiscountCode':
      tempActions = {
        action: 'removeDiscountCode',
        discountCode: {
          typeId: 'discount-code',
          id: promoCodeId,
        },
      };
      break;
    case 'remove':
      if (cartData) {
        tempActions =
          cartData.lineItems?.map((el) => {
            return {
              action: 'removeLineItem',
              lineItemId: el.id,
            };
          }) || [];
      }
      break;
    case 'removeProduct':
      if (cartData) {
        tempActions = {
          action: 'removeLineItem',
          lineItemId:
            cartData.lineItems?.find((item) => item.productId === cardId)?.id ||
            cardId,
        };
      }
      break;
    default:
  }
  const actions = tempActions;

  try {
    const cartForRequest = cartData || (await createNewCart());
    if (cartForRequest && cartForRequest.id && cartForRequest.version) {
      await apiRootForRequest
        .me()
        .carts()
        .withId({ ID: cartForRequest.id })
        .post({
          body: {
            version: cartForRequest.version,
            actions: Array.isArray(actions) ? [...actions] : [actions],
          },
        })
        .execute();
    }
    const activeCart = await apiRootForRequest
      .me()
      .activeCart()
      .get()
      .execute();
    if (mode !== 'remove' && activeCart.body.lineItems.length) {
      localStorage.setItem(
        LocalStorageKeys.ACTIVE_CART,
        JSON.stringify(activeCart.body),
      );
    } else {
      localStorage.removeItem(LocalStorageKeys.ACTIVE_CART);
    }

    return activeCart.body;
  } catch (e) {
    if (
      e instanceof Error &&
      e.message.startsWith(
        `URI not found: /${VITE_CTP_PROJECT_KEY}/me/carts/`,
      ) &&
      firstFunctionCall
    ) {
      apiRootForRequest = constructClientRefresh();
      return addNewProductInCartOrUpdateQuantity({
        cartData,
        mode,
        cardId,
        quantity,
        firstFunctionCall: false,
      });
    }
    if (
      e instanceof Error &&
      (e.message === 'Missing required option (refreshToken)' ||
        e.message ===
          'The refresh token was not found. It may have expired.') &&
      firstFunctionCall
    ) {
      localStorage.removeItem(LocalStorageKeys.USER);
      localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
      localStorage.removeItem(LocalStorageKeys.TOKEN);
      localStorage.removeItem(LocalStorageKeys.ACTIVE_CART);
      apiRootForRequest = await getCorrectApiRoot();

      return addNewProductInCartOrUpdateQuantity({
        cartData: null,
        mode,
        cardId,
        quantity,
        firstFunctionCall: false,
      });
    }
    if (
      e instanceof Error &&
      e.message === `The discount code '${code}' was not found.`
    ) {
      throw new Error(e.message);
    }
    if (e instanceof Error && e.message === 'Failed to fetch') {
      throw new Error('Server error');
    }
  }
  return undefined;
}

export async function getActiveCart(
  firstFunctionCall: boolean,
): Promise<Cart | null> {
  try {
    const activeCart = await apiRootForRequest
      .me()
      .activeCart()
      .get()
      .execute();

    localStorage.setItem(
      LocalStorageKeys.ACTIVE_CART,
      JSON.stringify(activeCart.body),
    );

    return activeCart.body;
  } catch (e) {
    if (
      e instanceof Error &&
      e.message === `URI not found: /${VITE_CTP_PROJECT_KEY}/me/active-cart` &&
      firstFunctionCall
    ) {
      if (localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN)) {
        apiRootForRequest = constructClientRefresh();
        return getActiveCart(false);
      }
      return null;
    }
    if (
      e instanceof Error &&
      (e.message === 'Missing required option (refreshToken)' ||
        e.message ===
          'The refresh token was not found. It may have expired.') &&
      firstFunctionCall
    ) {
      localStorage.removeItem(LocalStorageKeys.USER);
      localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
      localStorage.removeItem(LocalStorageKeys.TOKEN);
      localStorage.removeItem(LocalStorageKeys.ACTIVE_CART);
      apiRootForRequest = await getCorrectApiRoot();
      return null;
    }
    if (e instanceof Error && e.message === 'Failed to fetch') {
      throw new Error('Server error');
    }
    localStorage.removeItem(LocalStorageKeys.ACTIVE_CART);
    return null;
  }
}
