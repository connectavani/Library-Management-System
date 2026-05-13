import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/store/reducer/root.reducer';
import { IAuthenticationRequestModel } from '@/interface/auth.model';
import { authenticateRequest } from '@/store/action/auth.action';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE_URL } from '@/constant/routes.const';
import AuthService from '@/service/auth.service';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { COMPANY_NAME } from '@/constant/global-contants/global-key.const';

type LoginProps = {};

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const Login: FC<LoginProps> = () => {
  const dispatch = useDispatch();
  const isAuthenticated = AuthService.getAuthDetail()?.isAuthenticated;
  const navigate = useNavigate();
  const auth = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    if (isAuthenticated || auth?.result?.isAuthenticated) {
      navigate(ROUTE_URL.ADMIN.BOOK.BASE);
    }

  }, [auth?.result?.isAuthenticated, isAuthenticated, navigate]);

  useEffect(() => {
    if (auth?.error && Array.isArray(auth.error)) {
      toast.error(auth.error[0]);
    }
  }, [auth?.error]);

  const initialValues: IAuthenticationRequestModel = {
    email: '',
    password: '',
  };

  const onLogin = async (values: IAuthenticationRequestModel) => {
    dispatch(authenticateRequest(values) as any);
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen w-full items-center justify-center gap-8 p-6 md:p-10'>
      <div className='w-full md:w-1/2 flex justify-center mb-6 md:mb-0'>
        <Link to={ROUTE_URL.HOME}>
          <img
            src='https://demo.creativeitem.com/academy-laravel/public/assets/frontend/default/image/login.gif'
            alt='Login Illustration'
            className='img-fluid'
            style={{ maxHeight: '500px', objectFit: 'contain' }}
          />
        </Link>
      </div>
      <div className='w-full max-w-sm md:max-w-md'>
        <div className={cn('flex flex-col gap-6')}>
          <div>
            <CardHeader>
              <CardTitle className='text-center '>
                Login to your account
              </CardTitle>
              <CardDescription className='m-2'>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Formik
                initialValues={initialValues}
                onSubmit={onLogin}
                validationSchema={LoginSchema}
                validateOnBlur
              >
                {({ isSubmitting, isValid, dirty }) => (
                  <Form>
                    <div className='flex flex-col gap-6'>
                      <div className='grid gap-3'>
                        <Label htmlFor='email'>Email</Label>
                        <Field
                          id='email'
                          name='email'
                          type='email'
                          placeholder='m@example.com'
                          className={cn(
                            'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                          )}
                        />
                        <ErrorMessage
                          name='email'
                          component='div'
                          className='text-red-500 text-sm'
                        />
                      </div>
                      <div className='grid gap-3'>
                        <Label htmlFor='password'>Password</Label>
                        <Field
                          id='password'
                          name='password'
                          type='password'
                          placeholder='*******'
                          className={cn(
                            'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                          )}
                        />
                        <ErrorMessage
                          name='password'
                          component='div'
                          className='text-red-500 text-sm'
                        />
                      </div>
                      <div className='flex items-center'>
                        {/* <Link
                          to={ROUTE_URL.FORGET_PASSWORD}
                          className='ml-auto inline-block text-sm underline-offset-4 hover:underline text-blue-500 '
                        >
                          <i className='bi bi-plus-lg'></i>Forgot your password?
                        </Link> */}
                      </div>
                      <div className='flex flex-col gap-3'>
                        <Button
                          type='submit'
                          className='w-full'
                          disabled={isSubmitting || !(isValid && dirty)}
                        >
                          {isSubmitting ? 'Logging in...' : 'Login'}
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </div>
        </div>
        <div className='text-center'>
          <small>
            Designed by{' '}
            <Link to='https://vedantinnovision.com/'>
              <b className='text-blue-500'>{COMPANY_NAME}</b>
            </Link>{' '}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
