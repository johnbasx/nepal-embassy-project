import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import authStore from '@store/useAuthStore';

type Props = string | undefined | null;

const Home: NextPage = () => {
  const router = useRouter();
  const { token } = authStore();

  useEffect(() => {
    if (token != '') {
      router.push('/citizen/profile');
    } else router.push('/login');
  }, [token]);
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* <SideBar/> */}
        <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
          {/* <Header /> */}
          <main>
            <h1 className="text-3xl font-bold text-red-300 underline">
              Hello world!
            </h1>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
