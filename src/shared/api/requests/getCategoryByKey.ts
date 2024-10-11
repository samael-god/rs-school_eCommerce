import { apiRoot } from '../BuildClient';

export async function getCategoryByKey(key: string): Promise<string> {
  const category = await apiRoot.categories().withKey({ key }).get().execute();

  return category.body.id;
}
