/**
 * App — Root component with routing and providers.
 */
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ConverterView from './pages/ConverterView';

export default function App() {
  return (
    <ThemeProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '12px',
            background: 'var(--toast-bg, #fff)',
            color: 'var(--toast-color, #0f172a)',
            border: '1px solid var(--toast-border, rgba(0,0,0,0.05))',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            fontSize: '14px',
            fontWeight: 500,
          },
        }}
      />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="convert/:categoryId" element={<ConverterView />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  );
}
