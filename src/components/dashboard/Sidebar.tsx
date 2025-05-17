
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  History,
  User,
  Building,
  PlusSquare,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isMobile: boolean;
  toggleMobileSidebar: () => void;
  collapsed: boolean;
  toggleSidebar: () => void;
}

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: ShoppingBag,
  },
  {
    name: "Order History",
    path: "/order-history",
    icon: History,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    name: "Add New Room",
    path: "/add-room",
    icon: PlusSquare,
  },
  {
    name: "Add New Property",
    path: "/add-property",
    icon: Building,
  },
];

export function Sidebar({ isMobile, toggleMobileSidebar, collapsed, toggleSidebar }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar fixed left-0 top-0 z-30 flex flex-col border-r transition-all duration-300",
        collapsed ? "w-20" : "w-64",
        isMobile && "transform"
      )}
      style={{
        transform: isMobile ? (collapsed ? "translateX(-100%)" : "translateX(0)") : "none"
      }}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {!collapsed && (
          <Link to="/dashboard" className="text-xl font-semibold text-primary">
            PropDash
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={isMobile ? toggleMobileSidebar : toggleSidebar}
          className="ml-auto"
        >
          {isMobile ? (
            <Menu size={20} />
          ) : collapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            Property Dashboard v1.0
          </div>
        )}
      </div>
    </aside>
  );
}
