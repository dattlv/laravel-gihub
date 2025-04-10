import Navbar from '@/Components/UI/Navbar';
import Sidebar from '@/Components/UI/Sidebar';
import { useState, useEffect } from 'react';

export default function Authenticated({ header, children, user }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        user={user}
        showingNavigationDropdown={showingNavigationDropdown}
        setShowingNavigationDropdown={setShowingNavigationDropdown}
        isSidebarOpen={isSidebarOpen}
      />
      <Sidebar isCollapsed={isSidebarOpen} setIsCollapsed={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${isSidebarOpen ? 'md:pl-16' : 'md:pl-64'}`}
      >
        {header && (
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              {header}
            </div>
          </header>
        )}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
