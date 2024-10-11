import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from '../BuildClient';

export async function getDiscountProducts(): Promise<ProductProjection[]> {
  const result = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: 'variants.prices.discounted:exists',
      },
    })
    .execute();
  return result.body.results;
}
