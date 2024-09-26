import { Song } from "@/lib/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const getSongsByUserId = async ():Promise<Song[]> => {

  // MARK: supabase
  const supabase = createServerComponentClient({
    cookies:cookies
  })

  //MARK: Session
  const {
    data: SessionData,
    error:SessionError
  } = await supabase.auth.getSession()

  if(SessionError) {
    console.log(SessionError)
    return []
  }

  // MARK: Data
  const { data,error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id',SessionData.session?.user.id)
    .order('created_at',{ ascending: false })

    if(error){
      console.log(error.message)
    }
  
  return (data as any) || []
}