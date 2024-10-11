import { memo } from 'react';
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';

import { LoginForm } from '@/features/Login';
import { Logo } from '@/shared/ui/Logo/Logo';
import { Routes } from '@/app/providers/RouterConfig/RouteConfig';
import { isLogged } from '@/shared/util/isLogged';

import cls from './LoginPage.module.scss';

export const LoginPage = memo(() => {
  const navigate = useNavigate();

  if (isLogged()) {
    return <Navigate to={Routes.MAIN} replace />;
  }

  return (
    <main className={cls.loginPage}>
      <div className={cls.background} />
      <Logo className={cls.logo} left />
      <div className={cls.card}>
        <LoginForm onSuccess={() => navigate('/')} />
      </div>
    </main>
  );
});
