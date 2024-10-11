import { useLocation } from 'react-router-dom';

import { useParams } from 'react-router';
import { AiOutlineRight } from 'react-icons/ai';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import cls from './Breadcrumbs.module.scss';
import { Routes } from '@/app/providers/RouterConfig/RouteConfig';
import { useAppDispatch } from '@/shared/hooks/redux';
import { catalogActions } from '@/pages/CatalogPage';

interface BreadcrumbsProps {
  scrollIntoSection?: () => void;
}

export const Breadcrumbs = ({ scrollIntoSection }: BreadcrumbsProps) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { categoryId, subcategoryId, productKey } = useParams();

  const handleOnClick = () => {
    scrollIntoSection?.();
    dispatch(catalogActions.setPage(0));
  };

  return (
    <div className={cls.wrapper}>
      <ul className={cls.list}>
        <AppLink to={Routes.CATALOG}>Catalog</AppLink>
        {location.pathname.includes(`/${categoryId}`) && (
          <>
            <AiOutlineRight size={20} />
            <AppLink
              to={`${Routes.CATALOG}/${categoryId}`}
              onClick={handleOnClick}
            >
              {categoryId}
            </AppLink>
          </>
        )}
        {location.pathname.includes(`/${subcategoryId}`) && (
          <>
            <AiOutlineRight size={20} />
            <AppLink
              to={`${Routes.CATALOG}/${categoryId}/${subcategoryId}`}
              onClick={handleOnClick}
            >
              {subcategoryId}
            </AppLink>
          </>
        )}
        {location.pathname.includes(`/${productKey}`) && (
          <>
            <AiOutlineRight size={20} />
            <AppLink
              to={`${Routes.CATALOG}/${categoryId}/${subcategoryId}/${productKey}`}
            >
              {productKey}
            </AppLink>
          </>
        )}
      </ul>
    </div>
  );
};
