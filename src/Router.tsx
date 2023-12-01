// import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { LoginPage } from './pages/LoginPage';
import { RequireAuth } from './context/AuthProvider';
import { Note, NotFound, Shell, EditNote } from './components';

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: Layout,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <RequireAuth />,
        children: [
          {
            path: "/",
            element: <Shell />,
            children: [
              {
                path: "notes/:id",
                element: <Note />,
              },
              {
                path: "notes/:id/edit",
                element: <EditNote />,
              },
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
