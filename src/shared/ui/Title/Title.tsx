import classNames from 'classnames';

import cls from './Title.module.scss';

interface TitleProps {
  className?: string;
  title: string;
  subtitle: string;
}

export const Title = ({ className, subtitle, title }: TitleProps) => {
  return (
    <div className={classNames(cls.Title, className)}>
      <p className={cls.subtitle}>{subtitle}</p>
      <h1 className={cls.title}>{title}</h1>
    </div>
  );
};
