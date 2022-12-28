import '../styles/globals.css';

import { useEffect, useState } from 'react';

import AdminLayout from '../components/admin/layout/Layout';
import type { AppProps } from 'next/app';
import CitizenLayout from '../components/citizen/layout/Layout';
import Head from 'next/head';
import Login from './login';
import WithoutAuthLayout from '@components/common/Layout';
import authStore from '@store/useAuthStore';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
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
      <AdminLayout>
        <Head>
          <meta
            name="viewport"
            content="target-densitydpi=device-dpi, initial-scale=1.0, user-scalable=no"
          />
        </Head>
        <Component {...pageProps} />;
      </AdminLayout>
    );
  } else if (router.pathname.includes(citizen_root_path)) {
    return (
      <CitizenLayout>
        <Head>
          <meta
            name="viewport"
            content="target-densitydpi=device-dpi, initial-scale=1.0, user-scalable=no"
          />
        </Head>
        <Component {...pageProps} />
      </CitizenLayout>
    );
  } else {
    return (
      // <WithoutAuthLayout>

      <Component {...pageProps} />
      // </WithoutAuthLayout>
    );
  }
}

export default MyApp;
