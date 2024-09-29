'use client'
import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/lib/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import LikedButton from './LikedButton';
import { getLikedSongs } from '@/actions/getLikedSongs';

interface MeidaItemProps {
  // You can define any props needed here
  onClick?:(id:string) => void;
  data:Song;
  children:React.ReactNode
}

const SearchItem: React.FC<MeidaItemProps> = ({
  data,
  children
}) => {
  // MARK: useLoadImage
  

  return (
    <>
      {children}
    </>
  );
};

export default SearchItem;