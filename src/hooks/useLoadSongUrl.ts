import { Song } from "@/lib/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSongUrl = (song:Song) => {

  // NOTE:  不需要获取session 授权的功能可以使用 useSupabaseClient
  // NOTE:  需要获取session 授权的功能 使用 useSessionContext
  const supabase = useSupabaseClient();

  if(!song) {
    return null;
  }

  const { data: songData } = supabase
    .storage
    .from('spotify-songs')
    .getPublicUrl(song.song_path)

  return songData.publicUrl
}

export default useLoadSongUrl