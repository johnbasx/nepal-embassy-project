import React, { useEffect, useState } from 'react';

import HeadNav from './HeadNav';
import SideBar from './SideBar';
import authStore from '@store/useAuthStore';
import { useRouter } from 'next/router';
import Head from 'next/head';
import pageTitleStore from '@store/selectUsersStore';

const Layout = ({ children }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { token } = authStore();
  const { title } = pageTitleStore();

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, []);

  // if (!token) {
  //   return <></>;
  // } else {
  return (
    <div className="overflow-hidden ">
      <Head>
        <title>{title} | NOC - Embassy of Nepal</title>
      </Head>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col min-h-screen md:pl-64 ">
        <HeadNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 bg-gray-100">{children}</main>
      </div>
    </div>
  );
};
// };

export default Layout;
