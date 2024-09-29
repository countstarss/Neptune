import { useState, useEffect } from 'react';
import { getLikedSongs } from '@/actions/getLikedSongs';
import { Song } from '@/lib/types';

// 定义自定义 Hook
const useLikedSongs = (songs: Song[] | Song) => {
  const [likedSongs, setLikedSongs] = useState<string[]>([]); // 存储用户喜欢的歌曲ID

  // MARK: SetupSongs
  useEffect(() => {
    const setUpSongs = async () => {
      try {
        
        const likedSongsFromDB = await getLikedSongs(); // 获取用户喜欢的歌曲
        setLikedSongs(likedSongsFromDB.map(song => song.id)); // 将喜欢的歌曲ID存储
      } catch (error) {
        console.error('Error fetching liked songs:', error);
      }
    };

    setUpSongs();
  }, [songs]);

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

  // 返回需要的状态和函数
  return {
    likedSongs,
    handleLikeToggle,
  };
};

export default useLikedSongs;