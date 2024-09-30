'use client'
import { useUser } from '@/hooks/useUser';
import { Song } from '@/lib/types';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import LikedItem from './LikedItem';
import useOnPlay from '@/hooks/useOnPlay';
import LikedContentImage from './LikedContentImage';
import { BsPlayCircleFill } from 'react-icons/bs';
import LikedButton from '@/app/(site)/search/_components/LikedButton';
import useLikedSongs from '@/hooks/useLikedSongs';

interface LikedContentProps {
  // You can define any props needed here
  songs: Song[];
}

const LikedContent= ({
  songs
}: LikedContentProps) => {

  const router = useRouter()
  const { isLoading, user } = useUser()
  const { likedSongs, handleLikeToggle } = useLikedSongs(songs);

  // MARK: Auth
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/')
    }
  }, [user, isLoading, router])

  const onPlay = useOnPlay(songs)

  //MARK: Catch Error
  if (songs.length === 0) {
    return (
      <div className='flex flex-col gap-y-2 mt-10'>
        <h1 className='text-xl text-white items-center'>No liked Songs</h1>
      </div>
    )
  }

  // MARK: LikedContent
  return (
    <>
      <div
        className='flex flex-col gap-y-2 mt-10'>
        {
          songs.map((song) =>
            <LikedItem
              key={song.id}
              song={song}
              onClick={() => onPlay(song.id)}
            >
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
                  <LikedContentImage song={song} />
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
                    onClick={() => onPlay(song.id)}
                  />
                </div>
                <LikedButton
                  isLiked={likedSongs.includes(song.id) || true}
                  song={song}
                  onLikeToggle={handleLikeToggle}
                />
              </div>
            </LikedItem>
          )
        }
      </div>
    </>
  )
}
export default LikedContent;