'use client'
import { Song } from '@/lib/types';
import React from 'react';
import SongItem from './SongItem';

interface NewestContentPageProps {
  // You can define any props needed here
  songs:Song[]
}

const NewestContent = ({ 
  songs
}: NewestContentPageProps) => {
  
  if(songs) {
    if(songs.length === 0) {
      return (
        <div className='mt-4 text-white text-lg'>
          No Songs Available
        </div>
      )
    }
  }else {
    return
  }
  const onClick = (id:string) => {

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
            onClick={onClick}
          />
        ))
      }
    </div>
  );
};

export default NewestContent;