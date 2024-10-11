/* eslint-disable no-restricted-globals */
import { Product, ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Breadcrumbs } from '@/features/Breadcrumbs/ui/Breadcrumbs';
import { getCategoryById } from '@/shared/api';
import { getProductByKey } from '@/shared/api/requests/getProduct';
import { getProductsByCategory } from '@/shared/api/requests/getProductsByCategory';
import { ToastTypes, userMessage } from '@/shared/const/ToastConfig';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';
import { Footer } from '@/widgets/Footer/Footer';
import { Header } from '@/widgets/Header/Header';
import { FAQ } from './BlockFAQ/FAQ';
import { ProductCardBlock } from './ProductCardBlock/ProductCardBlock';
import cls from './ProductPage.module.scss';
import { SimilarPrompts } from './similarPrompts/similarPrompts';

export const ProductPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { categoryId, subcategoryId, productKey } = useParams();
  if (!productKey || !categoryId || !subcategoryId) {
    throw new Error('Invalid URL parameters');
  }
  const [product, setProduct] = useState<Product>({} as Product);
  const [loading, setLoading] = useState<boolean>(true);
  const [similarProducts, setSimilarProducts] = useState<ProductProjection[]>(
    [],
  );
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductByKey(productKey);
        const { categories } = fetchedProduct.masterData.current;
        const fetchedSubCategoryId = categories[0].id;
        const fetchedCategoryId = categories[1].id;

        const productCategory =
          categoryId ===
            (await getCategoryById(fetchedCategoryId).then(
              (data) => data[0].key,
            )) &&
          subcategoryId ===
            (await getCategoryById(fetchedSubCategoryId).then(
              (data) => data[0].key,
            ));
        if (!productCategory) {
          throw new Error('Category or subcategory mismatch');
        }
        setProduct(fetchedProduct);
        setLoading(false);
      } catch (error) {
        navigate('404');
        userMessage(
          ToastTypes.ERROR,
          'Failed to fetch product or invalid URL parameters',
        );
      }
    };
    fetchProduct();
  }, [navigate, productKey, categoryId, subcategoryId]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (product.productType) {
        const fetchedProducts = await getProductsByCategory(
          product.masterData.current.categories[0].id,
        );
        setSimilarProducts(fetchedProducts);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [product]);

  return (
    <div className={cls.wrapper}>
      <Header />
      <button
        type="button"
        className={cls.buttonBack}
        onClick={() => history.back()}
      >
        &larr;
      </button>
      <Breadcrumbs />
      <main className={cls.main}>
        {loading ? (
          <LoadingAnimation />
        ) : (
          <>
            <ProductCardBlock product={product} />
            <SimilarPrompts products={similarProducts} />
            <FAQ />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};
