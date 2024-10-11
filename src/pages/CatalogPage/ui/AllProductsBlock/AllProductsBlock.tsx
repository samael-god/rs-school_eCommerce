import { ProductProjection } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { useNavigate } from 'react-router';
import { forwardRef, useCallback } from 'react';
import { BsCart2 } from 'react-icons/bs';
import InfiniteScroll from 'react-infinite-scroll-component';

import { ConverterPrice } from '@/shared/util/converterPrice';
import { Button } from '@/shared/ui/button/button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { getProductPath } from '../../model/services/getProductPath';
import { getCatalogPageHasMore } from '../../model/selectors/catalogPageSelectors';
import loader from '@/shared/assets/images/loader.gif';
import {
  cartThunk,
  getCartIsLoading,
  getCartLoadingProductsIds,
  getCartProducts,
} from '@/entities/Cart';
import { fetchNextPart } from '../../model/services/fetchNextPart';

import cls from './AllProductsBlock.module.scss';

interface AllProductsBlockProps {
  className?: string;
  products: ProductProjection[];
}

export const AllProductsBlock = forwardRef<
  HTMLDivElement,
  AllProductsBlockProps
>(({ className, products }, ref) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoadingCard = useAppSelector(getCartIsLoading);
  const loadingProductsIds = useAppSelector(getCartLoadingProductsIds);
  const productsInCart = useAppSelector(getCartProducts);
  const hasMore = useAppSelector(getCatalogPageHasMore);

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextPart());
  }, [dispatch]);

  const onOpenProduct =
    (productId: string, categoryId: string, itemName: string) => async () => {
      const { category, subCategory } = await dispatch(
        getProductPath({ productId, categoryId }),
      ).unwrap();
      navigate(`${category}/${subCategory}/${itemName}`);
    };

  const onAddToCart = (cardId: string, quantity: number) => () => {
    dispatch(cartThunk({ cardId, quantity, mode: 'new' }));
  };

  const setButtonView = (id: string) => {
    const isCurrentSelectedProduct = loadingProductsIds.includes(id);
    const isCurrentSelectedProductLoading =
      isLoadingCard && isCurrentSelectedProduct;

    if (isCurrentSelectedProductLoading) {
      return <img src={loader} alt="loader" className={cls.loader} />;
    }

    if (
      productsInCart &&
      productsInCart.find((item) => item.productId === id)
    ) {
      return <div className={cls.added}>Product added to cart!</div>;
    }

    return (
      <Button
        small
        className={cls.button}
        transparent
        text="Add to Cart"
        green
        onClick={onAddToCart(id, 1)}
        icon={<BsCart2 className={cls.cartIcon} />}
      />
    );
  };

  return (
    <section ref={ref} className={classNames(cls.AllProductsBlock, className)}>
      <InfiniteScroll
        dataLength={products.length}
        next={onLoadNextPart}
        hasMore={hasMore}
        loader=""
      >
        <div className={cls.products}>
          {products.length === 0 && (
            <div className={cls.no_products}>Products not found</div>
          )}
          {products.map((item) => {
            const {
              masterVariant,
              id,
              productType,
              categories,
              key,
              name,
              description,
            } = item;
            const { images, prices = [] } = masterVariant;
            const { value: regularPrice, discounted } = prices[0];

            return (
              <div key={id} className={cls.product}>
                <button
                  type="button"
                  className={cls.clickableCard}
                  onClick={onOpenProduct(
                    productType.id,
                    categories?.[0].id,
                    key || '',
                  )}
                >
                  <img
                    src={images?.[0]?.url || ''}
                    alt=""
                    className={cls.image}
                  />
                  <p className={cls.name}>{name['en-GB']}</p>
                  <div className={cls.price_wrapper}>
                    {discounted ? (
                      <div className={cls.prices}>
                        <p className={cls.price}>
                          {ConverterPrice(discounted?.value.centAmount)}
                        </p>
                        <p className={cls.discounted}>
                          {ConverterPrice(regularPrice?.centAmount)}
                        </p>
                      </div>
                    ) : (
                      <p className={cls.price}>
                        {ConverterPrice(regularPrice?.centAmount)}
                      </p>
                    )}
                    <p className={cls.reviews}>186 Reviews</p>
                  </div>
                  <p className={cls.description}>{description?.['en-GB']}</p>
                </button>
                {setButtonView(id)}
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </section>
  );
});
