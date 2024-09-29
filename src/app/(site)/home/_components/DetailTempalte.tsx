
import Image from 'next/image';
import React from 'react';

interface DetailTempalteProps {
  // You can define any props needed here
  children?:React.ReactNode;
  title:string;
  subtitle:string;
}

const DetailTempalte: React.FC<DetailTempalteProps> = async ({
  children,title,subtitle
}) => {

  // const songs = await getLikedSongs()

  return (
    <div className='
      mt-10
    '>
      {/* 
      // MARK: Header
      */}
      <div className='
        flex flex-col
        md:flex-row
        items-center
        gap-y-5
      '>
        <div className='
          relative
          h-32
          w-32
          lg:h-44
          lg:w-44
        '>
          <Image
            src="https://images.cubox.pro/1727094042834/208618/image.png"
            alt='Liked Song'
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  // 响应式布局下的图片大小
            className='object-cover'
          />
        </div>

        <div className='
          flex
          flex-col
          gap-y-2
          mt-2
          md:mt-0
          mx-4
        '>
          <p className='
            text-white hidden md:block font-semibold text-md
          '>{subtitle}</p>

          <h1 className='
            text-white
            text-4xl
            sm:text-5xl
            lg:text-7xl
            font-bold
          '>{title}</h1>
        </div>
      </div>

      {/* 
      // MARK: Body
      */}
      {children}
    </div>
  );
};

export default DetailTempalte;