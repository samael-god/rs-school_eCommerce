import { RouterProvider } from 'react-router-dom';

import { AppRouter } from '@/app/providers/ui/AppRouter';

export const App = () => {
  return <RouterProvider router={AppRouter} />;
};
