import { useNavigate } from 'react-router';
import { ProductProjection } from '@commercetools/platform-sdk';
import classNames from 'classnames';

import SalesLeaf from '@/shared/assets/images/sales-leaf.svg';
import { Title } from '@/shared/ui/Title/Title';
import { Icon } from '@/shared/ui/Icon/Icon';
import { ProductCard } from '@/shared/ui/ProductCard/ProductCard';
import { MathRandom } from '@/shared/util/MathRandom';
import { SliderComponent } from './Slider';
import { ConverterPrice } from '@/shared/util/converterPrice';
import { SectionSeparator } from '@/shared/ui/SectionSeparator/SectionSeparator';
import { getProductPath } from '../../model/services/getProductPath';
import { useAppDispatch } from '@/shared/hooks/redux';

import cls from './SalesBlock.module.scss';

interface SalesBlockProps {
  className?: string;
  discountProducts: ProductProjection[];
}

export const SalesBlock = ({
  className,
  discountProducts,
}: SalesBlockProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onHandleClick =
    (productId: string, categoryId: string, itemName: string) => async () => {
      const { category, subCategory } = await dispatch(
        getProductPath({ productId, categoryId }),
      ).unwrap();
      navigate(`${category}/${subCategory}/${itemName}`);
    };

  return (
    <section className={classNames(cls.SalesBlock, className)}>
      <Icon Svg={SalesLeaf} className={cls.leaf} />
      <Title subtitle="Today's" title="Flash Sale" className={cls.title} />
      <SliderComponent>
        {discountProducts.map((item) => {
          const { id, name, masterVariant } = item;
          const { images, prices = [] } = masterVariant;

          if (prices[0].discounted) {
            const { value: regularPrice } = prices[0];
            const { value: salePrice } = prices[0].discounted;
            return (
              <ProductCard
                onClick={onHandleClick(
                  item.productType.id,
                  item.categories?.[0].id,
                  item.key || '',
                )}
                key={id}
                image={images?.[0].url || ''}
                name={name['en-GB']}
                price={ConverterPrice(regularPrice.centAmount)}
                sale={ConverterPrice(salePrice.centAmount)}
                stars={MathRandom(3, 5)}
                reviews={MathRandom(1, 100)}
              />
            );
          }
          return null;
        })}
      </SliderComponent>
      <SectionSeparator />
    </section>
  );
};
