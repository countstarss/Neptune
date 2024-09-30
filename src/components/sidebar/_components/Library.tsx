'use client'
import React from 'react';
import AuthModal from '../../modal/AuthModal';
import { Song } from '@/lib/types';
import LibraryItem from './LibraryItem';
import useOnPlay from '@/hooks/useOnPlay';
import { cn } from '@/lib/utils';
import { usePlayer } from '@/hooks/usePlayer';
import LibrarySwitcher from './library-switcher';
import { categories } from '@/lib/categories';
import { useLibraryContext } from '@/hooks/useLibraryContext';

interface Props {
  // You can define any props needed here
  userSongs?: Song[]
  userLikedSongs?:Song[]
  // userAlbum?:[Song[]]
}

const Library = ({
  // userSongs
}: Props) => {

  const player = usePlayer()
  const { filteredSongs } = useLibraryContext();
  const onPlay = useOnPlay(filteredSongs)

  // 这里传入的多种数据，根据LibrarySwitcher中选择的category来找到要使用的数据
  // userSongs将来替换成我们切换后的数据，然后map生成下面的所有项目


  return (
    // MARK: Library
    <>
      <div className='px-2 pt-2'>
        <LibrarySwitcher 
          categories={categories}
        />
      </div>
      <div className='flex flex-col h-[77vh] absolute top-16 overflow-scroll'>
        <AuthModal />
        {/* 
        // MARK: LibraryItem 
        */}
        <div className='flex flex-col flex-rowgap-y-2 px-4 text-white gap-1 mt-4 items-center mx-1'>
          {
            filteredSongs.map((item) => (
              <LibraryItem
                onClick={(id: string) => onPlay(item.id)}
                key={item.id}
                data={item}
                className={cn(`hover:scale-105 hover:bg-neutral-700 transition origin-left select-none`,
                  player.activeId === item.id && "scale-105 bg-neutral-700"
                )}
              />
            ))
          }
        </div>
      </div>
    </>
  );
};

export default Library;