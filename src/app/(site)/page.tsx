'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';  // 使用 useRouter 进行重定向
import { useUser } from '@/hooks/useUser';    // 假设你有一个 useUser 钩子来获取用户信息
import LoadState from '@/components/global/LoadState';

export default function Home() {
  const { user, isLoading } = useUser();  // 获取用户信息
  const router = useRouter();  // 用于导航

  useEffect(() => {
    if (user) {
      // 如果用户存在，则重定向到 /home
      router.push('/home');
    }
  }, [user, router]);

  // 在用户信息加载期间显示加载状态
  if (isLoading) {
    return (
      <div className="flex h-full w-full">
        <LoadState state="Loading..." />
      </div>
    );
  }

  // 当没有用户信息时显示页面内容
  return (
    <></>
  );
}