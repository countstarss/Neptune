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
    data: {
      user
    },
    error:SessionError
  } = await supabase.auth.getUser()
  // NOTE: 为什么使用getUser instead getSession
  // 使用从 supabase.auth.getSession() 返回的用户对象或从某些 supabase.auth.onAuthStateChange() 事件中获得的用户对象可能存在安全隐患！
  // 这些值直接来自存储介质（通常是服务器上的 cookies），可能不是真实的。建议使用 supabase.auth.getUser()，它会通过联系 Supabase Auth 服务器来验证数据的真实性

  if(SessionError) {
    console.log(SessionError)
    return []
  }

  // MARK: Data
  const { data,error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id',user?.id)
    .order('created_at',{ ascending: false })

    if(error){
      console.log(error.message)
    }
  
    return data as Song[] || [];
}