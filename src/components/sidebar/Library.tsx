'use client'
import React from 'react';
import FlexBox from '../global/ColBox';
import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import { useAuthModal } from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import AuthModal from '../AuthModal';
import { useUploadModal } from '@/hooks/useUploadModal';
import { Song } from '@/lib/types';
import MeidaItem from './MeidaItem';

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
            <MeidaItem
              onClick={() => { }}
              key={item.id}
              data={item}
            />
          ))
        }
      </div>
    </>
  );
};

export default Library;