import { getSongs } from '@/actions/getSongs';
import Header from '@/components/header/Header';
import ListItem from '@/components/ListItem';
import { useUser } from '@/hooks/useUser';
import { Song } from '@/lib/types';
import { User } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useState } from 'react';
import NewestContent from './_components/NewestContent';

interface Props {
  // You can define any props needed here
  songs: Song[]
}

export const HomePage: React.FC<Props> = async ({
  songs
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

      <Header>
        <div className='mb-2'>
          <h1 className='
            text-white
            text-3xl
            font-semibold
            '>Welcome Back</h1>

          <div className='
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-3
            mt-4
            '>
            <ListItem
              image="/public/like.png"
              name="Liked"
              href="liked"
            />
            <ListItem
              image="/public/like.png"
              name="Liked"
              href="liked"
            />
            <ListItem
              image="/public/like.png"
              name="Liked"
              href="liked"
            />
            <ListItem
              image="/public/like.png"
              name="Liked"
              href="liked"
            />
          </div>
        </div>
      </Header>

      {/* 
      MARK: Newest Songs
      */}
      <div className='mt-2 mb-7 px-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-white text-2xl font-semibold'>
            Newest Songs
          </h1>
        </div>

        <NewestContent songs={songs} />
      </div>
    </div>
  );
};

export default HomePage;