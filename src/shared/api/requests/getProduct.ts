import { Product } from '@commercetools/platform-sdk';
import { apiRoot } from '../BuildClient';

export async function getProductByKey(productKey: string): Promise<Product> {
  const data = await apiRoot
    .products()
    .withKey({ key: productKey })
    .get()
    .execute();
  return data.body;
}
