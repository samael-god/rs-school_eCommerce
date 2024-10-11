import { useCallback } from 'react';

import { catalogActions } from '../model/slice/catalogSlice';
import {
  getCatalogPageSelectedBrands,
  getCatalogPageMaxPrice,
  getCatalogPageMinPrice,
  getCatalogPageSearch,
  getCatalogPageSelectedCategory,
  getCatalogPageBrands,
} from '../model/selectors/catalogPageSelectors';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { SortingConsts } from '@/shared/const/SortingParams';
import { fetchProducts } from '../model/services/fetchProducts';

export const useCatalogFilters = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(getCatalogPageSearch);
  const brands = useAppSelector(getCatalogPageBrands);
  const selectedBrands = useAppSelector(getCatalogPageSelectedBrands);
  const selectedCategory = useAppSelector(getCatalogPageSelectedCategory);
  const maxPrice = useAppSelector(getCatalogPageMaxPrice);
  const minPrice = useAppSelector(getCatalogPageMinPrice);

  const fetchData = useCallback(() => {
    dispatch(fetchProducts({ scrolling: false }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeSearch = useCallback(
    (searchString: string) => {
      dispatch(catalogActions.setPage(0));
      dispatch(catalogActions.setSearch(searchString));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeOrder = useCallback(
    (value: SortingConsts) => {
      dispatch(catalogActions.setPage(0));
      dispatch(catalogActions.setOrder(value));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeMaxPrice = useCallback(
    (newPrice: string) => {
      dispatch(catalogActions.setPage(0));
      dispatch(catalogActions.changeMaxPrice(newPrice));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeMinPrice = useCallback(
    (newPrice: string) => {
      dispatch(catalogActions.setPage(0));
      dispatch(catalogActions.changeMinPrice(newPrice));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onAddBrands = useCallback(
    (value: string) => {
      dispatch(catalogActions.setPage(0));
      dispatch(catalogActions.setSelectedBrands(value));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onRemoveSelectedBrands = useCallback(
    (value: string) => {
      dispatch(catalogActions.setPage(0));
      dispatch(catalogActions.removeSelectedBrands(value));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onRemoveAllFilters = useCallback(() => {
    dispatch(catalogActions.setPage(0));
    dispatch(catalogActions.removeAllFilters());
    fetchData();
  }, [dispatch, fetchData]);

  const onRemoveSelectedPrice = useCallback(() => {
    dispatch(catalogActions.setPage(0));
    dispatch(catalogActions.removeSelectedPrice());
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeSelectedCategory = useCallback(
    (id: string) => {
      dispatch(catalogActions.setPage(0));
      dispatch(catalogActions.setSelectedCategoryId(id));
      fetchData();
    },
    [dispatch, fetchData],
  );

  return {
    search,
    selectedBrands,
    maxPrice,
    minPrice,
    selectedCategory,
    brands,
    onChangeOrder,
    onChangeSearch,
    onAddBrands,
    onRemoveSelectedBrands,
    onRemoveAllFilters,
    onChangeMaxPrice,
    onChangeMinPrice,
    onChangeSelectedCategory,
    onRemoveSelectedPrice,
  };
};
