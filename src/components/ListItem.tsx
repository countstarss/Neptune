'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaPlay } from 'react-icons/fa';

interface Props {
  // You can define any props needed here
  image:string;
  name:string;
  href:string;
}

const ListItem: React.FC<Props> = ({
  name,href
}) => {

  const router = useRouter()

  const onClick = () => {
    router.push(href);
  }

  return (
    <button className='
      relative
      group
      flex
      items-center
      rounded-md
      overflow-hidden
      gap-x-4
      bg-neutral-100/10
      hover:bg-neutral-100/20
      transition
      pr-4
    '
    onClick={() => onClick()}
    >
      <div className='relative
        min-h-[64px]
        min-w-[64px]
      '>
        {/* 
        TODO: 改成加载storage中的图片
        */}
        <Image 
          src="https://images.cubox.pro/1727094042834/208618/image.png" 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  // 响应式布局下的图片大小
          className='object-cover' 
          alt="image"
        />
      </div>
      <p className='font-medium truncate py-5 text-white'>{name}</p>

      <div className='
        absolute
        transition
        opacity-0
        rounded-full
        flex
        items-center
        justify-center
        bg-green-500
        p-3
        pl-[14px]
        mr-[2px]
        grop-shadow-md
        right-5
        group-hover:opacity-100
        hover:scale-110
      '>
        <FaPlay className='text-black items-center justify-center' size={20}/>
      </div>
    </button>
  );
};

export default ListItem;