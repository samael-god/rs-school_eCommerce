import classNames from 'classnames';
import cls from './AppError.module.scss';

interface ErrorProps {
  text: string;
  className?: string;
}

export const AppError = ({ text, className = '' }: ErrorProps) => {
  return <span className={classNames(cls.error, className)}>{text}</span>;
};
