import { Song } from '@/lib/types';
import React from 'react';
import { BiPlay } from 'react-icons/bi';
import { FaPlay } from 'react-icons/fa6';

interface PlayButtonProps {
  // You can define any props needed here
  onClick:(id:string) => void;
  song:Song
}

const PlayButton: React.FC<PlayButtonProps> = ({
  onClick,
  song
}) => {
  return (
    <div 
      onClick={() => onClick(song.id)}
      className='
        transition 
        rounded-full
        flex
        items-center
        justify-center
        bg-green-500/30
        p-3
        pl-[14px]
        mr-[2px]
        grop-shadow-md
        right-5
        group-hover:bg-green-500
        group-hover:scale-110
        group-hover:opacity-100
        cursor-pointer
      '>
        <FaPlay className='text-black items-center justify-center' size={20}/>
      </div>
  );
};

export default PlayButton;