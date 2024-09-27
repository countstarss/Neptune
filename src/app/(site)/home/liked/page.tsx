import { getLikedSongs } from '@/actions/getLikedSongs';
import Image from 'next/image';
import React from 'react';
import DetailTempalte from '../_components/DetailTempalte';
import LikedContent from './_components/LikedContent';

interface LikedProps {
  // You can define any props needed here
}

const Liked: React.FC<LikedProps> = async ({
  
}) => {

  const songs = await getLikedSongs()
  return (
    <DetailTempalte
      subtitle='Playlist'
      title='Liked Songs'
    >
      {/* 
      // MARK: Liked Songs 
      */}
      <LikedContent songs={songs}/>

    </DetailTempalte>
  );
};

export default Liked;