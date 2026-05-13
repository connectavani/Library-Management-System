import { DynamicTable } from '@/components/Table';
import { Button } from '@/components/ui/button';
import { ROUTE_URL } from '@/constant/routes.const';
import {
  deleteRoleRequest,
  fetchRoleRequest,
} from '@/store/action/role.action';
import { AppState } from '@/store/reducer/root.reducer';
import { toast } from 'react-toastify';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChartNoAxesCombined, DiamondPlus, MoreHorizontal } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { Column } from '@/interface/column';
import { Separator } from '@/components/ui/separator';

const RoleListApp = () => {
  const roles = useSelector((x: AppState) => x.role.list.result || []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRoleRequest() as any); // Or ideally with proper typing
  }, [dispatch]);

  const handleDelete = async (_id: string) => {
    try {
      await dispatch(deleteRoleRequest(_id) as any);
      toast.success('Role deleted successfully');

      // Re-fetch roles after successful deletion
      dispatch(fetchRoleRequest() as any);
    } catch (error) {
      toast.error('Failed to delete role');
      console.error('Delete role error:', error);
    }
  };

  const columns: Column<any>[] = [
    { key: 'roleName', label: 'Role Name', align: 'left' },
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
            {/* <DropdownMenuItem onClick={() => alert(`Viewing event ${row._id}`)}>
              View
            </DropdownMenuItem> */}
            <DropdownMenuItem asChild>
              <Link
                to={ROUTE_URL.ADMIN.SETTING.ROLES.EDIT.replace(':id', row._id)}
              >
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
  const customSearch = (row: any, term: string) => {
    const lowerTerm = term.toLowerCase();
    return row.roleName.toLowerCase().includes(lowerTerm);
  };

  return (
    <div className='min-h-screen flex flex-col px-2 sm:px-4'>
      <div className='p-4 flex-grow'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full'>
          <div className='flex items-center gap-1'>
            <div className='w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold'>
              <ChartNoAxesCombined size={20} strokeWidth={3} />
            </div>
            <span className='text-md font-semibold'>Role</span>
          </div>
          <div className='w-full sm:w-auto'>
            <Link to={`${ROUTE_URL.ADMIN.SETTING.ROLES.ADD}`}>
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

        <div className='mt-4 overflow-x-auto'>
          <DynamicTable
            data={roles}
            columns={columns}
            searchPlaceholder='Search role...'
            customSearch={customSearch} // Use custom search logic here
          />
        </div>
      </div>
    </div>
  );
};

export default RoleListApp;
