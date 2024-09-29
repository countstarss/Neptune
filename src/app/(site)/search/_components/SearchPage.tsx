'use client';

import useDebounce from '@/hooks/useDebounce';
import React, { useState, useEffect } from 'react';
import { Song } from '@/lib/types';
import { Input } from '@/components/ui/input';
import LoadState from '@/components/global/LoadState';
import SearchItem from './SearchItem';
import SelectCategory from './SelectCategory';
import useOnPlay from '@/hooks/useOnPlay';
import LikedButton from './LikedButton';
import useLikedSongs from '@/hooks/useLikedSongs';
import SearchImage from './SearchImage';

const SearchInput: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');  // 输入框中的值
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);  // 防抖后的值
  const [searchResult, setSearchResult] = useState<Song[] | null>(null);  // 搜索结果
  const [loading, setLoading] = useState<boolean>(false);  // 加载状态
  const [error, setError] = useState<string | null>(null);  // 错误状态

  useEffect(() => {
    if (!debouncedSearchTerm) return;  // 如果没有搜索词则不进行请求

    // MARK: fetchSongs
    const fetchSongs = async () => {
      setLoading(true);
      setError(null);
      setSearchResult(null)
      try {
        const response = await fetch(`/api/songs?title=${debouncedSearchTerm}`);
        if (!response.ok) {
          throw new Error('Error fetching songs');
        }
        const data = await response.json();
        setSearchResult(data);
      } catch (error) {
        setError(`${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [debouncedSearchTerm]);


  const { likedSongs, handleLikeToggle } = useLikedSongs(searchResult!);
  const onPlay = useOnPlay(searchResult!)

  return (
    <div className='w-full'>
      <div className='flex flex-row items-start'>
        <Input
          type="text"
          size={30}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}  // 更新输入框值
          placeholder="Search for songs..."
          className='
            text-white text-xl outline-none  border-slate-200 border-[2px] 
            lg:w-1/2 w-full h-14 rounded-3xl'
        />
        <SelectCategory />
      </div>
      {loading && <LoadState state='Loading...' />}  {/* 显示加载状态 */}
      {error && <LoadState state='Error' />}  {/* 显示错误信息 */}
      {searchResult && searchResult.length > 0 ? (
        <div className='
          grid grid-cols-1
          md:grid-cols-2
          2xl:grid-cols-3
          gap-4
          mt-4
        '>
          {searchResult.map((song) => (
            // MARK: SearchItem
            <SearchItem
              key={song.id}
              data={song}
            >
              <div
                onClick={()=> onPlay(song.id)}
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
                  <SearchImage song={song}/>
                  <div className='flex flex-col items-start justify-start text-white w-[100px]'>
                    <p className='font-semibold truncate'>{song.title}</p>
                    <p className='font-light truncate'>{song.author}</p>
                  </div>
                </div>
                <LikedButton
                  song={song}
                  isLiked={likedSongs.includes(song.id)}
                  onLikeToggle={handleLikeToggle}
                />
              </div>


            </SearchItem>
          ))}
        </div>

      ) : (
        !loading && <LoadState state='No Result Found' />  // 显示无结果的情况
      )}
    </div>
  );
};

export default SearchInput;