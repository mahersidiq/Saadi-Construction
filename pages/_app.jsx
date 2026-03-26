import '@/styles/globals.css';
import Layout from '@/components/layout/Layout';
import Toast from '@/components/ui/Toast';
import { ToastProvider, useToastContext } from '@/contexts/ToastContext';

function AppContent({ Component, pageProps }) {
  const { toasts, removeToast } = useToastContext();

  // Support per-page layout overrides.
  // Pages can export: PageComponent.getLayout = (page) => page;
  // Admin pages set getLayout to skip the public Layout wrapper.
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      {getLayout(<Component {...pageProps} />)}
      <Toast toasts={toasts} removeToast={removeToast} />
    </>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <ToastProvider>
      <AppContent Component={Component} pageProps={pageProps} />
    </ToastProvider>
  );
}
