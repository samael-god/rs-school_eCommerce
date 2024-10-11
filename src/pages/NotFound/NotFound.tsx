import { memo } from 'react';

import { Routes } from '@/app/providers/RouterConfig/RouteConfig';
import Liana from '@/shared/assets/images/liana.svg';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Logo } from '@/shared/ui/Logo/Logo';
import cls from './NotFound.module.scss';

interface NotFoundProps {
  additionalMessage?: string;
}

export const NotFound = memo(({ additionalMessage }: NotFoundProps) => {
  return (
    <main className={cls.notFound}>
      <div className={cls.headerImg} />
      <div className={cls.lianaTop}>
        <Liana />
      </div>
      <Logo />
      <p className={cls.content}>404</p>
      <p className={cls.signature}>Not Found</p>
      <AppLink to={Routes.MAIN} className={cls.linkToMain}>
        To home page
      </AppLink>
      {additionalMessage && (
        <p className={cls.additionalMessage}>{additionalMessage}</p>
      )}
      <div className={cls.lianaFooter}>
        <Liana />
      </div>
    </main>
  );
});
