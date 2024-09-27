import { getSongs } from '@/actions/getSongs';
import Header from '@/components/header/Header';
import ListItem from '@/components/ListItem';
import { Song } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import NewestContent from './_components/NewestContent';
import Link from 'next/link';

interface LayoutProps {
  // You can define any props needed here
  songs: Song[];
  children?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = async ({
  songs,
  children
}) => {


  return (
    <div className='
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    '>
      <div className='mt-2 mb-7 px-6' >
        {children}
      </div>
    </div>
  );
};

export default Layout;