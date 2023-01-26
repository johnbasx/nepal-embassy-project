import '../styles/globals.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useState } from 'react';

import AdminLayout from '@components/admin/layout/Layout';
import type { AppProps } from 'next/app';
import CitizenLayout from '@components/citizen/layout/Layout';
import Head from 'next/head';
import Login from './login';
import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import WithoutAuthLayout from '@components/common/Layout';
import authStore from '@store/useAuthStore';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const { token, isAuthenticated } = authStore();
  const [auth, setAuth] = useState<Boolean>(false);
  const router = useRouter();
  const admin_root_path = '/embassy-employee/';
  const citizen_root_path = '/citizen/';

  useEffect(() => {
    setAuth(isAuthenticated);
  }, []);

  if (router.pathname.includes(admin_root_path)) {
    return (
      <QueryClientProvider client={queryClient}>
        <NextNProgress />
        <AdminLayout>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
          </Head>
          <Component {...pageProps} />
        </AdminLayout>
      </QueryClientProvider>
    );
  } else if (router.pathname.includes(citizen_root_path)) {
    return (
      <QueryClientProvider client={queryClient}>
        <NextNProgress />
        <CitizenLayout>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
          </Head>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </CitizenLayout>
      </QueryClientProvider>
    );
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <NextNProgress />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  }
}

export default MyApp;
