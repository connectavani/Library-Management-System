import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ROUTE_URL } from '@/constant/routes.const';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '@/service/auth.service';
import { AppState } from '@/store/reducer/root.reducer';
import { toast } from 'react-toastify';
import {
  authenticateRequest,
  forgetPasswordRequest,
} from '@/store/action/auth.action';
// import { IAuthenticationRequestModel } from '@/interface/auth.model';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LanguageSwitcher from '@/components/languageSwitcher';
import { useTranslation } from 'react-i18next';

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const forgetPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginDrawerOpen, setLoginDrawerOpen] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = AuthService.getAuthDetail()?.isAuthenticated;
  const navigate = useNavigate();
  const auth = useSelector((state: AppState) => state.auth);
  const forgetPassword = useSelector((state: any) => state.auth.update);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSignupModalForLogin, setShowSignupModalForLogin] = useState(false);
  const [showModelForRegisterDate, setShowModelForRegisterDate] =
    useState(false);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     if (auth.result?.roleName === USER) {
  //       navigate(ROUTE_URL.ADMIN.USER_DASHBOARD); // e.g., /dashboard/consumer
  //     } else {
  //       navigate(ROUTE_URL.ADMIN.DASHBOARD); // default dashboard
  //     }
  //   }
  // }, [auth?.result?.isAuthenticated, isAuthenticated, navigate]);

  useEffect(() => {
    if (auth?.error && Array.isArray(auth.error)) {
      toast.error(auth.error[0]);
    }
  }, [auth?.error]);

  useEffect(() => {
    if (forgetPassword?.error && Array.isArray(forgetPassword.error)) {
      toast.error(forgetPassword.error[0]);
    }
  }, [forgetPassword?.error]);

  useEffect(() => {
    if (forgetPassword?.result) {
      toast.success(forgetPassword.result.message);
    }
  }, [forgetPassword]);

  const toggleDrawer = () => {
    setLoginDrawerOpen(!loginDrawerOpen);
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <header className='bg-white shadow-md fixed top-0 z-50 w-full'>
        <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
          {/* Logo */}
          <Link to='/' className='text-xl font-bold text-[#ff680B]'>
          </Link>

          {/* Desktop Nav */}
          <nav className='hidden md:flex items-center space-x-6 ml-auto'>
            <LanguageSwitcher />

            <button
              onClick={toggleDrawer}
              className='text-white hover:text-[#ff680B] font-medium bg-[#ff680B] hover:bg-white font-semibold border-2 cursor-pointer hover:border-[#ff680B] transition ease-in-out px-4 py-2 rounded-md'
            >
              {t('login')}
            </button>
          </nav>

          {/* <RegistrationDateComponent /> */}
          {/* Mobile Login Button + Hamburger */}
          <div className='md:hidden space-x-6 flex items-center'>
            <LanguageSwitcher />
            <button
              onClick={toggleDrawer}
              className='text-[#ff680B] px-3 py-3.5 rounded-md text-sm'
            >
              {t('login')}
            </button>

            <button
              className='text-[#ff680B]'
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Login Drawer */}
      {loginDrawerOpen && (
        <div className='fixed inset-0 z-50 flex justify-end'>
          {/* Background Overlay */}
          <div
            className='absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-100'
            onClick={() => {
              setLoginDrawerOpen(false);
              setShowForgotPassword(false);
            }}
          ></div>

          {/* Drawer Panel */}
          <div
            className='relative bg-white w-full max-w-sm h-full shadow-lg p-6 transform transition-transform duration-300 translate-x-0'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold text-[#ff680B]'>
                {/* {showForgotPassword ? 'Forgot Password' : 'Login'} */}
                {showForgotPassword
                  ? `${t('Forgot Password')}`
                  : `${t('login')}`}
              </h2>
              <button
                onClick={() => {
                  setLoginDrawerOpen(false);
                  setShowForgotPassword(false);
                }}
                className='text-gray-600 hover:text-black'
              >
                <X size={24} />
              </button>
            </div>

            {showForgotPassword ? (
              // Forgot Password Form
              <Formik
                initialValues={{ email: '' }}
                validationSchema={forgetPasswordValidationSchema}
                onSubmit={(values) =>
                  dispatch(forgetPasswordRequest(values) as any)
                }
              >
                {({ isSubmitting }) => (
                  <Form className='space-y-4'>
                    <div>
                      <label className='block mb-1 font-medium'>
                        {t('Email')}
                      </label>
                      <Field
                        name='email'
                        type='email'
                        className='w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff680B]'
                        placeholder='Enter your email'
                      />
                      <ErrorMessage
                        name='email'
                        component='div'
                        className='text-red-500 text-sm mt-1'
                      />
                    </div>
                    <div className='flex justify-between space-x-4'>
                      <button
                        type='button'
                        className='w-1/2 border border-gray-300 py-2 rounded-md hover:bg-gray-100'
                        onClick={() => {
                          setLoginDrawerOpen(false);
                          setShowForgotPassword(false);
                          navigate(ROUTE_URL.HOME); // Cancel redirects to home
                        }}
                      >
                        {t('Cancel')}
                      </button>
                      <button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-1/2 bg-[#ff680B] text-white py-2 rounded-md font-medium hover:bg-[#e65d00]'
                      >
                        {t('Submit')}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            ) : (
              // LOGIN FORM
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={(values) =>
                  dispatch(authenticateRequest(values) as any)
                }
              >
                {({ isSubmitting }) => (
                  <Form className='space-y-4'>
                    <div>
                      <label className='block mb-1 font-medium'>Email</label>
                      <Field
                        name='email'
                        type='email'
                        className='w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff680B]'
                        placeholder='Enter your email'
                      />
                      <ErrorMessage
                        name='email'
                        component='div'
                        className='text-red-500 text-sm mt-1'
                      />
                    </div>

                    <div>
                      <label className='block mb-1 font-medium'>Password</label>
                      <Field
                        name='password'
                        type='password'
                        className='w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff680B]'
                        placeholder='Enter your password'
                      />
                      <ErrorMessage
                        name='password'
                        component='div'
                        className='text-red-500 text-sm mt-1'
                      />
                    </div>

                    <div className='text-right'>
                      <button
                        type='button'
                        onClick={() => setShowForgotPassword(true)}
                        className='text-sm text-[#ff680B] no-underline hover:underline bg-transparent hover:border-transparent'
                      >
                        {t('Forgot Password')}?
                      </button>
                    </div>

                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='w-full bg-[#ff680B] text-white py-2 rounded-md font-medium hover:bg-[#e65d00]'
                    >
                      {isSubmitting ? 'Logging in...' : `${t('login')}`}
                    </button>
                  </Form>
                )}
              </Formik>
            )}

            <div className='text-center text-xs text-gray-500 mt-6'>
              Designed by Avani
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div
          className='fixed inset-0 z-50  flex items-center justify-center'
          onClick={() => setShowSignupModal(false)} // close on background click
        >
          <div
            className='bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg relative'
            onClick={(e) => e.stopPropagation()} // prevent modal close when clicked inside
          >
            {/* Close Button */}
            <button
              onClick={() => setShowSignupModal(false)}
              className='absolute top-4 right-4 text-gray-600 hover:text-black'
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {showSignupModalForLogin && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center'
          onClick={() => setShowSignupModalForLogin(false)}
        >
          <div
            className='bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg relative'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSignupModalForLogin(false)}
              className='absolute top-4 right-4 text-gray-600 hover:text-black'
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {showModelForRegisterDate && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center'
          onClick={() => setShowModelForRegisterDate(false)}
        >
          <div
            className='bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg relative'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModelForRegisterDate(false)}
              className='absolute top-4 right-4 text-gray-600 hover:text-black'
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
