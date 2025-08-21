'use client';

import React from 'react';
import { useAuth } from '@/lib/contexts/auth-context';
import LoadingState from '@repo/ui/LoadingState';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/sign-in');
    } else if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingState showCards={false} />;
  }

  return <LoadingState showCards={false} />;
}
