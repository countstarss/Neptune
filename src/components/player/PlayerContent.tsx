'use client'
import { Song } from '@/lib/types'
import React, { useState } from 'react'
import { BsPauseFill, BsPlayFill, BsVolumeDownFill, BsVolumeOff, } from 'react-icons/bs'
import SearchItem from '@/app/(site)/search/_components/SearchItem'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import ControlButton from './ControlButton'
import Slider from './Slider'
import { usePlayer } from '@/hooks/usePlayer'

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
  const [isPlaying,SetIsPlaying] = useState(false)

  const Icon = true ? BsPauseFill : BsPlayFill
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



  return (
    <div className='
      w-full h-full p-4 rounded-lg bg-transparent flex justify-start relative
    '>
      {/* 
      //MARK: 底部左侧显示
      */}
      <div className='w-[250px] flex'>
        <SearchItem 
          // TODO: 点击打开歌词之类的东西
          onClick={() => {}}
          data={song}
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
            <BsVolumeDownFill size={30} className='text-slate-100 opacity-50 hover:opacity-100 transition'/>
          </ControlButton>

          <div className='flex flex-row gap-x-6 w-auto items-center'>
            <ControlButton>
              <AiFillStepBackward 
                onClick={onPlayPrev}
                size={30} 
                className='text-slate-100 opacity-50 hover:opacity-100 transition'
              />
            </ControlButton>
            <ControlButton className='rounded-full bg-white/80 justify-center'>
              <Icon size={30} className='text-black opacity-70 hover:opacity-100 transition'/>
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
            <BsVolumeDownFill size={30} className='text-slate-100 opacity-50 hover:opacity-100 transition'/>
            <Slider value={0.6} className='w-[50px]'/>
          </ControlButton>
        </div>
      </div>

      {/* 
      //MARK: 底部右边列表
      */}

      <div className='w-[250px] xl:flex hidden'>
        <SearchItem 
          // TODO: 点击打开上拉列表，显示专辑里的/随机的歌单
          // TODO: 这里如果要显示的话就是直接把Album:Song[]传过来
          onClick={() => {}}
          data={song}
        />
      </div>
    </div>
  );
};

export default PlayerContent;