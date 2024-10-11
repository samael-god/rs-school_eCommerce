import classNames from 'classnames';

import { Icon } from '../Icon/Icon';
import NextArrow from '@/shared/assets/images/next-slide.svg';

import cls from './SliderArrows.module.scss';

export interface ArrowProps {
  onClick?: () => void;
  className?: string;
  position?: boolean;
}

export const SliderArrowNext = ({
  onClick,
  className,
  position,
}: ArrowProps) => {
  return (
    <button
      type="button"
      aria-label="Next"
      className={classNames(
        cls.arrowNext,
        { [cls.positionNext]: position },
        className,
      )}
      onClick={onClick}
    >
      <Icon Svg={NextArrow} />
    </button>
  );
};
