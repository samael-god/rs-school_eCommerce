import { Category } from '@commercetools/platform-sdk';
import { apiRoot } from '../BuildClient';
import {
  CategoryCustom,
  ItemsCategory,
  ParentCategory,
} from '../types/apiTypes';

export async function getCategories(): Promise<CategoryCustom[]> {
  const categories = await apiRoot.categories().get().execute();
  const response: Category[] = categories.body.results;
  const mainCategories: Category[] = response.filter((el) => !el.parent);
  const subCategories: Category[] = response.filter((el) => el.parent);
  const result: CategoryCustom[] = [];
  return mainCategories.reduce((acc, mainCategory) => {
    const children = subCategories
      .filter((child) => child.parent?.id === mainCategory.id)
      .map((subCategory) => {
        return {
          name: subCategory.name['en-GB'],
          path: subCategory.key,
          id: subCategory.id,
        } as ItemsCategory;
      });
    acc.push({
      parent: {
        name: mainCategory.name['en-GB'],
        path: mainCategory.key,
        id: mainCategory.id,
      } as ParentCategory,

      items: children,
    });
    return acc;
  }, result);
}
