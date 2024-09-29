import { Song } from '@/lib/types'
import { usePlayer } from './usePlayer'
import { useAuthModal } from './useAuthModal'
import { useUser } from './useUser'

// MARK: useOnPlay
const useOnPlay = (songs: Song[]) => {

  const player = usePlayer()
  const authModal = useAuthModal()
  const { user } = useUser()

  const onPlay = (id:string) => {
    console.log("In onPlay")
    if(!user) {
      return authModal.onOpen()
    }

    player.setId(id)
    player.setIds(songs.map((song) => song.id))
  }

  // Play的id来源是被点击调用的那一个song
  return onPlay
}

export default useOnPlay