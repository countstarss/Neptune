import { getSongs } from '@/actions/getSongs';
import React, { useEffect, useState } from 'react';
import NewestContent from './_components/NewestContent';
import Link from 'next/link';
import LikedSongs from './_components/LikedSongs';

interface Props {
  // You can define any props needed here
  
}

export const HomePage: React.FC<Props> = async ({
  
}) => {
  const songs = await getSongs()
  return (
    // MARK: Newest Songs
    < div className='mt-2 mb-7 px-6' >
      <LikedSongs />
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



