export const ROUTE_URL = {
  HOME: '/',
  LOGIN: '/login',
  FORGET_PASSWORD: '/forget-password',
  UNDEFINED: '*',
  ABOUT: '/about',
  NOT_ALLOWED: '/not-allowed',
  ADMIN: {
    BASE: '/admin',
    BOOK: {
      BASE: '/admin/book',
      LIST: '/admin/book',
      ADD: '/admin/book/add',
      EDIT: '/admin/book/edit/:id', // if using dynamic route for editing
    },
    SETTING: {
      BASE: '/admin/setting',
      USERS: {
        BASE: '/admin/setting/users',
        LIST: '/admin/setting/users',
        ADD: '/admin/setting/users/add',
        EDIT: '/admin/setting/users/:id',
      },
      ROLES: {
        BASE: '/admin/setting/role',
        LIST: '/admin/setting/role',
        EDIT: '/admin/setting/role/:id',
        ADD: '/admin/setting/role/add',
      },
    },
  },
};
