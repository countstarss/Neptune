import { Song } from "@/lib/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { getSongs } from "./getSongs"

export const getSongsByTitle = async (title:string):Promise<Song[]> => {

  // MARK: supabase
  const supabase = createServerComponentClient({
    cookies:cookies
  })

  if(!title) {
    const allSongs = await getSongs()
    return allSongs
  }

  // MARK: Data
  const { data,error } = await supabase
    .from('songs')
    .select('*')
    // NOTE: 模糊匹配
    .ilike('title',`%${title}%`)
    .order('created_at',{ ascending: false })

    if(error){
      console.log(error.message)
    }
  
  return (data as any) || []
}