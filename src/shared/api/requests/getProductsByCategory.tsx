import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from '../BuildClient';

export async function getProductsByCategory(
  categoryId: string,
): Promise<ProductProjection[]> {
  const data = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: [`categories.id:"${categoryId}"`],
      },
    })
    .execute();
  return data.body.results;
}
