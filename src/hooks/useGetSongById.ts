import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Song } from "@/lib/types"
import { useEffect, useMemo, useState } from "react"
import { useSessionContext } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';


// INFO: 使用一个hook获取Song
const useGetSongById = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [song,setSong] = useState<Song | undefined>(undefined)
  
  // NOTE:  不需要获取session 授权的功能可以使用 useSupabaseClient
  // NOTE:  需要获取session 授权的功能 使用 useSessionContext
  const { supabaseClient } = useSessionContext()

  useEffect(() => {
    if(!id) {
      return
    }
    setIsLoading(true)

    const fetchSong = async () => {
      const { data,error } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('id',id)
        .single()

      if(error) {
        setIsLoading(false)
        return toast.error(error.message)
      }

      setSong(data as Song)
      setIsLoading(false)
    }

    fetchSong()
  },[id,supabaseClient])

  return useMemo(() => ({
    isLoading,
    song
  }),[isLoading,song])
}

export default useGetSongById