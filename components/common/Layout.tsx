import React, { useEffect, useState } from 'react';

import authStore from '@store/useAuthStore';
import { useRouter } from 'next/router';

const Layout = ({ children }: any) => {
  const { token } = authStore();
  const router = useRouter();
  const [toCheck, setToCheck] = useState('');

  useEffect(() => {
    setToCheck(token);
    if (toCheck != '') {
      router.push('/citizen/profile');
    }
  }, [toCheck]);

  //   useEffect(() => {
  //     if (!toCheck) {
  //       router.push('/citizen/profile');
  //     }
  //   }, []);

  if (toCheck == '') {
    return <div>{children}</div>;
  } else {
    return <React.Fragment></React.Fragment>;
  }
};

export default Layout;
