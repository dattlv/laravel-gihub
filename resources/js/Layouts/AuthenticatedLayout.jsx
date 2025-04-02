import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Sidebar from '@/components/UI/Sidebar';
import Navbar from '@/components/UI/Navbar';

export default function AuthenticatedLayout({ header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    // Lấy giá trị từ localStorage khi khởi tạo
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const user = usePage().props.auth.user;

  // Lưu trạng thái vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem(
      'sidebarCollapsed',
      JSON.stringify(isSidebarCollapsed),
    );
  }, [isSidebarCollapsed]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        user={user}
        showingNavigationDropdown={showingNavigationDropdown}
        setShowingNavigationDropdown={setShowingNavigationDropdown}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'md:pl-16' : 'md:pl-64'}`}
      >
        {header && (
          <header className="bg-white shadow">
            <div className="w-full px-4 py-6 sm:px-6 lg:px-8">{header}</div>
          </header>
        )}

        <main className="flex-1">
          <div className="w-full px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
