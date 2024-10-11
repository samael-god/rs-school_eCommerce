import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import cls from './productSlider.module.scss';

interface Image {
  url: string;
}

interface ProductSliderProps {
  images: Image[];
  onClick?: () => void;
}

export const ProductSlider = ({ images, onClick }: ProductSliderProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  return (
    <div className={cls.sliderWrapper}>
      <Slider {...settings} className={cls.productSlider}>
        {images.map((image) => (
          <div key={image.url}>
            <button
              type="button"
              onClick={onClick}
              className={cls.imageWrapperButton}
              aria-label="close"
            >
              <img src={image.url} alt="product" className={cls.productImage} />
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};
