
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
}) {


  const getInitials = (email: string) => {
    if (!email) return 'NA';

    const words = email.trim().split(/\s+/);
    let initials = '';

    if (words.length === 1) {
      initials = words[0].slice(0, 2);
    } else {
      initials = words[0][0] + (words[1]?.[0] ?? '');
    }

    return initials.toUpperCase();
  };

  // const onLogoutClick = () => {
  //   dispatch(logoutUserRequest(AuthService.getAuthDetail().email));
  //   navigate(ROUTE_URL.LOGIN);
  // };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarFallback className='rounded-lg'>
                  {getInitials(user.email)}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                {/* <span className="truncate font-medium">{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</span> */}
                {/* <span className="truncate">{user.role}</span> */}
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                <span className='truncate text-xs'>{user.email}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
