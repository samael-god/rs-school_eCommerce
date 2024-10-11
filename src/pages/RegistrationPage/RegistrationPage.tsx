import { memo, useState } from 'react';
import { useNavigate } from 'react-router';

import { Navigate } from 'react-router-dom';

import { RegistrationFormUser } from '@/features/Registration/ui/RegistrationFormUser';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import cls from './RegistrationPage.module.scss';

import { Logo } from '@/shared/ui/Logo/Logo';
import { isLogged } from '@/shared/util/isLogged';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';

export const RegistrationPage = memo(() => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loading = (value: boolean) => {
    setIsLoading(value);
  };
  if (isLogged()) {
    return <Navigate to="/main" replace />;
  }
  return (
    <main className={cls.registrationPage}>
      {isLoading && <LoadingAnimation fullScreen />}
      <Logo left />
      <div className={cls.card}>
        <div>
          <h1 className={cls.title}>Registration</h1>
          <div className={cls.wrapper}>
            <h2 className={cls.subtitle}> Have an Account?</h2>
            <AppLink to="/login" className={cls.link}>
              Log in
            </AppLink>
          </div>
        </div>
        <RegistrationFormUser
          onSuccess={() => navigate('/')}
          setLoading={loading}
        />
      </div>
    </main>
  );
});
