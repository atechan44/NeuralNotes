import { Outlet } from 'react-router-dom';

/**
 * Ana sayfa düzeni bileşeni
 * Minimal sidebar ve boş içerik alanı
 */
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sol kenar çubuğu - Minimal */}
      <div className="fixed top-0 left-0 h-full w-14 bg-[#111111] z-10 flex flex-col items-center py-4">
        {/* Hamburger menü ikonu */}
        <button className="p-2 mb-6">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Dosya ikonu */}
        <button className="p-2 mb-4">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </button>
        
        {/* Klasör ikonu */}
        <button className="p-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </button>
      </div>

      {/* Ana içerik - Sol kenar çubuğu genişliği kadar margin bırakılıyor */}
      <main className="ml-14">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
