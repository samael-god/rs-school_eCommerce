import classNames from 'classnames';
import { ReactNode } from 'react';

import { Icon } from '../Icon/Icon';

import cls from './Card.module.scss';

interface CardProps {
  className?: string;
  children?: ReactNode;
  image?: string;
  svg?: React.VFC<React.SVGProps<SVGSVGElement>>;
  width?: number;
  green?: boolean;
  transparent?: boolean;
  direction?: 'column' | 'row';
  clickable?: boolean;
  text?: string;
  alt?: string;
}

export const Card = ({
  className,
  text,
  image,
  svg,
  green,
  width,
  direction = 'column',
  clickable = false,
  alt,
  children,
  transparent = false,
}: CardProps) => {
  return (
    <div
      className={classNames(
        cls.Card,
        {
          [cls.transparent]: transparent,
          [cls.hovered]: clickable,
          [cls.column]: direction === 'column',
        },
        className,
      )}
      style={{ maxWidth: width }}
    >
      {image && <img src={image} className={cls.image} alt={alt} />}
      {svg && <Icon Svg={svg} />}
      {text && (
        <p
          className={classNames(cls.text, {
            [cls.green]: green,
          })}
        >
          {text}
        </p>
      )}
      {children}
    </div>
  );
};
