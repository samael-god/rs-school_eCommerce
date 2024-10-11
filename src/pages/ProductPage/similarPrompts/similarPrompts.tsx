import { ProductProjection } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { useNavigate } from 'react-router';

import { getProductPath } from '@/pages/CatalogPage/model/services/getProductPath';
import noImage from '@/shared/assets/images/No-Image.webp';
import { useAppDispatch } from '@/shared/hooks/redux';
import { ProductCard } from '@/shared/ui/ProductCard/ProductCard';
import { MathRandom } from '@/shared/util/MathRandom';
import { ConverterPrice } from '@/shared/util/converterPrice';
import { SliderForSimilar } from './SliderForSimilar';
import cls from './similarProducts.module.scss';

interface SimilarPromptsProps {
  className?: string;
  products: ProductProjection[];
}

export const SimilarPrompts = ({
  className,
  products,
}: SimilarPromptsProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onHandleClick =
    (productId: string, categoryId: string, itemName: string) => async () => {
      try {
        const response = await dispatch(
          getProductPath({ productId, categoryId }),
        ).unwrap();
        const { category, subCategory } = response;
        const path = `/catalog/${category}/${subCategory}/${itemName}`;
        navigate(path);
      } catch (error) {
        console.error('Failed to get product path:', error);
      }
    };

  return (
    <section className={classNames(cls.SimilarPrompts, className)}>
      <div className={cls.similarTitle}>Similar Prompts</div>
      <SliderForSimilar>
        {products.map((item) => {
          const { masterVariant } = item;
          const { images, prices = [] } = masterVariant;
          const { value: regularPrice } = prices[0];
          const salePrice = prices[0].discounted?.value;
          return (
            <ProductCard
              onClick={onHandleClick(
                item.productType.id,
                item.categories?.[0].id,
                item.key || '',
              )}
              key={item.key}
              image={images?.[0].url || noImage}
              name={item.name['en-GB']}
              price={ConverterPrice(regularPrice.centAmount)}
              sale={salePrice && ConverterPrice(salePrice.centAmount)}
              stars={MathRandom(3, 5)}
              reviews={MathRandom(1, 100)}
            />
          );
        })}
      </SliderForSimilar>
    </section>
  );
};
