import classNames from 'classnames';

import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import Star from '@/shared/assets/images/star.svg';

import cls from './ProductCard.module.scss';

interface ProductCardProps {
  className?: string;
  onClick: () => void;
  image: string;
  name: string;
  price?: string;
  sale?: string;
  stars: number;
  reviews: number;
}

export const ProductCard = (props: ProductCardProps) => {
  const { className, name, price, sale, stars, reviews, image, onClick } =
    props;

  return (
    <button
      type="button"
      className={classNames(cls.ProductCard, className)}
      onClick={onClick}
    >
      <Card className={cls.card} image={image} />
      <div className={cls.info}>
        <p>{name}</p>
        <div className={cls.wrap}>
          {sale && <span className={cls.sale}>{sale}</span>}
          <span className={classNames(cls.price, { [cls.salePrice]: sale })}>
            {price}
          </span>
        </div>
        <div className={cls.wrap}>
          <div className={cls.stars_wrap}>
            {Array.from({ length: stars }, (_, i) => (
              <Icon key={i} Svg={Star} className={cls.star} />
            ))}
          </div>
          <span className={cls.reviews}>{`(${reviews})`}</span>
        </div>
      </div>
    </button>
  );
};
