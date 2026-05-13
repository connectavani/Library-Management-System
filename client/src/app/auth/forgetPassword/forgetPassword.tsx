import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { IAuthenticationRequestModel } from '@/interface/auth.model';
import { cn } from '@/lib/utils';
import { forgetPasswordRequest } from '@/store/action/auth.action';
import { AppState } from '@/store/reducer/root.reducer';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'; // ✅ Yup added here
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux-saga';
import { ThunkDispatch } from 'redux-thunk';
import { Link } from 'react-router';
import { ROUTE_URL } from '@/constant/routes.const';
import { toast } from 'react-toastify';

const ForgetPasswordApp = () => {
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();
  const auth = useSelector((state: any) => state.auth.update);  

  const [useLoginDetail] = useState<IAuthenticationRequestModel>({
    email: '',
  });

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });

  const onForget = async (values: IAuthenticationRequestModel) => {
    dispatch(forgetPasswordRequest(values));
  };

  
    useEffect(() => {
      if (auth?.error && Array.isArray(auth.error)) {
        toast.error(auth.error[0]);
      }
    }, [auth?.error]);

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <div className={cn('flex flex-col gap-6')}>
          <Card>
            <CardHeader>
              <CardTitle className='text-center'>Forget Password</CardTitle>
              <CardDescription>
                Enter your email below to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Formik
                initialValues={useLoginDetail}
                validationSchema={validationSchema}
                onSubmit={onForget}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className='flex flex-col gap-6'>
                      <div className='grid gap-3'>
                        <Label htmlFor='email'>Email</Label>
                        <Field
                          id='email'
                          name='email'
                          type='email'
                          placeholder='m@example.com'
                          className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                        />
                        <ErrorMessage
                          name='email'
                          component='div'
                          className='text-red-500 text-sm'
                        />
                      </div>

                      <div className='flex flex-col gap-3'>
                        <div className=''>
                          <Button
                            type='submit'
                            className='w-full'
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Loading...' : 'Submit'}
                          </Button>
                        </div>
                        <div>
                          <Link to={ROUTE_URL.LOGIN} >
                            <Button type='submit' className='w-full'>
                              Cancel
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordApp;
