import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';
import { useState } from 'react';

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <div className="flex-1 flex flex-col">
        <Header onOpenSidebar={handleOpenSidebar} />
        <main className="transition-all pt-4 px-2 md:px-6 md:pt-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 