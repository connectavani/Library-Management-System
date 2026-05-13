import { ROUTE_URL } from '@/constant/routes.const';
import { createBrowserRouter } from 'react-router';
import BaseLayout from '@/layout/BaseLayout';
import { lazy } from 'react';
import HomeLayout from '@/layout/HomeLayout';
import Login from './login/login-form';
import BookList from '@/components/Library Components/book/list/book.list';
import BookAdd from '@/components/Library Components/book/add/book.add';




const PageNotFound = lazy(() => import('./PageNotFound/PageNotFound'));
const ForgetPasswordApp = lazy(() => import('./forgetPassword/forgetPassword'));

const RoutesApp = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />, // Acts as the layout shell
    children: [
      {
        index: true, // This means path: ""
        element: <Login />,
      },
      {
        path: ROUTE_URL.UNDEFINED,
        element: <PageNotFound />,
      },
    ],
  },

  {
    path: ROUTE_URL.ADMIN.BASE,
    element: <BaseLayout />,
    children: [
      {
        path: ROUTE_URL.ADMIN.BOOK.BASE,
        element: <BookList />,
      },
      {
        path: ROUTE_URL.ADMIN.BOOK.LIST,
        element: <BookList />,
      },
      {
        path: ROUTE_URL.ADMIN.BOOK.ADD,
        element: <BookAdd />,
      },
         {
        path: ROUTE_URL.ADMIN.BOOK.EDIT,
        element: <BookAdd />,
      },
    ],
  },
  {
    path: ROUTE_URL.FORGET_PASSWORD,
    element: <ForgetPasswordApp />,
  },
  {
    path: ROUTE_URL.UNDEFINED,
    element: <PageNotFound />,
  },
]);

export default RoutesApp;
