// import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Shell } from './components';
import { LoginPage } from './pages/LoginPage';

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    // loader() {
      // Our root route always provides the user, if logged in
      // return { user: fakeAuthProvider.username };
    // },
    Component: Layout,
    children: [
      {
        index: true,
        Component: Shell,
      },
      {
        path: "login",
        // action: loginAction,
        // loader: loginLoader,
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
