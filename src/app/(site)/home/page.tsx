import { getSongs } from '@/actions/getSongs';
import React, { useEffect, useState } from 'react';
import NewestContent from './_components/NewestContent';
import Link from 'next/link';
import LikedSongs from './_components/LikedSongs';

interface Props {
  // You can define any props needed here
  
}

// MARK: 首页所有内容
export const HomePage: React.FC<Props> = async ({
  
}) => {
  const songs = await getSongs()
  return (
    < div className='mt-2 mb-7 px-6' >
      {/* 
      // MARK: Liked Songs
       */}
      <LikedSongs />

      {/* 
      MARK: Newest Songs 
      */}
      <div className='flex justify-between items-center'>
        <h1 className='text-white text-3xl font-semibold'>
          Newest Songs
        </h1>
        <Link
          href={`/home/newest`}
          className='text-white text-sm font-semibold'>
          All -&gt;
        </Link>
      </div>
      <NewestContent songs={songs} />
    </div >
  );
};

export default HomePage;



