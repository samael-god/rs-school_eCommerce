import { Category } from '@commercetools/platform-sdk';
import { apiRoot } from '../BuildClient';

export async function getCategoryById(id: string): Promise<Category[]> {
  const category = await apiRoot
    .categories()
    .get({
      queryArgs: {
        where: `id="${id}"`,
      },
    })
    .execute();

  return category.body.results;
}
