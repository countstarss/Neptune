'use client'
import React from 'react';
import FlexBox from '../global/ColBox';
import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';

interface Props {
  // You can define any props needed here

}

const Library: React.FC<Props> = ({

}) => {
  return (
    <>
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
          // onClick={onClick}
          className='text-neutral-400
            cursor-pointer
            hover:text-white
            transition
          '
        />
      </div>
      </FlexBox>
      <div className='flex flex-rowgap-y-2 mt-4 px-3'>
        List of Song 
      </div>
    </>
  );
};

export default Library;