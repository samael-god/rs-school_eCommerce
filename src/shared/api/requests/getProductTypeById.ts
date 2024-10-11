import { ProductType } from '@commercetools/platform-sdk';
import { apiRoot } from '../BuildClient';

export async function getProductTypeById(id: string): Promise<ProductType[]> {
  const category = await apiRoot
    .productTypes()
    .get({
      queryArgs: {
        where: `id="${id}"`,
      },
    })
    .execute();
  return category.body.results;
}
