'use client'


import useGetSongById from '@/hooks/useGetSongById'
import useLoadImage from '@/hooks/useLoadImage'
import useLoadSongUrl from '@/hooks/useLoadSongUrl'
import { usePlayer } from '@/hooks/usePlayer'
import { Song } from '@/lib/types'
import React from 'react'
import PlayerContent from './PlayerContent'

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
      fixed bottom-2 md:left-[280px] left-2 right-2 h-24 bg-black 
    '>
      {/* Player{player.activeId} */}
      <PlayerContent 
        key={songUrl}
        song={song}
        songUrl={songUrl}
      />
    </div>
  )
}

export default Player