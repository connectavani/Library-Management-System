export const ENDPOINT = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  AUTH: {
    API: {
      login: '/auth/login',
      signup: '/auth/registration',
      pages: '/api/pages',
      actions: '/api/action',
      sendOtp: '/auth/sendOtp',
      verifyotp: '/auth/verifyOTP',
      resetPassword: '/auth/forgotPassword',
      fetchData: '/auth/update',
      updateData: '/auth/',
    },
  },
 BOOK: {
    API: {
      ADD_BOOK: '/book/create',
      FETCH_BOOK: '/book/getAll',
      FETCH_BOOK_BY_ID: '/book/getById',
      UPDATE_BOOK: '/book/update',
      DELETE: '/book/delete',
    },
  }, 
  CATEGORY: {
    API: {
      FETCH_CATEGORY: '/category/',
    },
  },
 
  USERS: {
    API: {
      FETCH_USER: '/auth',
      ADD: '/auth',
      FETCH_USER_BY_ID: '/auth',
      UPDATE: '/auth',
      DELETE: '/auth',
      USER_ACTION: '/auth/action',
    },
  },
   ROLE: {
    API: {
      FETCH_ROLE: '/role',
      ADD: '/role',
      FETCH_ROLE_BY_ID: '/role',
      UPDATE: '/role',
      DELETE: '/role',
    },
  },
 };
