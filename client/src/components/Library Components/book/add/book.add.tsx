import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ROUTE_URL } from '@/constant/routes.const';
import { addBooKRequest, fetchBooKRequest, fetchByIdBooKRequest } from '@/store/action/book.action';
import { AppState } from '@/store/reducer/root.reducer';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { BookOpen, Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const BookAdd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),

    status: Yup.string().required('Status is required'),

    author: Yup.string().required('Author is required'),

    publishedYear: Yup.number()
      .required('Published year is required')
      .typeError('Published year must be a number'),

  });

  const [bookData, setBookData] = useState({
    _id: '',
    title: '',
    status: '',
    author: '',
    publishedYear: '',
  });

  const book = useSelector(
    (state: AppState) => state?.book?.update?.result,
  );
  const bookFromStore = book?.data;

  

  const [page] = useState(1);
  const [limit] = useState(5);

  useEffect(() => {
    if (id) {
      dispatch(fetchByIdBooKRequest(id) as any);
    }
  }, [id]);

  useEffect(() => {
    if (bookFromStore && !Array.isArray(bookFromStore)) {
      setBookData({
        _id: bookFromStore._id || '',
        title: bookFromStore.title || '',
        status: bookFromStore.status || '',
        author: bookFromStore.author || '',
        publishedYear: bookFromStore.publishedYear || '',
      });
    }
  }, [bookFromStore]);

  const handleSubmit = async (
    values: typeof bookData,
    { resetForm }: any,
  ) => {
    if (id) {
      const updatedValues = { ...values, _id: id };

      await dispatch(addBooKRequest(updatedValues) as any);

      toast.success('Book updated successfully!');

      setTimeout(() => {
        navigate(ROUTE_URL.ADMIN.BOOK.LIST);
        dispatch(fetchBooKRequest({ page, limit }) as any);
      }, 1000);

      resetForm();
    } else {
      await dispatch(addBooKRequest(values) as any);

      toast.success('Book added successfully!');

      setTimeout(() => {
        navigate(ROUTE_URL.ADMIN.BOOK.LIST);
        dispatch(fetchBooKRequest({ page, limit }) as any);
      }, 1000);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8'>
      <div className='w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6 sm:p-8'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-2'>
            <div className='w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white'>
              <BookOpen size={20} />
            </div>

            <h2 className='text-lg font-semibold'>Book Form</h2>
          </div>
        </div>

        <Separator className='mb-6' />

        <Formik
          initialValues={bookData}
          enableReinitialize
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} className='space-y-6'>
              
              {/* Title */}
              <div>
                <Label className='font-medium'>Title</Label>

                <Field
                  as={Input}
                  name='title'
                  placeholder='Enter book title'
                  className='mt-1 w-full'
                />

                <ErrorMessage
                  name='title'
                  component='p'
                  className='text-red-500 text-sm mt-1'
                />
              </div>

              {/* Status & Author */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                
                <div>
                  <Label>Status</Label>

                  <Field
                    as='select'
                    name='status'
                    className='mt-1 w-full border rounded-lg p-2'
                  >
                    <option value=''>Select Status</option>
                    <option value='available'>available</option>
                    <option value='borrowed'>borrowed</option>
                  </Field>

                  <ErrorMessage
                    name='status'
                    component='p'
                    className='text-red-500 text-sm mt-1'
                  />
                </div>

                <div>
                  <Label>Author</Label>

                  <Field
                    as={Input}
                    name='author'
                    placeholder='Enter author name'
                    className='mt-1 w-full'
                  />

                  <ErrorMessage
                    name='author'
                    component='p'
                    className='text-red-500 text-sm mt-1'
                  />
                </div>
              </div>

              {/* Published Year */}
              <div>
                <Label>Published Year</Label>

                <Field
                  as={Input}
                  type='number'
                  name='publishedYear'
                  placeholder='Enter published year'
                  className='mt-1 w-full'
                />

                <ErrorMessage
                  name='publishedYear'
                  component='p'
                  className='text-red-500 text-sm mt-1'
                />
              </div>

              {/* Buttons */}
              <div className='flex justify-end gap-3 pt-4'>
                
                <Link to={`${ROUTE_URL.ADMIN.BOOK.BASE}`}>
                  <Button
                    type='button'
                    variant='outline'
                    className='px-4'
                  >
                    <X className='mr-1' />
                    Cancel
                  </Button>
                </Link>

                <Button type='submit' className='px-6'>
                  <Download className='mr-1' />

                  {id ? 'Update Book' : 'Create Book'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BookAdd;
