'use client'
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import { BiHome, BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import Box from './SideBox';
import Library from './Library';
import SideBarItem from './SideBarItem';

interface SidebarProps {
  // You can define any props needed here
  children:React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathName = usePathname()
  const routes = useMemo(() => [
    {
      icon:BiHome,
      label:'Sudo Home',
      active:pathName === '/',
      href:'/'
    },
    {
      icon:HiHome,
      label:'Home',
      active:pathName === '/home',
      href:'/home'
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
        <Box className='overflow-y-auto h-full'>
          <Library />
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