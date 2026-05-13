import AuthResolver from '@/app/auth/auth.resolver';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Outlet, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { logoutUserRequest } from '@/store/action/auth.action';
import AuthService from '@/service/auth.service';
import { useDispatch } from 'react-redux';
import { ROUTE_URL } from '@/constant/routes.const';
import { LogOut } from 'lucide-react';


export default function BaseLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

  const [selectedYear, setSelectedYear] = useState(() => {
    const stored = localStorage.getItem('authObj');
    if (stored) {
      try {
        const authObj = JSON.parse(stored);
        return (
          authObj.year ||
          `${new Date().getFullYear()}-${String(
            new Date().getFullYear() + 1,
          ).slice(-2)}`
        );
      } catch (error) {
        console.error('Failed to parse authObj:', error);
        return `${new Date().getFullYear()}-${String(
          new Date().getFullYear() + 1,
        ).slice(-2)}`;
      }
    }
    return `${new Date().getFullYear()}-${String(
      new Date().getFullYear() + 1,
    ).slice(-2)}`;
  });
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('authObj');
      if (stored) {
        try {
          const authObj = JSON.parse(stored);
          setSelectedYear(authObj.year);
        } catch (error) {
          console.error('Failed to parse authObj:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  const onLogoutClick = () => {
    dispatch(logoutUserRequest(AuthService.getAuthDetail().email) as any);
    navigate(ROUTE_URL.HOME);
  };

  const updateAuthYear = (newYear: string) => {
    try {
      const stored = localStorage.getItem('authObj');
      if (stored) {
        const authObj = JSON.parse(stored);
        authObj.year = newYear;
        localStorage.setItem('authObj', JSON.stringify(authObj));
      }
    } catch (error) {
      console.error('Failed to update authObj:', error);
    }
    setSelectedYear(newYear);
  };

  return (
    <AuthResolver>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
            <div className='flex items-center gap-2 px-4 justify-between w-full'>
              <div className='flex items-center gap-2 px-4'>
                <SidebarTrigger className='-ml-1' />
                <Separator orientation='vertical' className='mr-2 h-4' />
              </div>

              <div className='flex items-center justify-between gap-4'>
                <div>
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className='p-2 hover:bg-gray-100 rounded'
                  >
                    <LogOut className='w-5 h-5 text-gray-700' />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
            <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'>
              <Outlet />
            </div>
          </div>

          {/* Centered Popup Modal */}
          {showPopup && (
            <>
              {/* Overlay */}
              <div
                className='fixed inset-0 bg-black/30 backdrop-blur-sm z-40'
                onClick={() => setShowPopup(false)}
              />
              {/* Modal */}
              <div className='fixed inset-0 z-50 flex items-center justify-center'>
                <div className='bg-white border rounded-lg shadow-lg p-5 w-80 space-y-4 relative'>
                  <h2 className='text-lg font-semibold text-center'>
                    Select Academic Year
                  </h2>
                  <div>
                    <select
                      id='year-select'
                      className='border px-2 py-1 rounded text-sm w-full'
                      value={selectedYear}
                      onChange={(e) => updateAuthYear(e.target.value)}
                    >
                      {years.map((year) => {
                        const formatted = `${year}-${String(year + 1).slice(
                          -2,
                        )}`;
                        return (
                          <option key={year} value={formatted}>
                            {formatted}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      updateAuthYear(selectedYear); // Save year to localStorage and state
                      setShowPopup(false); // Close the popup
                      window.location.reload();
                    }}
                    className='w-full bg-green-600 text-white text-sm py-1.5 rounded hover:bg-green-700 transition'
                  >
                    Search
                  </button>
                </div>
              </div>
            </>
          )}

          {showLogoutConfirm && (
            <div className='fixed inset-0 z-50 flex items-center justify-center  bg-black/30  backdrop-blur-sm'>
              <div className='bg-white rounded-lg p-6 w-[300px] shadow-lg'>
                <h2 className='text-lg font-semibold mb-4'>Confirm Logout</h2>
                <p className='text-sm text-gray-700 mb-6'>
                  Are you sure you want to logout?
                </p>
                <div className='flex justify-end gap-2'>
                  <button
                    className='px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300'
                    onClick={() => setShowLogoutConfirm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className='px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700'
                    onClick={onLogoutClick}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </SidebarInset>
      </SidebarProvider>
    </AuthResolver>
  );
}
