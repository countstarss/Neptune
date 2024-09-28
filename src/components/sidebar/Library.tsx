'use client'
import React from 'react';
import FlexBox from '../global/ColBox';
import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import { useAuthModal } from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import AuthModal from '../modal/AuthModal';
import { useUploadModal } from '@/hooks/useUploadModal';
import { Song } from '@/lib/types';
import MeidaItem from './LibraryItem';
import LibraryItem from './LibraryItem';

interface Props {
  // You can define any props needed here
  songs: Song[]

}

const Library = ({
  songs
}: Props) => {
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()


  const { user } = useUser()

  const onClick = () => {
    if (!user) {
      return authModal.onOpen()
    }
    console.log('ONCLICK')

    return uploadModal.onOpen()
  }

  return (
    // MARK: Library
    // TODO: Library下面添加一个Selector，用来选择内容的类型： 专辑、歌手、歌单、电台、收藏、曲风
    // TODO: 和小尺寸的Selector保持一致，使用全局的状态
    <>
      <AuthModal />
      <FlexBox>
        <div className='inline-flex items-center justify-between px-5 pt-4 w-full'>
          <div className='inline-flex items-center gap-x-2 w-full'>
            <TbPlaylist className='text-neutral-400' size={26} />
            <h1 className='
            text-neutral-400
            font-medium
            text-md
          '>
              Your Library
            </h1>
          </div>
          <AiOutlinePlus
            size={26}
            onClick={() => onClick()}
            className='text-neutral-400
            cursor-pointer
            hover:text-white
            transition
          '
          />
        </div>
      </FlexBox>
      {/* 
      // MARK: MeidaItem 
      */}
      <div className='flex flex-col flex-rowgap-y-2 mt-4 px-3 text-white gap-1'>
        {
          songs.map((item) => (
            <LibraryItem
              onClick={() => { }}
              key={item.id}
              data={item}
              className='hover:scale-105
                hover:bg-neutral-700
                  transition
                  origin-left'
            />
          ))
        }
      </div>
    </>
  );
};

export default Library;