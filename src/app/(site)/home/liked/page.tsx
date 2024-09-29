'use client'
import { getLikedSongs } from '@/actions/getLikedSongs';
import React from 'react';
import DetailTempalte from '../_components/DetailTempalte';
import LikedContent from './_components/LikedContent';
import useOnPlay from '@/hooks/useOnPlay';


const Liked: React.FC = async ({
  
}) => {

  const songs = await getLikedSongs()
  // const onPlay = useOnPlay(songs)

  return (
    <DetailTempalte
      subtitle='Playlist'
      title='Liked Songs'
    >
      {/* 
      // MARK: Liked Songs 
      */}
      <LikedContent 
        songs={songs}
        // onClick={(id:string) => onPlay(id)}
      />

    </DetailTempalte>
  );
};

export default Liked;