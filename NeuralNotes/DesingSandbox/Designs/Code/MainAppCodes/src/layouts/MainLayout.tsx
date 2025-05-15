import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';

/**
 * MainLayout component
 * Contains the sidebar and main content area
 */
const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-1 ml-[80px]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
