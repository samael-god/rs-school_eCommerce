import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from '../BuildClient';

export interface AllProductsProps {
  currentOffset: number;
  itemPerPage: number;
}

export async function getAllProducts({
  currentOffset,
  itemPerPage,
}: AllProductsProps): Promise<ProductProjection[]> {
  const result = await apiRoot
    .productProjections()
    .get({
      queryArgs: {
        offset: currentOffset,
        limit: itemPerPage,
      },
    })
    .execute();
  return result.body.results;
}
