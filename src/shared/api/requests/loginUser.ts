import {
  ByProjectKeyRequestBuilder,
  MyCustomerSignin,
} from '@commercetools/platform-sdk';
import { apiRoot, constructClientPasswordFlow } from '../BuildClient';
import { tokenInstance } from '../tokenHandlers';
import { ValidationMessages } from '@/shared/const/Validation';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { setLocalStorageValue } from '@/shared/util/LocalStorageHandler';
import { changeApiRootToPassword, getActiveCart } from './updateCart';

const MERGE_ANONYMOUS_CART_WITH_USER_CART = 'MergeWithExistingCustomerCart';

export async function loginUser(
  email: string,
  password: string,
): Promise<ByProjectKeyRequestBuilder | undefined> {
  try {
    tokenInstance.set({
      token: '',
      expirationTime: 0,
      refreshToken: '',
    });
    const apirootPasswordFlow = constructClientPasswordFlow(email, password);

    const body: MyCustomerSignin = {
      email,
      password,
      activeCartSignInMode: MERGE_ANONYMOUS_CART_WITH_USER_CART,
      updateProductData: true,
    };

    const response = await apirootPasswordFlow
      .me()
      .login()
      .post({ body })
      .execute();
    localStorage.setItem(LocalStorageKeys.TOKEN, tokenInstance.get().token);
    localStorage.setItem(
      LocalStorageKeys.REFRESH_TOKEN,
      tokenInstance.get().refreshToken || '',
    );
    localStorage.setItem(
      LocalStorageKeys.USER,
      JSON.stringify(response.body.customer),
    );
    setLocalStorageValue(response.body.customer.version);
    changeApiRootToPassword();

    await getActiveCart(true);

    return apirootPasswordFlow;
  } catch {
    const checkEmailExistResponse = await apiRoot
      .customers()
      .get({ queryArgs: { where: `email="${email}"` } })
      .execute();
    if (checkEmailExistResponse.body.count === 0) {
      throw new Error(ValidationMessages.email.notExist);
    } else if (checkEmailExistResponse.body.count === 1) {
      throw new Error(ValidationMessages.password.wrongPassword);
    }
  }
  return undefined;
}
