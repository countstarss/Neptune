import { getLikedSongs } from '@/actions/getLikedSongs';
import { Song } from '@/lib/types';
import React, { useEffect, useState } from 'react'
import LikedContentImage from './LikedContentImage';
import LikedButton from '@/app/(site)/search/_components/LikedButton';
import { BsPlayCircleFill } from 'react-icons/bs';
import useLikedSongs from '@/hooks/useLikedSongs';

type LikedItemProps = {
  song:Song;
  onClick: (id:string) => void;
  children:React.ReactNode
}

const LikedItem = ({ 
  song,children
}: LikedItemProps) => {
  return (
    <>
      {children}
    </>
  )
}

export default LikedItem