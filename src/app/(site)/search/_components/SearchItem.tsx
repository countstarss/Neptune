'use client'
import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/lib/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import LikedButton from './LikedButton';
import { getLikedSongs } from '@/actions/getLikedSongs';

interface MeidaItemProps {
  // You can define any props needed here
  onClick?:(id:string) => void;
  data:Song;
}

const SearchItem: React.FC<MeidaItemProps> = ({
  onClick,
  data
}) => {

  const [likedSongs, setLikedSongs] = useState<string[]>([]); // 存储已喜欢歌曲的 ID 列表

  
  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const liked = await getLikedSongs(); // 从数据库获取已喜欢的歌曲
        setLikedSongs(liked.map(song => song.id));
      } catch (error) {
        console.error('Error fetching liked songs:', error);
      }
    };

    fetchLikedSongs();
  }, []);

  // 更新 likedSongs 的回调函数
  const handleLikeToggle = (songId: string, isLiked: boolean) => {
    setLikedSongs(prev => {
      if (isLiked) {
        return prev.filter(id => id !== songId); // 取消喜欢
      } else {
        return [...prev, songId]; // 添加喜欢
      }
    });
  };


  // MARK: useLoadImage
  const imageUrl = useLoadImage(data)
  const handleClick = () => {
    if(onClick) {
      return onClick(data.id)
    }
  }

  // TODO: 添加一个播放动效 ： 点击之后从惦记的地方出现一个Mac的神奇效果，覆盖到主页面，进行播放

  // hover:scale-105
  return (
    <div 
      onClick={handleClick}
      className='
        select-none
        flex 
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
    '>
      <div className='flex flex-row gap-x-2'>
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
            src={imageUrl || '/images/like.png'}
            alt='Midia image'
            className='object-cover'
          />
        </div>
        <div className='flex flex-col items-start justify-start text-white w-[100px]'>
          <p className='font-semibold truncate'>{data.title}</p>
          <p className='font-light truncate'>{data.author}</p>
        </div>
      </div>
      <LikedButton 
        song={data} 
        isLiked={likedSongs.includes(data.id)}
        onLikeToggle={handleLikeToggle}
      />
    </div>
  );
};

export default SearchItem;