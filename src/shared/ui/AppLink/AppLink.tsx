import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { ReactNode } from 'react';

import cls from './AppLink.module.scss';

interface AppLinkProps {
  to: string;
  children: ReactNode;
  underlined?: boolean;
  className?: string;
  onClick?: () => void;
}

export const AppLink = (props: AppLinkProps) => {
  const { to, children, className = '', underlined = false, onClick } = props;
  return (
    <NavLink
      onClick={onClick}
      to={to}
      end
      className={({ isActive }) =>
        classNames(
          cls.AppLink,
          { [cls.active]: isActive, [cls.underlined]: underlined },
          className,
        )
      }
    >
      {children}
    </NavLink>
  );
};
