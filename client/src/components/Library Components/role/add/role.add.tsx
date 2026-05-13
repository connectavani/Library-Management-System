import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Label } from '@/components/ui/label';
import {
  addRoleRequest,
  fetchbyidaddRoleRequest,
  fetchRoleRequest,
} from '@/store/action/role.action';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/store/reducer/root.reducer';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux-saga';
import { Link, useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { ROUTE_URL } from '@/constant/routes.const';
import { toast } from 'react-toastify';
import { ChartNoAxesCombined, Download, X } from 'lucide-react';

const validationSchema = Yup.object().shape({
  roleName: Yup.string().required('Role Name is required'),
});

const RoleAddApp = () => {
  const { id } = useParams();
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();
  const navigate = useNavigate();

  const [roleData, setRoleData] = useState({ roleName: '' });

  const roleFromStore = useSelector(
    (state: AppState) => state.role.update.result,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchbyidaddRoleRequest(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (roleFromStore && !Array.isArray(roleFromStore)) {
      setRoleData({
        roleName: roleFromStore.roleName || '',
      });
    }
  }, [roleFromStore]);

  const handleSubmit = async (values: typeof roleData, { resetForm }: any) => {
    if (id) {
      const updatedValues = { ...values, _id: id };
      await dispatch(addRoleRequest(updatedValues));
      await dispatch(fetchRoleRequest()); // Add this
      resetForm();
      navigate(ROUTE_URL.ADMIN.SETTING.ROLES.LIST);
      // Use correct route for your role list
      toast.success('Role updated successfully!');
    } else {
      await dispatch(addRoleRequest(values));
      toast.success('Role added successfully!');
      setTimeout(() => {
        navigate(ROUTE_URL.ADMIN.SETTING.ROLES.LIST);
      }, 1000);
    }
  };

  return (
    <div className='relative min-h-screen flex flex-col'>
      <div className='p-4 flex-grow'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-1'>
            <div className='w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold'>
              <ChartNoAxesCombined size={20} strokeWidth={3} />
            </div>
            <span className='text-md font-semibold'>Role</span>
          </div>
        </div>
        <Separator className='mt-4 mb-4' />
        <div className='flex flex-col items-center justify-center px-2 sm:px-4 md:px-6'>
          <Formik
            initialValues={roleData}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                className='space-y-6 w-full max-w-5xl'
              >
                {/* <CardContent> */}
                {/* Row 1 */}
                <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
                  <div>
                    <Label className='font-semibold'>Role Name</Label>
                    <Field
                      as={Input}
                      name='roleName'
                      type='text'
                      className='mt-1 border-gray-300 rounded-lg w-full'
                    />
                    <ErrorMessage
                      name='roleName'
                      component='p'
                      className='text-red-500 text-sm mt-1'
                    />
                  </div>
                </div>
                {/* </CardContent> */}
                {/* </Card> */}

                <div className='flex justify-center mt-6 gap-5 flex-wrap'>
                  <div>
                    <Button type='submit' className='btn btn-primary'>
                      <Download /> {id ? 'Update' : 'Submit'}
                    </Button>
                  </div>
                  <div>
                    <Link to={`${ROUTE_URL.ADMIN.SETTING.ROLES.BASE}`}>
                      <Button type='button' className='btn btn-primary'>
                        <X />
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RoleAddApp;
