'use client'
import { Song } from '@/lib/types';
import React from 'react';
import SongItem from './SongItem';
import useOnPlay from '@/hooks/useOnPlay';
import Link from 'next/link';

interface NewestContentPageProps {
  // You can define any props needed here
  songs: Song[]
}

const NewestContent = ({
  songs
}: NewestContentPageProps) => {


  // 
  const onPlay = useOnPlay(songs)

  if (songs) {
    if (songs.length === 0) {
      return (
        <div className='mt-4 text-white text-lg'>
          No Songs Available
        </div>
      )
    }
  }

  return (
    <div className='
      grid grid-cols-2
      sm:grid-cols--3
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-8
      gap-4
      mt-4
    '>
      {
        songs.map((song) => (
          <SongItem
            song={song}
            key={song.id}
            onClick={(id: string) => onPlay(id) }
          />
        ))
      }
    </div>
  );
};

export default NewestContent;