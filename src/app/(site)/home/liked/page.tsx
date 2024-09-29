import { getLikedSongs } from '@/actions/getLikedSongs';
import React from 'react';
import DetailTempalte from '../_components/DetailTempalte';
import LikedContent from './_components/LikedContent';


const Liked: React.FC = async ({
  
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