import ListItem from '@/components/ListItem';
import React from 'react';


const LikedSongs: React.FC = ({

}) => {
  return (
    <div className='mb-6'>
      <h1 className='
            text-white
            text-3xl
            font-semibold
          '>Liked Songs</h1>

      <div className='
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-3
            mt-4
          '>
        <ListItem
          image="/public/like.png"
          name="Liked"
          href="/home/liked"
        />
        <ListItem
          image="/public/like.png"
          name="Liked"
          href="/home/liked"
        />
        <ListItem
          image="/public/like.png"
          name="Liked"
          href="/home/liked"
        />
        <ListItem
          image="/public/like.png"
          name="Liked"
          href="/home/liked"
        />
      </div>
    </div>
  );
};

export default LikedSongs;