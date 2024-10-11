import { ApiRoot, Cart } from '@commercetools/platform-sdk';

import {
  CatalogSortObject,
  ItemsCategoryName,
  ParentCategoryName,
} from '@/pages/CatalogPage';

export interface UserLogin {
  token: string;
  isLogin: boolean;
}

export type ApiRootContextProps = {
  flowApiRoot: ApiRoot | undefined;
  setFlowApiRoot?: React.Dispatch<React.SetStateAction<ApiRoot | undefined>>;
};

export interface ParentCategory {
  name: ParentCategoryName;
  path: string;
  id: string;
}

export interface ItemsCategory {
  name: ItemsCategoryName;
  path: string;
  id: string;
}

export type CategoryCustom = {
  parent: ParentCategory;
  items: ItemsCategory[];
};

export type FilterSortSearchParameters = {
  selectedFiltersList: string[];
  categoryType: {
    selectedCategoryId: string;
    attributesToFilter: { name: string | undefined };
  };
  minPrice: number;
  maxPrice: number;
  attributesToSort?: CatalogSortObject;
  search?: string;
  currentOffSet: number;
  itemPerPage: number;
};

export type UpdateCartMode =
  | 'new'
  | 'update'
  | 'remove'
  | 'removeProduct'
  | 'addDiscountCode'
  | 'removeDiscountCode';

export type UpdateCartParams = {
  cartData?: Partial<Cart> | null;
  mode?: UpdateCartMode;
  cardId?: string;
  quantity?: number;
  firstFunctionCall?: boolean;
  id?: string;
  code?: string;
  promoCodeId?: string;
};
