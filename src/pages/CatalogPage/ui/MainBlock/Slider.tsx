import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ReactNode } from 'react';

import cls from './MainBlock.module.scss';

export const SliderComponent = ({ children }: { children: ReactNode }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'linear',
  };

  return (
    <Slider {...settings} className={cls.mainBlock_slider}>
      {children}
    </Slider>
  );
};
