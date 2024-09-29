'use client'
import { useUser } from '@/hooks/useUser';
import { Song } from '@/lib/types';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import LikedItem from './LikedItem';
import useOnPlay from '@/hooks/useOnPlay';

interface LikedContentProps {
  // You can define any props needed here
  songs:Song[];
  // onClick?:(id:string) => void;
}

const LikedContent: React.FC<LikedContentProps> = ({
  songs
}) => {

  const router = useRouter()
  const { isLoading,user }  = useUser()

  // MARK: Auth
  useEffect(() => {
    if(!isLoading && !user) {
      router.replace('/')
    }
  },[user,isLoading,router])

  //MARK: Catch Error
  if(songs.length === 0) {
    return (
      <div className='flex flex-col gap-y-2 mt-10'>
        <h1 className='text-xl text-white items-center'>No liked Songs</h1>
      </div>
    )
  }

  const onPlay = useOnPlay(songs)

  // MARK: LikedContent
  return (
    <>
    <div 
      className='flex flex-col gap-y-2 mt-10'>
      {
        songs.map((song) =>
          <LikedItem 
            song={song}
            onClick={() => onPlay(song.id)}
          />)
      }
    </div>
    </>
  )
}
export default LikedContent;