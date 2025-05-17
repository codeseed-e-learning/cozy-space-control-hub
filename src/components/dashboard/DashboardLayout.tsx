
import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout() {
  const isMobile = useIsMobile();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && mobileSidebarOpen) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
          setMobileSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, mobileSidebarOpen]);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Check if user is logged in - this will be improved later
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen">
      <div id="sidebar">
        <Sidebar 
          isMobile={isMobile} 
          toggleMobileSidebar={toggleMobileSidebar}
          collapsed={sidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
      </div>
      
      <div className={`flex flex-col flex-1 transition-all duration-300 ${!isMobile ? (sidebarCollapsed ? 'ml-20' : 'ml-64') : 'ml-0'}`}>
        <Header toggleMobileSidebar={toggleMobileSidebar} />
        
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      
      <Toaster />
    </div>
  );
}
