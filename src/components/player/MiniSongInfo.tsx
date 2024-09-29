import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/lib/types';
import Image from 'next/image';
import React from 'react';
import LikedButton from '@/app/(site)/search/_components/LikedButton';
import { twMerge } from 'tailwind-merge';

interface MiniSongInfoProps {
  // You can define any props needed here
  onClick?: (id: string) => void;
  data: Song;
  className?: string
}

const MiniSongInfo: React.FC<MiniSongInfoProps> = ({
  onClick,
  data,
  className
}) => {


  const imageUrl = useLoadImage(data)
  const handleClick = () => {
    if (onClick) {
      return onClick(data.id)
    }
  }

  // TODO: 添加一个播放动效 ： 点击之后从惦记的地方出现一个Mac的神奇效果，覆盖到主页面，进行播放

  // hover:scale-105
  return (
    <div
      onClick={handleClick}
      className={twMerge(`
        gap-2
        p-2 w-full
        bg-neutral-800
        rounded-xl
        cursor-pointer
        justify-between
        border
        border-neutral-500
        border-opacity-0
        hover:border-opacity-80
        transition
    `, className)}>
      <div className='flex flex-row gap-x-2'>
        <div className='
          relative
          rounded-md
          min-h-[54px]
          min-w-[54px]
          overflow-hidden
        '>
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  // 响应式布局下的图片大小
            src={imageUrl || '/images/like.png'}
            alt='Midia image'
          className='object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default MiniSongInfo;