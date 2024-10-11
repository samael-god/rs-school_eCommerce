import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';

import { loadClient } from '@/features/Loader/LoadClient';
import { CatalogPage } from '@/pages/CatalogPage';
import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { MainPage } from '@/pages/MainPage/MainPage';
import { NotFound } from '@/pages/NotFound/NotFound';
import { ProductPage } from '@/pages/ProductPage/ProductPage';
import { ProfilePage } from '@/pages/ProfilePage/ui/ProfilePage';
import { RegistrationPage } from '@/pages/RegistrationPage/RegistrationPage';
import { CartPage } from '@/pages/CartPage';
import { AboutUsPage } from '@/pages/AboutUsPage/ui/AboutUsPage';

export enum Routes {
  LOGIN = '/login',
  REGISTRATION = '/registration',
  MAIN = '/main',
  CATALOG = '/catalog',
  CATEGORY_ID = ':categoryId',
  SUBCATEGORY_ID = ':categoryId/:subcategoryId',
  PRODUCT = '/catalog/:categoryId/:subcategoryId/:productKey',
  PROFILE = '/profile',
  CART = '/cart',
  ABOUT = '/about',
  ROOT = '/',
  NOT_FOUND = '/*',
  ERROR = '/404',
}
export enum PageIDs {
  PROFILE = 'profile',
}

type IndexRouteObjectWithPath = Exclude<IndexRouteObject, 'path' | 'children'>;

type NonIndexRouteObjectWithPath = Exclude<
  NonIndexRouteObject,
  'path' | 'children'
>;

type RouteConfig = NonIndexRouteObjectWithPath | IndexRouteObjectWithPath;

export const routeConfig: RouteConfig[] = [
  {
    path: Routes.LOGIN,
    element: <LoginPage />,
  },
  {
    path: Routes.REGISTRATION,
    element: <RegistrationPage />,
  },
  {
    path: Routes.MAIN,
    element: <MainPage />,
  },
  {
    path: Routes.CATALOG,
    element: <CatalogPage />,
    children: [
      {
        path: Routes.CATEGORY_ID,
        element: (
          <NotFound additionalMessage="The CATEGORY_ID page will be created during the next sprint." />
        ),
      },
      {
        path: Routes.SUBCATEGORY_ID,
        element: (
          <NotFound additionalMessage="The CATEGORY_ID page will be created during the next sprint." />
        ),
      },
    ],
  },
  {
    path: Routes.PRODUCT,
    element: <ProductPage />,
  },
  {
    path: Routes.PROFILE,
    id: PageIDs.PROFILE,
    loader: loadClient,
    element: <ProfilePage />,
    errorElement: <NotFound additionalMessage="Some error occured!" />,
  },
  {
    path: Routes.CART,
    element: <CartPage />,
  },
  {
    path: Routes.ABOUT,
    element: <AboutUsPage />,
  },
  {
    path: Routes.ROOT,
    element: <MainPage />,
  },
  {
    path: Routes.NOT_FOUND,
    element: <NotFound />,
  },
];
