import { ReactNode } from 'react';
import Slider from 'react-slick';

import { SliderArrowNext } from '@/shared/ui/SliderArrows/SliderArrowNext';
import { SliderArrowPrev } from '@/shared/ui/SliderArrows/SliderArrowPrev';

export const SliderComponent = ({ children }: { children: ReactNode }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    nextArrow: <SliderArrowNext position />,
    prevArrow: <SliderArrowPrev position />,
    responsive: [
      {
        breakpoint: 1220,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return <Slider {...settings}>{children}</Slider>;
};
