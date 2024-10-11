import { useRef } from 'react';
import { createBrowserRouter, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { routeConfig } from '../RouterConfig/RouteConfig';

import '@/app/providers/ui/AppRouterTransitions.scss';
import { NotFound } from '@/pages/NotFound/NotFound';

export const AppPage = () => {
  const location = useLocation();
  const nodeRef = useRef<HTMLDivElement>(null);

  const selectedRoute = routeConfig.find(
    (route) => route.path === location.pathname,
  );
  const element = selectedRoute?.element || <NotFound />;

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        timeout={200}
        classNames="page"
        unmountOnExit
      >
        {() => (
          <div ref={nodeRef} className="page">
            {element}
          </div>
        )}
      </CSSTransition>
    </SwitchTransition>
  );
};

export const AppRouter = createBrowserRouter(routeConfig);
