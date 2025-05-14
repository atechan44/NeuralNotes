import { useEffect } from 'react';
import './styles/globals.css';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import './i18n/i18n';

function App() {
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
}

export default App;
