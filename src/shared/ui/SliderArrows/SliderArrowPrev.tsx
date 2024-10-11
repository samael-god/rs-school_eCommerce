import classNames from 'classnames';

import { ArrowProps } from './SliderArrowNext';
import PrevArrow from '@/shared/assets/images/prev-slide.svg';
import { Icon } from '../Icon/Icon';

import cls from './SliderArrows.module.scss';

export const SliderArrowPrev = ({
  onClick,
  className,
  position,
}: ArrowProps) => {
  return (
    <button
      type="button"
      aria-label="Prev"
      className={classNames(
        cls.arrowPrev,
        { [cls.positionPrev]: position },
        className,
      )}
      onClick={onClick}
    >
      <Icon Svg={PrevArrow} />
    </button>
  );
};
