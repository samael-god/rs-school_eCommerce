import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Routes } from '@/app/providers/RouterConfig/RouteConfig';
import {
  cartActions,
  cartThunk,
  getCartDiscountOnTotalPrice,
  getCartError,
  getCartProducts,
  getCartTotalPrice,
} from '@/entities/Cart';

import emptyCart from '@/shared/assets/images/cart.png';
import plant_1 from '@/shared/assets/images/plant_for_cart_1.png';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { getLocalStorageValue } from '@/shared/util/LocalStorageHandler';
import { ConverterPrice } from '@/shared/util/converterPrice';
import { Footer } from '@/widgets/Footer/Footer';
import { Header } from '@/widgets/Header/Header';
import { ProductCard } from './productCard/productCard';
import Modal from '@/shared/ui/modal/modal';
import { Button } from '@/shared/ui/button/button';
import { AppError } from '@/shared/ui/AppError/AppError';
import { Input } from '@/shared/ui/input/input';

import cls from './CartPage.module.scss';

interface CartPageProps {
  className?: string;
}

export const CartPage = ({ className }: CartPageProps) => {
  const productsInCart = useAppSelector(getCartProducts);
  const totalPrice = useAppSelector(getCartTotalPrice);
  const discountPrice = useAppSelector(getCartDiscountOnTotalPrice);
  const isDiscountPromoCode = Object.keys(discountPrice).length === 0;
  const error = useAppSelector(getCartError);
  const dispatch = useAppDispatch();

  const [promoCode, setPromoCode] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const originalPrice =
    Object.keys(discountPrice).length > 0 && discountPrice
      ? ConverterPrice(
          totalPrice.centAmount + discountPrice.discountedAmount.centAmount,
        )
      : '';

  const { length: cartLength } = productsInCart;

  const onClearCart = () => {
    dispatch(cartThunk({ mode: 'remove' }));
    setIsModalOpen(false);
  };

  const onChangePromoCode = (value: string) => {
    setPromoCode(value);
    dispatch(cartActions.clearError());
  };

  useEffect(() => {
    const activeCart = getLocalStorageValue(
      LocalStorageKeys.ACTIVE_CART,
    ).lineItems;
    dispatch(cartActions.setCart(activeCart || []));
  }, [dispatch]);

  const handleApplyPromoCode = () => {
    dispatch(cartThunk({ mode: 'addDiscountCode', code: promoCode }));
    if (!error) {
      setPromoCode('');
    }
  };

  const handleResetPromoCode = () => {
    setPromoCode('');
    dispatch(cartThunk({ mode: 'removeDiscountCode' }));
  };

  return (
    <div className={classNames(cls.wrapper, {}, [className])}>
      <Header />
      <main className={cls.main}>
        {cartLength === 0 ? (
          <div className={cls.emptyCartWrapper}>
            <img
              src={emptyCart}
              alt="Empty cart"
              className={cls.emptyCartImage}
            />
            <p className={cls.emptyCartText}>
              Shopping cart is empty.
              <br />
              You can choose goods in the{' '}
              <NavLink to={Routes.CATALOG} className={cls.catalogLink}>
                catalog
              </NavLink>
              .
            </p>
          </div>
        ) : (
          <>
            <img src={plant_1} alt="" className={cls.plantImageTop} />
            <div className={cls.productsWrapper}>
              <button
                type="button"
                className={cls.clearButton}
                onClick={() => setIsModalOpen(true)}
              >
                Clear cart
              </button>
              {productsInCart.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className={cls.invoiceWrapper}>
              <h3 className={cls.invoiceTitle}>Invoice</h3>
              <div className={cls.priceWrapper}>
                {Object.keys(discountPrice).length > 0 && discountPrice ? (
                  <>
                    <div className={cls.priceFlex}>
                      <span className={cls.discount}>Price:</span>
                      <span className={cls.originalPrice}>{originalPrice}</span>
                    </div>
                    <div className={cls.priceFlex}>
                      <span className={cls.discount}>Discount:</span>
                      <span className={cls.discount}>
                        {ConverterPrice(
                          discountPrice.discountedAmount.centAmount,
                        )}
                      </span>
                    </div>
                  </>
                ) : (
                  ''
                )}
                <div className={cls.priceFlex}>
                  <span className={cls.price}>Total:</span>
                  <span className={cls.price}>
                    {Object.keys(totalPrice).length > 0 && totalPrice
                      ? ConverterPrice(totalPrice.centAmount)
                      : ''}
                  </span>
                </div>
              </div>
              <div className={cls.promoCodeView}>
                <Input
                  type="text"
                  value={promoCode}
                  onChange={onChangePromoCode}
                  placeholder="Enter promo code"
                  className={cls.promoCodeInput}
                  classNameLabel={cls.label}
                />
                <button
                  type="button"
                  onClick={handleApplyPromoCode}
                  className={cls.applyPromoCodeButton}
                  disabled={promoCode === ''}
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={handleResetPromoCode}
                  className={cls.applyPromoCodeButton}
                  disabled={isDiscountPromoCode}
                >
                  Reset
                </button>
                <AppError text={error} className={cls.error} />
              </div>
            </div>
          </>
        )}
      </main>
      <Modal className={classNames(cls.Modal, { [cls.active]: isModalOpen })}>
        <span>Are you sure you want to Clear Cart?</span>
        <div className={cls.buttonsWrap}>
          <Button text="Clear" small onClick={onClearCart} />
          <Button
            text="Cancel"
            small
            onClick={() => setIsModalOpen(false)}
            cancel
          />
        </div>
      </Modal>
      <Footer />
    </div>
  );
};
