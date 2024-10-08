'use client'
import { Song } from '@/lib/types'
import React, { useEffect, useState } from 'react'
import { BsPauseFill, BsPlayFill, BsVolumeDownFill, BsVolumeOff, } from 'react-icons/bs'
import SearchItem from '@/app/(site)/search/_components/SearchItem'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import ControlButton from './ControlButton'
import Slider from './Slider'
import { usePlayer } from '@/hooks/usePlayer'
import { useSound } from 'use-sound'
import SongInfo from './SongInfo'
import MiniSongInfo from './MiniSongInfo'

interface PlayerContentProps {
  // You can define any props needed here
  song:Song
  songUrl:string
}

const PlayerContent: React.FC<PlayerContentProps> = ({
  song,
  songUrl
}) => {


  const player = usePlayer()
  const [volume,setVolume] = useState(1)
  const [isPlaying,setIsPlaying] = useState(false)

  const Icon = isPlaying ? BsPauseFill : BsPlayFill
  const VolumeIcon = volume === 0 ? BsVolumeOff : BsVolumeDownFill


  // MARK: onPlayNext
  const onPlayNext = () => {
    if(player.ids.length === 0) {
      return
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const nextSong = player.ids[currentIndex + 1]

    if(!nextSong) {
      return player.setId(player.ids[0])
    }

    player.setId(nextSong)
  }

  // MARK: onPlayPrev
  const onPlayPrev = () => {
    if(player.ids.length === 0) {
      return
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const prevSong = player.ids[currentIndex - 1]

    if(!prevSong) {
      return player.setId(player.ids[player.ids.length - 1])
    }

    player.setId(prevSong)
  }

  // MARK: useSound
  const [play, { pause,sound }] = useSound(
    songUrl,
    {
      volume: volume,
      onplay: () => setIsPlaying(true),
      onend:() => {
        setIsPlaying(false)
        onPlayNext()
      },
      onpause:() => setIsPlaying(false),
      format: ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac']
    }
  )


  useEffect(() => {
    sound?.play()

    return () => {
      sound?.unload()
    }
  },[sound])

  // MARK: handlePlay
  const handlePlay = () => {
    if(!isPlaying) {
      play()
    } else {
      pause()
    }
  }

  const toggleMute = () => {
    if(volume === 0) {
      setVolume(1)
    } else {
      setVolume(0)
    }
  }



  return (
    <div className='
      w-full h-full p-4 rounded-lg bg-transparent flex justify-start relative
    '>
      {/* 
      //MARK: 底部左侧显示
      */}
      <div className='lg:w-[250px] lg:flex w-[80px]  '>
        <SongInfo 
          // TODO: 点击打开歌词之类的东西
          onClick={() => {}}
          data={song}
          className='lg:flex hidden select-none'
        />
        <MiniSongInfo
          // TODO: 点击打开歌词之类的东西
          onClick={() => {}}
          data={song}
          className='flex lg:hidden select-none'
        />

      </div>

      <div 
        // onClick={() => {}}  
        className='
          h-full
          w-full
          sbsolute
          left-[260px]
          right-[10px]
          flex
          flex-col
          gap-y-2
          items-center
          justify-between
          bg-transparent
          p-1
          rounded-lg
          mx-4
      '>
        {/* 
        // MARK: Progress
        */}
        <div className='w-full h-1 bg-white rounded-full' />

        {/* 
        //MARK: 底部中间控制
        */}
        <div className='flex flex-row gap-x-1 justify-between w-full'>
          <ControlButton className='w-auto flex flex-row items-center mx-auto'>
            <BsVolumeDownFill size={30} className='text-slate-100 hover:opacity-100 transition opacity-0'/>
          </ControlButton>

          <div className='flex flex-row gap-x-6 w-auto items-center'>
            <ControlButton>
              <AiFillStepBackward 
                onClick={onPlayPrev}
                size={30} 
                className='text-slate-100 opacity-50 hover:opacity-100 transition'
              />
            </ControlButton>
            <ControlButton >
              <Icon 
                onClick={handlePlay}
                size={30} 
                className='text-white opacity-70 hover:opacity-100 transition'
              />
            </ControlButton>

            <ControlButton>
              <AiFillStepForward 
                onClick={onPlayNext}
                size={30} 
                className='text-slate-100 opacity-50 hover:opacity-100 transition'
              />
            </ControlButton>
          </div>

          <ControlButton className='flex w-auto items-center mx-auto'>
            <VolumeIcon 
              onClick={toggleMute}
              size={30} 
              className='text-slate-100 opacity-50 hover:opacity-100 transition'
            />
            <Slider 
              value={volume} 
              className='w-[50px]'
              onChange={(value) => setVolume(value)}
            />
          </ControlButton>
        </div>
      </div>

      {/* 
      //MARK: 底部右边列表
      */}

      {/* <div className='w-[250px] xl:flex hidden'>
        <SearchItem 
          // TODO: 点击打开上拉列表，显示专辑里的/随机的歌单
          // TODO: 这里如果要显示的话就是直接把Album:Song[]传过来
          onClick={() => {}}
          data={song}
        />
      </div> */}
    </div>
  );
};

export default PlayerContent;