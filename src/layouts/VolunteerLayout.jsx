import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { LayoutDashboard, Users, LogOut, ChevronDown, Menu, UserCircle, ClipboardList, Tv } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import ThemeToggle from '@/components/ThemeToggle';

const VolunteerSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(state => state.auth.user);
  const { state } = useSidebar();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/volunteer/login');
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/volunteer/dashboard"
    },
    {
      title: "Sessions",
      icon: Tv,
      href: "/volunteer/sessions"
    }
  ];

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src="/volunteer-avatar.png" alt="Volunteer" />
            <AvatarFallback>VL</AvatarFallback>
          </Avatar>
          {state === "expanded" && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate">{user?.name || 'Volunteer'}</span>
              <span className="text-xs text-muted-foreground truncate">Volunteer</span>
            </div>
          )}
        </div>
        <ThemeToggle />
      </SidebarHeader>

      <SidebarContent className="p-2">
        <nav className="grid gap-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive && "bg-accent text-accent-foreground font-medium",
                  state === "collapsed" && "justify-center"
                )}
                title={state === "collapsed" ? item.title : undefined}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {state === "expanded" && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-2">
        {state === "expanded" ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 px-2"
              >
                <Avatar className="h-5 w-5 shrink-0">
                  <AvatarImage src="/volunteer-avatar.png" alt="Volunteer" />
                  <AvatarFallback>VL</AvatarFallback>
                </Avatar>
                <span className="truncate">{user?.name || 'Volunteer'}</span>
                <ChevronDown className="ml-auto h-4 w-4 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              alignOffset={-20}
              className="w-[180px]"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/volunteer/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="w-full"
            title="Log out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

const VolunteerLayout = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-background">
        <VolunteerSidebar />
        
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 shrink-0">
            <SidebarTrigger className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              <Menu className="h-4 w-4" />
            </SidebarTrigger>
            <Separator orientation="vertical" className="h-6" />
            <div className="font-semibold">Volunteer Dashboard</div>
          </header>
          
          <main className="flex-1 overflow-auto">
            <div className="h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default VolunteerLayout;