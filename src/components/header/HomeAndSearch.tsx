import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';


const HomeAndSearchButton: React.FC = ({
  
}) => {
  return (
    <div className='
      flex md:hidden gap-x-2 items-center
    '>
      <button className='
        rounded-full
        bg-white/90
        flex
        items-center
        justify-center
        hover:opacity-55
        transition
        p-2'
      >
        <HiHome className='text-black' size={20} />
      </button>
      <button className='
        rounded-full
        bg-white/90
        flex
        items-center
        justify-center
        hover:opacity-55
        transition
        p-2'
      >
        <BiSearch className='text-black' size={20} />
      </button>
    </div>
  );
};

export default HomeAndSearchButton;