import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from './config/constants';

// Lazy-loaded bileşenler
const MainLayout = lazy(() => import('./layouts/MainLayout'));

// Sayfa lazy imports
const Home = lazy(() => import('./pages/Home'));
const NotePage = lazy(() => import('./pages/NotePage'));

/**
 * Ana uygulama bileşeni.
 * - Tema kontrolü
 * - Routing
 * - i18n desteği
 */
function App() {
  const { t } = useTranslation();

  return (
    <Suspense fallback={<div className="flex-center h-screen w-screen">{t('common.loading')}</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.NOTE} element={<NotePage />} />
          <Route path="*" element={
            <div className="flex-center h-[80vh] flex-col gap-4">
              <h1 className="text-2xl font-bold">404</h1>
              <p>{t('common.error')}</p>
            </div>
          } />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
