'use client'
import React from 'react';
import AuthModal from '../../modal/AuthModal';
import { Song } from '@/lib/types';
import LibraryItem from './LibraryItem';
import useOnPlay from '@/hooks/useOnPlay';
import { cn } from '@/lib/utils';
import { usePlayer } from '@/hooks/usePlayer';

interface Props {
  // You can define any props needed here
  userSongs: Song[]
  userLikedSongs?:Song[]
  // userAlbum?:[Song[]]
}

const Library = ({
  userSongs
}: Props) => {

  const player = usePlayer()
  const onPlay = useOnPlay(userSongs)

  return (
    // MARK: Library
    // TODO: Library下面添加一个Selector，用来选择内容的类型： 专辑、歌手、歌单、Liked
    // TODO: 和小尺寸的Selector保持一致，使用全局的状态
    <>
      <div className='flex flex-col h-[77vh] absolute top-16 overflow-scroll'>
        <AuthModal />
        {/* 
        // MARK: LibraryItem 
        */}
        <div className='flex flex-col flex-rowgap-y-2 px-4 text-white gap-1 mt-4 items-center mx-1'>
          {
            userSongs.map((item) => (
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