import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/lib/types';
import Image from 'next/image';
import React from 'react';

interface MeidaItemProps {
  // You can define any props needed here
  onClick?:(id:string) => void;
  data:Song;
}

const LibraryItem: React.FC<MeidaItemProps> = ({
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
        gap-3
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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  // 响应式布局下的图片大小
          src={imageUrl || '/images/liked.png'}
          alt='Midia image'
          // className='object-cover'
        />
      </div>
      <div className='flex flex-col justify-start items-start'>
        <h1 className='font-semibold'>{data.title}</h1>
        <h1 className='font-light'>{data.author}</h1>
      </div>
    </div>
  );
};

export default LibraryItem;