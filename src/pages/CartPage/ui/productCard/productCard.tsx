import { LineItem } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { FaRegTrashCan } from 'react-icons/fa6';

import {
  cartThunk,
  getCartIsLoading,
  getCartLoadingProductsIds,
} from '@/entities/Cart';
import Minus from '@/shared/assets/images/minus.svg';
import Plus from '@/shared/assets/images/plus.svg';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { ConverterPrice } from '@/shared/util/converterPrice';
import loader from '@/shared/assets/images/loader.gif';

import cls from './productCard.module.scss';
import { getQuantity } from '@/entities/Cart/model/selectors/cartSelectors';

interface ProductCardProps {
  className?: string;
  product: LineItem;
}

export const ProductCard = ({ className, product }: ProductCardProps) => {
  const {
    name: { 'en-GB': productName },
    variant: { images },
    price: {
      value: { centAmount },
      discounted,
    },
    totalPrice,
    id,
  } = product;
  const isLoading = useAppSelector(getCartIsLoading);
  const selectedProductId = useAppSelector(getCartLoadingProductsIds);
  const imageUrl =
    images && images.length > 0 ? images[0].url : 'default-image-url';
  const price = ConverterPrice(centAmount);
  const discountedPrice = discounted
    ? ConverterPrice(discounted.value.centAmount)
    : null;

  const dispatch = useAppDispatch();
  const quantity = useAppSelector((state) => getQuantity(state, id));
  const handleIncrease = () => {
    dispatch(cartThunk({ cardId: id, quantity: quantity + 1, mode: 'update' }));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(
        cartThunk({ cardId: id, quantity: quantity - 1, mode: 'update' }),
      );
    } else {
      dispatch(cartThunk({ cardId: id, mode: 'removeProduct' }));
    }
  };

  const handleRemove = () => {
    dispatch(cartThunk({ cardId: id, mode: 'removeProduct' }));
  };

  return (
    <div className={classNames(cls.ProductCard, {}, [className])}>
      <div className={cls.imageAndNameWrapper}>
        <img src={imageUrl} alt={productName} className={cls.productImage} />
        <div className={cls.nameAndPriceWrapper}>
          <h3 className={cls.productName}>{productName}</h3>
          <div className={cls.productPrice}>
            {discountedPrice ? (
              <>
                <span className={cls.originalPrice}>{price}</span>
                <span className={cls.discountPrice}>{discountedPrice}</span>
              </>
            ) : (
              <span className={cls.price}>{price}</span>
            )}
          </div>
        </div>
      </div>
      <div className={cls.productDetails}>
        <div className={cls.productQuantity}>
          <button
            type="button"
            onClick={handleDecrease}
            className={cls.quantityButton}
            aria-label="close"
          >
            <Minus />
          </button>
          <input
            type="number"
            value={quantity}
            readOnly
            className={cls.quantityInput}
          />
          <button
            type="button"
            onClick={handleIncrease}
            className={cls.quantityButton}
            aria-label="close"
          >
            <Plus />
          </button>
        </div>
        <div className={cls.totalPriceWrapper}>
          total:
          {isLoading && selectedProductId.includes(id) ? (
            <img src={loader} alt="loader" className={cls.loader} />
          ) : (
            <div className={cls.totalPrice}>
              {ConverterPrice(totalPrice.centAmount)}
            </div>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={handleRemove}
        className={cls.removeButton}
        aria-label="close"
      >
        <FaRegTrashCan />
      </button>
    </div>
  );
};
