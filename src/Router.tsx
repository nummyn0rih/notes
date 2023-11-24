// import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { NotFound, Shell } from './components';
import { LoginPage } from './pages/LoginPage';
import { RequireAuth } from './context/AuthProvider';

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: Layout,
    errorElement: <NotFound/>,
    children: [
      {
        path: "/",
        element: <RequireAuth/>,
        children: [
          {
            path: "/",
            element: <Shell/>,
            children: [

            ]
          }
        ]
      },
      {
        path: "login",
        Component: LoginPage,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />;
}
