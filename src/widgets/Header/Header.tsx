import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { AiOutlineClose, AiOutlineIdcard, AiOutlineMenu } from 'react-icons/ai';
import { FaCartShopping, FaUser, FaUserPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import { Routes } from '@/app/providers/RouterConfig/RouteConfig';
import { userActions } from '@/entities/User';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Button } from '@/shared/ui/button/button';
import HeaderImage from '@/shared/assets/images/header1.jpg';
import { Logo } from '@/shared/ui/Logo/Logo';
import { HideScroll } from '@/widgets/Header/util/HideScroll';
import { ShowScroll } from '@/widgets/Header/util/ShowScroll';

import cls from './Header.module.scss';
import { cartActions, getCartProducts } from '@/entities/Cart';

export const Header = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const dispatch = useAppDispatch();
  const cartQuantity = useAppSelector(getCartProducts).reduce((acc, curr) => {
    acc += curr.quantity;
    return acc;
  }, 0);

  const logOut = useCallback(() => {
    localStorage.removeItem(LocalStorageKeys.USER);
    localStorage.removeItem(LocalStorageKeys.TOKEN);
    localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
    localStorage.removeItem(LocalStorageKeys.VERSION);
    localStorage.removeItem(LocalStorageKeys.ACTIVE_CART);
    dispatch(userActions.logout());
    dispatch(cartActions.clearCart());
  }, [dispatch]);

  const setControls = () => {
    const login = localStorage.getItem(LocalStorageKeys.USER) || false;
    return (
      <div className={cls.button__wrapper}>
        {login && (
          <Button
            text="Logout"
            className={cls.header__button}
            onClick={() => {
              logOut();
              navigate('/login');
            }}
          />
        )}
        {!login && (
          <Button
            text="Login"
            className={`${cls.header__button} ${cls.mobile__hidden}`}
            onClick={() => {
              navigate('/login');
            }}
          />
        )}
        {!login && (
          <Button
            text="Registration"
            className={`${cls.header__button} ${cls.mobile__hidden}`}
            onClick={() => {
              navigate('/registration');
            }}
          />
        )}{' '}
        {!login && (
          <AppLink
            to={Routes.LOGIN}
            className={classNames(cls.icon__wrapper, cls.mobile__visible)}
          >
            <FaUserPlus size={30} className={cls.icon} />
          </AppLink>
        )}
        {!login && (
          <AppLink
            to={Routes.REGISTRATION}
            className={classNames(cls.icon__wrapper, cls.mobile__visible)}
          >
            <AiOutlineIdcard size={30} className={cls.icon} />
          </AppLink>
        )}{' '}
        {login && (
          <AppLink to={Routes.PROFILE} className={cls.icon__wrapper}>
            <FaUser size={25} className={cls.icon} />
          </AppLink>
        )}
      </div>
    );
  };
  return (
    <>
      <img src={HeaderImage} alt="" className={cls.headerImage} />
      <header className={cls.header}>
        <div className={cls.header__wrapper}>
          <Logo className={cls.logo} />
          <nav className={`${cls.nav} ${nav ? cls.active : null}`}>
            <ul className={cls.nav__list}>
              <li>
                <AppLink
                  to={Routes.MAIN}
                  className={cls.nav__link}
                  onClick={ShowScroll}
                >
                  Home
                </AppLink>
              </li>
              <li>
                <AppLink
                  to={Routes.CATALOG}
                  className={cls.nav__link}
                  onClick={ShowScroll}
                >
                  Catalog
                </AppLink>
              </li>
              <li>
                <AppLink
                  to={Routes.ABOUT}
                  className={cls.nav__link}
                  onClick={ShowScroll}
                >
                  About
                </AppLink>
              </li>
            </ul>
          </nav>
          <div className={cls.controls}>
            {setControls()}
            <AppLink to="/cart" className={cls.icon__wrapper}>
              <FaCartShopping size={25} className={cls.icon} />
              <div className={cls.cartQuantity}>{cartQuantity}</div>
            </AppLink>
            {!nav ? (
              <AiOutlineMenu
                className={`${cls.burger__icon} ${cls.icon}`}
                size={30}
                onClick={() => {
                  setNav(!nav);
                  HideScroll();
                }}
              />
            ) : (
              <AiOutlineClose
                className={`${cls.burger__icon} ${cls.icon}`}
                size={30}
                onClick={() => {
                  setNav(!nav);
                  ShowScroll();
                }}
              />
            )}
          </div>
        </div>
      </header>
    </>
  );
};
