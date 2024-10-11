import { CatalogSortObject } from '@/pages/CatalogPage';

export const SortingParams = [
  'Default',
  'By price ↑',
  'By price ↓',
  'By name (A-Z)',
  'By name (Z-A)',
];

export enum SortingConsts {
  DEFAULT = 'Default',
  BY_PRICE_ASC = 'By price ↑',
  BY_PRICE_DESC = 'By price ↓',
  BY_NAME_ASC = 'By name (A-Z)',
  BY_AME_DESC = 'By name (Z-A)',
}

export const SortMapper: {
  [key in SortingConsts]: CatalogSortObject;
} = {
  [SortingConsts.BY_PRICE_ASC]: {
    field: 'price',
    order: 'asc',
  },
  [SortingConsts.BY_PRICE_DESC]: {
    field: 'price',
    order: 'desc',
  },
  [SortingConsts.BY_NAME_ASC]: {
    field: 'name.en-GB',
    order: 'asc',
  },
  [SortingConsts.BY_AME_DESC]: {
    field: 'name.en-GB',
    order: 'desc',
  },
  [SortingConsts.DEFAULT]: {
    field: 'default',
    order: '',
  },
};
