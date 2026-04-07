import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { NavLink, Outlet, useLocation } from "react-router";

const Layout = () => {
  const location = useLocation();
  const isActive = (path:string)=>{
    return location.pathname === path
  }
  return (
    <div className="flex">
      <SidebarProvider className="w-fit">
        <Sidebar>
          <SidebarHeader>
            <span>logo</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenuButton asChild isActive={isActive("/dashboard")} >
              <NavLink to="">Monitoring</NavLink>
            </SidebarMenuButton>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/users")}>
              <NavLink to="users">Users</NavLink>
            </SidebarMenuButton>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/virtual-desktop")} >
              <NavLink to="virtual-desktop">Virtual Desktop</NavLink>
            </SidebarMenuButton>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenuButton asChild>
              <Button>Logout</Button>
            </SidebarMenuButton>
            <span>Copyright 2024</span>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
      <Outlet />
    </div>
  );
};

export default Layout;
