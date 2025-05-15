import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from './config/constants';

// Lazy-loaded bileşenler
const MainLayout = lazy(() => import('./layouts/MainLayout'));

// Sayfa lazy imports
const Home = lazy(() => import('./pages/Home'));
const NotePage = lazy(() => import('./pages/NotePage'));

// Placeholder pages for new routes
const NotesPage = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4">Notes Page</h1><p>This is a placeholder for the Notes page.</p></div>;
const TodoPage = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4">To-Do Page</h1><p>This is a placeholder for the To-Do page.</p></div>;
const CanvasPage = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4">Canvas Page</h1><p>This is a placeholder for the Canvas page.</p></div>;
const CalendarPage = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4">Calendar Page</h1><p>This is a placeholder for the Calendar page.</p></div>;
const AccountPage = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4">Account Page</h1><p>This is a placeholder for the Account page.</p></div>;
const SettingsPage = () => <div className="p-8"><h1 className="text-3xl font-bold mb-4">Settings Page</h1><p>This is a placeholder for the Settings page.</p></div>;

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
          <Route path="notes" element={<NotesPage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="canvas" element={<CanvasPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="settings" element={<SettingsPage />} />
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
