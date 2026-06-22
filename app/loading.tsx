'use client';

import { useEffect } from 'react';
import PageLoader from '@/components/PageLoader';

export default function HomeLoading() {
  useEffect(() => {
    sessionStorage.setItem('msl-nav-start', String(Date.now()));
  }, []);

  return <PageLoader />;
}
