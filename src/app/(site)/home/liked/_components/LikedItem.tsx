import { getLikedSongs } from '@/actions/getLikedSongs';
import { Song } from '@/lib/types';
import React, { useEffect, useState } from 'react'
import LikedContentImage from './LikedContentImage';
import LikedButton from '@/app/(site)/search/_components/LikedButton';
import { BsPlayCircleFill } from 'react-icons/bs';

type LikedItemProps = {
  song:Song;
  onClick: (id:string) => void;
}

const LikedItem = ({ song,onClick }: LikedItemProps) => {

  // const [localSongs, setLocalSongs] = useState<Song[]>([]);
  const [likedSongs, setLikedSongs] = useState<string[]>([]); // 存储已喜欢歌曲的 ID 列表

  //MARK: SetupSongs
  useEffect(() => {
    const setUpSongs = async () => {
      try {
        // setLocalSongs(songs)
        const likedSongs = await getLikedSongs(); // 获取用户喜欢的歌曲
        setLikedSongs(likedSongs.map(song => song.id)); // 将喜欢的歌曲ID存储
      } catch (error) {
        console.error('Error fetching songs or liked songs:', error);
      }
    };
    setUpSongs();
  }, []);

  // MARK: handleLikeToggle
  const handleLikeToggle = (songId: string, isLiked: boolean) => {
    setLikedSongs(prev => {
      if (isLiked) {
        return prev.filter(id => id !== songId); // 如果已经喜欢，则取消喜欢
      } else {
        return [...prev, songId]; // 如果未喜欢，则添加到喜欢列表
      }
    });
  };
  return (
    <div 
      key={song.id}
      className='
        flex gap-2
        p-2 w-full
        bg-neutral-800 rounded-xl
        cursor-pointer
        justify-between border
        border-neutral-700
        border-opacity-0
        hover:border-opacity-80 transition
        select-none
      '>
        <div className='flex flex-row gap-x-3 justify-start'>
          <LikedContentImage song={song}/>
          <div className='flex flex-col items-start justify-start text-white w-[120px]'>
            <p className='font-semibold truncate'>{song.title}</p>
            <p className='font-light truncate'>{song.author}</p>
          </div>
        </div>
        <div 
          className='flex items-center justify-start w-[500px]'
        >
          <BsPlayCircleFill
            size={30} 
            className='hover:text-white transition text-white/50'
            onClick={()=>onClick(song.id)}
          />
        </div>
        <LikedButton
          isLiked = {likedSongs.includes(song.id) || true}
          song={song} 
          onLikeToggle={handleLikeToggle}
        />
    </div>
  )
}

export default LikedItem