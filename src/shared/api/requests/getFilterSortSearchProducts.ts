import {
  ProductProjection,
  TermFacetResult,
} from '@commercetools/platform-sdk';
import { apiRoot } from '../BuildClient';
import { FilterSortSearchParameters } from '../types/apiTypes';

export interface ProductsResult {
  products: ProductProjection[];
  brands: string[];
}

export async function getFilterSortSearchProducts(
  parameters: FilterSortSearchParameters,
): Promise<ProductsResult> {
  const {
    categoryType: { attributesToFilter, selectedCategoryId },
    selectedFiltersList,
    minPrice,
    maxPrice,
    attributesToSort,
    search,
    currentOffSet,
    itemPerPage,
  } = parameters;
  const queryArgs: {
    filter: string | string[] | undefined;
    sort?: string;
    offset: number;
    limit: number;
    ['text.en-GB']?: string;
    fuzzy?: boolean;
    facet?: string[];
  } = {
    filter: [],
    facet: [],
    offset: currentOffSet,
    limit: itemPerPage,
  };

  const formattedBrands = selectedFiltersList
    .map((brand) => `"${brand}"`)
    .join(',');
  if (Array.isArray(queryArgs.filter)) {
    if (selectedCategoryId) {
      queryArgs.filter.push(`categories.id:"${selectedCategoryId}"`);
    }
    if (attributesToFilter.name && selectedFiltersList.length) {
      queryArgs.filter.push(
        `variants.attributes.${attributesToFilter.name}:${formattedBrands}`,
      );
    }
    if (attributesToFilter.name && !selectedFiltersList.length) {
      queryArgs.filter.push(
        `variants.attributes.${attributesToFilter.name}:exists`,
      );
    }
    if (minPrice || maxPrice) {
      queryArgs.filter.push(
        `variants.price.centAmount:range (${
          minPrice ? minPrice * 100 : '*'
        } to ${maxPrice ? maxPrice * 100 : '*'})`,
      );
    }
  }

  if (attributesToSort && attributesToSort.field !== 'default') {
    const { field, order } = attributesToSort;
    queryArgs.sort = `${field} ${order}`;
  }

  if (queryArgs && search) {
    queryArgs['text.en-GB'] = search;
    queryArgs.fuzzy = true;
  }

  queryArgs.facet?.push(`variants.attributes.brand`);

  const result = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs,
    })
    .execute();

  return {
    products: result.body.results,
    brands: [
      ...(
        result.body.facets['variants.attributes.brand'] as TermFacetResult
      ).terms.map((item) => item.term),
    ],
  };
}
