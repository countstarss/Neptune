'use server'
import { Song } from "@/lib/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getLikedSongs = async ():Promise<Song[]> => {

  const supabase = createServerComponentClient({
    cookies:cookies
  })


  // MARK: Session
  // NOTE: 需要授权才能访问的就不直接获取user，而是先找浏览器有没有cookie，这个决定了嫩不能使用supabase
  // NOTE: 从Session中获取的user，则是决定了你能获取哪些内容（当前Session的user下）
  const {
    data: {
      session
    },
    error:SessionError
  } = await supabase.auth.getSession()

  if(SessionError) {
    console.log(SessionError)
    return []
  }

  const { data,error } = await supabase
    .from('liked_songs')
    .select('*,songs(*)')
    .eq('user_id',session?.user?.id)
    .order('created_at',{ ascending: false })

    // NOTE: supabase.from('table_name').select('*,songs(*)') 这种写法的作用类似于 MongoDB 中的嵌套数据结构，
    // NOTE: 它的作用是将相关联的 songs 表作为一个完整的对象一起获取过来，类似于 SQL 中的表关联查询（JOIN）

    if(error){
      console.log(error)
      return []
    }
  
    // NOTE: 当前通过.select('*,songs(*)')获取的，是LikedSong以及和它连接的song，
    // NOTE: 所以要map并且解构之后才能拿到LikedSong的数组
  return data.map((item) => ({
    ...item.songs
  }))
}