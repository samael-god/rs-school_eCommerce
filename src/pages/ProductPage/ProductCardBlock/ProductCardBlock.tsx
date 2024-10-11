import { Product } from '@commercetools/platform-sdk';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Button as BootstrapButton, Modal } from 'react-bootstrap';
import { FaRegTrashCan } from 'react-icons/fa6';
import { PiShoppingCartBold } from 'react-icons/pi';

import { cartThunk, getCartProducts } from '@/entities/Cart';
import { ProductSlider } from '@/pages/ProductPage/ProductSlider/productSlider';
import noImage from '@/shared/assets/images/No-Image.webp';
import NextButton from '@/shared/assets/images/next-slide.svg';
import plantFromProductPage from '@/shared/assets/images/plantFromProductPage.png';
import PrevButton from '@/shared/assets/images/prev-slide.svg';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { Button } from '@/shared/ui/button/button';
import { ConverterPrice } from '@/shared/util/converterPrice';
import cls from './ProductCardBlock.module.scss';

interface ProductCardBlockProps {
  product: Product;
}

export const ProductCardBlock = ({ product }: ProductCardBlockProps) => {
  const [show, setShow] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const productsInCart = useAppSelector(getCartProducts);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {
    masterData: {
      current: {
        masterVariant: { images = [], prices = [] },
        name,
        description,
      },
    },
    id,
  } = product;
  const imagesArr =
    images.length === 0
      ? [
          {
            url: noImage,
            dimensions: {
              w: 1665,
              h: 2048,
            },
          },
        ]
      : images;

  const price = prices.length ? ConverterPrice(prices[0].value.centAmount) : '';
  const discountedPrice = prices[0]?.discounted?.value.centAmount
    ? ConverterPrice(prices[0].discounted.value.centAmount)
    : '';
  const productName = name['en-GB'];
  const productDescription = description?.['en-GB'];
  const handleShow = (index: number) => {
    setCurrentImageIndex(index);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const dispatch = useAppDispatch();
  const onAddToCart = (quantity: number) => () => {
    dispatch(cartThunk({ cardId: id, quantity, mode: 'new' }));
  };

  const onRemoveProduct = () => {
    dispatch(cartThunk({ cardId: id, mode: 'removeProduct' })).then(() =>
      setIsInCart(false),
    );
  };

  useEffect(() => {
    setIsInCart(
      productsInCart.some(
        (cartProduct) => cartProduct.productId === product.id,
      ),
    );
  }, [productsInCart, product.id]);

  return (
    <div className={cls.productCard}>
      <img src={plantFromProductPage} alt="" className={cls.plantImage} />
      {imagesArr.length === 1 ? (
        <button
          type="button"
          onClick={() => handleShow(0)}
          className={cls.imageWrapperButton}
          aria-label="close"
        >
          <img
            src={images?.[0]?.url || ''}
            className={cls.imageCard}
            alt="product"
          />
        </button>
      ) : (
        <ProductSlider images={imagesArr} onClick={() => handleShow(0)} />
      )}
      <div className={cls.productData}>
        <h1 className={cls.productName}>{productName}</h1>
        <p className={cls.productDescription}>{productDescription}</p>
        <div className={cls.priceWrapper}>
          <span
            className={classNames(cls.price, {
              [cls.crossed]: discountedPrice,
            })}
          >
            {price}
          </span>
          <span
            className={classNames(
              {
                [cls.price]: discountedPrice,
              },
              cls.discountedPrice,
            )}
          >
            {discountedPrice}
          </span>
        </div>
        <div className={cls.buttonsWrapper}>
          <Button
            text={isInCart ? 'Item in cart' : 'Add to cart'}
            green
            className={cls.buyButtons}
            onClick={onAddToCart(1)}
            disabled={isInCart}
            icon={<PiShoppingCartBold />}
          />
          <Button
            text="Remove"
            transparent
            className={isInCart ? cls.buyButtons : cls.none}
            onClick={onRemoveProduct}
            disabled={!isInCart}
            icon={<FaRegTrashCan />}
          />
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        animation
        contentClassName={cls.modal}
        dialogClassName={cls.modalWrap}
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Image</Modal.Title>
          {images.length > 1 && (
            <BootstrapButton
              onClick={handlePrevImage}
              className={cls.modalButtonPrev}
            >
              <PrevButton />
            </BootstrapButton>
          )}
          {images.length > 1 && (
            <BootstrapButton
              onClick={handleNextImage}
              className={cls.modalButtonNext}
            >
              <NextButton />
            </BootstrapButton>
          )}
        </Modal.Header>
        <Modal.Body>
          <div className={cls.modalImageContainer}>
            <img
              src={imagesArr[currentImageIndex].url}
              alt="Product"
              className={cls.modalImage}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
