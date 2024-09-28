'use client'


import useGetSongById from '@/hooks/useGetSongById'
import useLoadImage from '@/hooks/useLoadImage'
import useLoadSongUrl from '@/hooks/useLoadSongUrl'
import { usePlayer } from '@/hooks/usePlayer'
import { Song } from '@/lib/types'
import React from 'react'

// interface Player {
//   song:Song
// }

const Player = ( ) => {

  const player = usePlayer()

  const { song } = useGetSongById(player.activeId!)
  const songUrl = useLoadSongUrl(song!)

  if(!song || !songUrl || !player.activeId) {
    return null
  }


  return (
    <div className='
      fixed bottom-2 md:left-[280px] left-2 right-2 h-28 bg-slate-500 rounded-lg
    '>
      Player{player.activeId}
    </div>
  )
}

export default Player