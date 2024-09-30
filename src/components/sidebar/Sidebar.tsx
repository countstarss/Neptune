'use client'
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import Box from './_components/SideBox';
import Library from './_components/Library';
import SideBarItem from './_components/SideBarItem';
import { Song } from '@/lib/types';
import LibrarySwitcher from './_components/LibrarySwitcher';
import { categories } from '@/lib/categories';

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
          <div className='px-2 pt-2'>
            <LibrarySwitcher 
              categories={categories}
            />
          </div>
          
          {/* 
          // MARK: 把用户的songs，专辑，收藏，等等分类上传，也就是说全部获取一遍
          // MARK: 专辑是多个Song[],结构不同
          */}
          <Library 
            userSongs={userSongs}
          />
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