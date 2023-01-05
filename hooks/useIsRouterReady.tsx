import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const useRouterIsReady = () => {
  const router = useRouter();
  const [routerIsReady, setRouterIsReady] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    setRouterIsReady(true);
  }, [router.isReady]);

  return routerIsReady;
};

export default useRouterIsReady;
