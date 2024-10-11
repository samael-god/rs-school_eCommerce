import classNames from 'classnames';
import { Icon } from '../Icon/Icon';
import Leaf from '@/shared/assets/images/leaf.svg';

import cls from './loadingAnimation.module.scss';

interface LoadingAnimationProps {
  fullScreen?: boolean;
}

export const LoadingAnimation = ({ fullScreen }: LoadingAnimationProps) => {
  return (
    <div
      className={classNames(cls.wrapperAnimation, {
        [cls.fullScreen]: fullScreen,
      })}
    >
      <Icon Svg={Leaf} className={cls.leaf} />
      <Icon Svg={Leaf} className={cls.leaf} />
      <Icon Svg={Leaf} className={cls.leaf} />
      <Icon Svg={Leaf} className={cls.leaf} />
    </div>
  );
};
