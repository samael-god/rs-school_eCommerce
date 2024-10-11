import { createRef, memo, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

import { Header } from '@/widgets/Header/Header';
import { MainBlock } from '../MainBlock/MainBlock';
import { SalesBlock } from '../SalesBlock/SalesBlock';
import { FiltersBlock } from '../FiltersBlock/FiltersBlock';
import { AllProductsBlock } from '../AllProductsBlock/AllProductsBlock';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { Footer } from '@/widgets/Footer/Footer';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';
import {
  getCatalogPageCategories,
  getCatalogPageDiscountProducts,
  getCatalogPageIsLoading,
  getCatalogPageProducts,
} from '../../model/selectors/catalogPageSelectors';
import { Breadcrumbs } from '@/features/Breadcrumbs/ui/Breadcrumbs';
import { getCategoriesByKey } from '../../model/services/getCategoriesByKey';
import { useCatalogFilters } from '../../hooks/useCatalogPageFilters';
import { getAdditionalInfo } from '../../model/services/getAdditionalInfo';
import { ToastConfig } from '@/shared/const/ToastConfig';
import { Routes } from '@/app/providers/RouterConfig/RouteConfig';

interface CatalogPageProps {
  className?: string;
}

export const CatalogPage = memo(({ className }: CatalogPageProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const ref = createRef<HTMLDivElement>();
  const isLoading = useAppSelector(getCatalogPageIsLoading);
  const products = useAppSelector(getCatalogPageProducts);
  const categories = useAppSelector(getCatalogPageCategories);
  const discountProducts = useAppSelector(getCatalogPageDiscountProducts);

  const { categoryId, subcategoryId } = useParams();
  const { onChangeSelectedCategory } = useCatalogFilters();

  const scrollIntoSection = useCallback(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ref]);

  const fetchCategory = useCallback(
    async (id: string) => {
      try {
        const result = await dispatch(getCategoriesByKey(id)).unwrap();
        if (result) {
          return result;
        }
      } catch (e) {
        navigate(Routes.ERROR);
        toast.error(
          'Failed to fetch product or invalid URL parameters',
          ToastConfig,
        );
        return '';
      }
      return '';
    },
    [dispatch, navigate],
  );

  useEffect(() => {
    const fetchAndSetCategory = async () => {
      let category = '';

      if (subcategoryId) {
        category = await fetchCategory(subcategoryId);
      }
      if (!category && categoryId) {
        category = await fetchCategory(categoryId);
      }
      if (category) {
        onChangeSelectedCategory(category);
      } else {
        onChangeSelectedCategory('');
      }
    };

    if (categories.length === 0 || discountProducts.length === 0) {
      dispatch(getAdditionalInfo());
    }

    fetchAndSetCategory();
  }, [
    categoryId,
    subcategoryId,
    onChangeSelectedCategory,
    fetchCategory,
    dispatch,
    categories,
    discountProducts,
  ]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <main>
      <div className="wrapper">
        <Header />
        <MainBlock
          categories={categories}
          scrollIntoSection={scrollIntoSection}
        />
        <SalesBlock discountProducts={discountProducts} />
        <FiltersBlock categories={categories} />
        <Breadcrumbs scrollIntoSection={scrollIntoSection} />
        <AllProductsBlock products={products} ref={ref} />
        <Footer />
      </div>
    </main>
  );
});
