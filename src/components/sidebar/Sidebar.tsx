'use client'
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import Box from './SideBox';
import Library from './Library';
import SideBarItem from './SideBarItem';
import { Song } from '@/lib/types';

interface SidebarProps {
  // You can define any props needed here
  children:React.ReactNode
  userSongs:Song[]
}

const Sidebar: React.FC<SidebarProps> = ({ 
  children,
  userSongs
}) => {
  const pathName = usePathname()
  const routes = useMemo(() => [
    {
      icon:HiHome,
      label:'Home',
      active:pathName === '/home',
      href:'/'
    },
    {
      icon:BiSearch,
      label:'Search',
      active:pathName === '/search',
      href:'/search'
    },
  ],[pathName])

  return (
    <div className='flex h-full'>
      <div className='hidden
        md:flex
        flex-col
        gap-y-2
        bg-black
        h-full
        w-[280px]
        p-2
      '>
        <Box>
          <div className='flex flex-col gap-y-4 px-5 py-4'>
            {
              routes.map((route) => (
                <SideBarItem 
                  key={route.label}
                  {...route}
                />
              ))
            }
          </div>
        </Box>
        <Box className='overflow-y-auto h-full relative'>
          <Library songs={userSongs}/>
        </Box>
      </div>
      {/* 
      //MARK: Right/Main
      //INFO: Right/Main
      */}
      <main className='h-full flex-1 overflow-y-auto py-2 md:pl-0 px-2'>
        {children}
      </main>
    </div>
  );
};

export default Sidebar;