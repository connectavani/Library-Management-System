import { Column, DynamicTable } from '@/components/Table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { ROUTE_URL } from '@/constant/routes.const';
import {
  deleteBooKRequest,
  fetchBooKRequest,
} from '@/store/action/book.action';

import { DiamondPlus, MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { toast } from 'react-toastify';

const BookList = () => {
  const dispatch = useDispatch();

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const BookData = useSelector((x: any) => x.book?.list.result || {});

  const Books = BookData?.data?.Books || [];

  const totalPages = BookData?.data?.totalPages || 1;

  useEffect(() => {
    dispatch(fetchBooKRequest({ page, limit }) as any);
  }, [page, limit]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteBooKRequest(id) as any);

      toast.success('Book deleted successfully');

      setTimeout(() => {
        dispatch(fetchBooKRequest({ page, limit }) as any);
      }, 1000);
    } catch (error) {
      toast.error('Failed to delete Book');
      console.error('Delete Book error:', error);
    }
  };

  const columns: Column<any>[] = [
    {
      key: 'title',
      label: 'Title',
      align: 'left',
    },

    {
      key: 'author',
      label: 'Author',
      align: 'left',
    },

    {
      key: 'status',
      label: 'Status',
      align: 'left',
      render: (value: string) => (
        <span
          style={{
            color: value === 'available' ? 'green' : 'red',
          }}
        >
          {value}
        </span>
      ),
    },

    {
      key: 'publishedYear',
      label: 'Published Year',
      align: 'left',
    },

    {
      key: 'createdAt',
      label: 'Created At',
      align: 'left',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },

    {
      key: 'actions',
      label: 'Actions',
      align: 'right',

      render: (_value: any, row: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>

              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuItem asChild>
              <Link to={ROUTE_URL.ADMIN.BOOK.EDIT.replace(':id', row._id)}>
                Edit
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              className='text-red-600'
              onClick={() => handleDelete(row._id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className='min-h-screen flex flex-col px-2 sm:px-4'>
      <div className='p-4 flex-grow'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full'>
          <div className='flex items-center gap-1'>
            <div className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold'></div>

            <span className='text-md font-semibold'>Book</span>
          </div>

          <div className='w-full sm:w-auto'>
            <Link to={`${ROUTE_URL.ADMIN.BOOK.ADD}`}>
              <Button
                type='button'
                className='w-full sm:w-auto btn btn-primary btn-sm flex justify-center'
              >
                <DiamondPlus /> New
              </Button>
            </Link>
          </div>
        </div>

        <Separator className='mt-4' />

        {/* Table */}
        <div className='mt-4 overflow-x-auto'>
          <DynamicTable
            data={Books}
            columns={columns}
            searchPlaceholder='Search Book...'
          />
        </div>

        {/* Pagination */}
        <div className='flex justify-center items-center gap-4 mt-4'>
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </Button>

          <span>
            Page {page} of {totalPages}
          </span>

          <Button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookList;
