import * as React from 'react';
import {
  LayoutDashboard,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { ROUTE_URL } from '@/constant/routes.const';
import { useSelector } from 'react-redux';
import { AppState } from '@/store/reducer/root.reducer';
import { ADMIN } from '@/constant/global-key.const';

const data = {
  user: {
    name: '',
    email: '',
    avatar: '',
  },
  navMain: [
    {
      title: 'Book',
      url: ROUTE_URL.ADMIN.BOOK.LIST,
      icon: LayoutDashboard,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const loginUser = useSelector((state: AppState) => state.auth.result);
  const userRole = loginUser?.roleName || '';

  const getFilteredNavItems = (item: any) => {
    return data.navMain?.filter(() => {
      console.log(item);
      
      // Exclude for "User" role
      return true;
    });
  };

  const userData = {
    name: '',
    email: loginUser?.email || '',
    role: loginUser?.roleName || '',
    avatar: '/avatars/shadcn.jpg',
  };

  // State to manage Settings toggle
  const [isSettingsExpanded, setIsSettingsExpanded] = React.useState(false);
console.log(isSettingsExpanded)

  const handleSettingsClick = () => {
    setIsSettingsExpanded((prev) => !prev);
  };

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent>
        {getFilteredNavItems(userRole).map((item) => (
          <NavMain
            key={item.title}
            items={[
              {
                title: item.title,
                url: item.url,
                icon: item.icon,
              },
            ]}
          />
        ))}

        {/* Render Settings Toggle only for Admin */}
        {userRole === ADMIN && (
          <>
            <div
              onClick={handleSettingsClick}
              style={{
                padding: '10px 15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '4px',
                transition: 'background-color 0.2s ease',
              }}
            ></div>
          </>
        )}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
