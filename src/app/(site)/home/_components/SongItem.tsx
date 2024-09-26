'use client'
import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/lib/types';
import Image from 'next/image';
import React from 'react';
import PlayButton from './PlayButton';
import Link from 'next/link';

interface SongItemProps {
  // You can define any props needed here
  song:Song;
  onClick:(id:string) => void;
}

const SongItem: React.FC<SongItemProps> = ({
  song,
  onClick
}) => {

  const imagePath = useLoadImage(song)

  return (
    <div
      onClick={() => onClick}
      className='
        relative
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-400/5
        hover:bg-neutral-400/10
        transition
        p-2
      '
    >
      <div className='
        group
        relative
        aspect-square
        w-full
        h-full
        rounded-md
        overflow-hidden
      '>
        <Image
          src={imagePath || '/images/liked.png'}
          fill
          alt={song.title}
        ></Image>
        <div className='absolute bottom-2 right-2'>
          <PlayButton />
        </div>
      </div>
      <div className='
        flex flex-col
        items-start
        w-full p-1 gap-y-1
      '>
        <Link
          href={`/search/song/${song.title}`}
          className='text-white font-semibold pt-1 w-full truncate'
        >
          {song.title}
        </Link>
        <Link
          href={`/search/singer/${song.author}`}
          className='text-neutral-400 text-sm pb-1 w-full truncate'
        >
          By {song.author}
        </Link>
      </div>
      
    </div>
  );
};

export default SongItem;