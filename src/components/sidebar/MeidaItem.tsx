import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/lib/types';
import Image from 'next/image';
import React from 'react';

interface MeidaItemProps {
  // You can define any props needed here
  onClick?:(id:string) => void;
  data:Song;
}

const MeidaItem: React.FC<MeidaItemProps> = ({
  onClick,
  data
}) => {

  const imageUrl = useLoadImage(data)
  const handleClick = () => {
    if(onClick) {
      return onClick(data.id)
    }
  }

  // TODO: 添加一个播放动效 ： 点击之后从惦记的地方出现一个Mac的神奇效果，覆盖到主页面，进行播放

  return (
    <div 
      onClick={handleClick}
      className='
        flex 
        gap-2
        p-2 w-full
        bg-neutral-800
        rounded-xl
        cursor-pointer
        justify-start
        hover:scale-105
        hover:bg-neutral-700
        transition
        origin-left
    '>
      <div className='
        relative
        rounded-md
        min-h-[48px]
        min-w-[48px]
        overflow-hidden
      '>
        <Image
          fill
          src={imageUrl || '/images/liked.png'}
          alt='Midia image'
          // className='object-cover'
        />
      </div>
      <div className='flex flex-col items-center justify-start'>
        <p className='font-semibold'>{data.title}</p>
        <p className='font-light'>{data.author}</p>
      </div>
    </div>
  );
};

export default MeidaItem;