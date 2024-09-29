'use client'

import useGetSongById from '@/hooks/useGetSongById'
import useLoadSongUrl from '@/hooks/useLoadSongUrl'
import { usePlayer } from '@/hooks/usePlayer'
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
        // NOTE: 在使用use-sound的时候SongUrl没办法动态变化，所以传入一个key，让useSound获取 key
        key={songUrl}
        song={song}
        songUrl={songUrl}
      />
    </div>
  )
}

export default Player