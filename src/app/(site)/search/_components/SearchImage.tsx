import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/lib/types'
import Image from 'next/image'
import React from 'react'

type Props = {
  song:Song
}

const SearchImage = ({
  song
}: Props) => {

  const imageUrl = useLoadImage(song)

  return (
    <div className='
      relative
      rounded-md
      min-h-[48px]
      min-w-[48px]
      overflow-hidden
    '>
      <Image
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  // 响应式布局下的图片大小
        src={imageUrl || 'https://images.cubox.pro/1727094042834/208618/image.png'}
        alt='Midia image'
        className='object-cover'
      />
    </div>
  )
}

export default SearchImage