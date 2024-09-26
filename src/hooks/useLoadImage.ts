import { Song } from "@/lib/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (song:Song) => {

  const supabase = useSupabaseClient();

  if(!song) {
    return null;
  }

  const { data: imageData } = supabase
    .storage
    .from('spotify-images')
    .getPublicUrl(song.image_path)

  return imageData.publicUrl
}

export default useLoadImage