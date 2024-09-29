'use client'
import LikedButton from '@/app/(site)/search/_components/LikedButton';
import { useUser } from '@/hooks/useUser';
import { Song } from '@/lib/types';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import LikedContentImage from './LikedContentImage';

interface LikedContentProps {
  // You can define any props needed here
  songs:Song[]
}

const LikedContent: React.FC<LikedContentProps> = ({
  songs
}) => {

  const router = useRouter()
  const { isLoading,user }  = useUser()


  // INFO: 如果没有user，就返回首页
  useEffect(() => {
    if(!isLoading && !user) {
      router.replace('/')
    }
  },[user,isLoading,router])

  if(songs.length === 0) {
    return (
      <div className='flex flex-col gap-y-2 mt-10'>
        <h1 className='text-xl text-white items-center'>No liked Songs</h1>
      </div>
    )
  }

  
  // MARK: LikedContent
  return (
    <div className='flex flex-col gap-y-2 mt-10'>
      {
        songs.map((song) => (
          <div 
            key={song.id}
            onClick={()=>{}}
            className='
              flex 
              gap-2
              p-2 w-full
              bg-neutral-800
              rounded-xl
              cursor-pointer
              justify-between
              border
              border-neutral-700
              border-opacity-0
              hover:border-opacity-80
              transition
            '>
              <div className='flex flex-row gap-x-3'>
                <LikedContentImage song={song}/>
                <div className='flex flex-col items-start justify-start text-white'>
                  <p className='font-semibold truncate'>{song.title}</p>
                  <p className='font-light truncate'>{song.author}</p>
                </div>
              </div>
              <LikedButton song={song} />
          </div>
        ))
      }
    </div>
  );
};

export default LikedContent;