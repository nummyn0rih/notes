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
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: RequireAuth,
        // children: [

        // ]
      },
      {
        path: "login",
        Component: LoginPage,
      },
    //   {
    //     path: "protected",
    //     loader: protectedLoader,
    //     Component: ProtectedPage,
    //   },
    ],
  },
  // {
  //   path: "/logout",
  //   async action() {
  //     // We signout in a "resource route" that we can hit from a fetcher.Form
  //     await fakeAuthProvider.signout();
  //     return redirect("/");
  //   },
  // },
]);

export function Router() {
  return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />;
}
