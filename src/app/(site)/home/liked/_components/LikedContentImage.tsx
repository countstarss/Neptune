import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/lib/types'
import Image from 'next/image'
import React from 'react'

interface LikedContentImageProps{
  song:Song;
}

const LikedContentImage = ({
  song
}:LikedContentImageProps
) => {

  // MARK: useImageUrl
  const useImageUrl = (song:Song) => {
    return useLoadImage(song)
  }
  // MARK: getImageUrl
  const imageURL = useImageUrl(song)

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
        src={imageURL || '/images/like.png'}
        alt='Midia image'
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  // 响应式布局下的图片大小
        className='object-cover'
      />
    </div>
  )
}

export default LikedContentImage