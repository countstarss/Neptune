import { getLikedSongs } from '@/actions/getLikedSongs';
import { useAuthModal } from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { Song } from '@/lib/types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import LikedSongs from '../../home/_components/LikedSongs';

interface LikedButtonProps {
  // You can define any props needed here
  song:Song;
  isLiked:boolean;
  onLikeToggle: (songId: string, isLiked: boolean) => void;
}

const LikedButton: React.FC<LikedButtonProps> = ({
  song,
  isLiked,
  onLikeToggle
}) => {
  const router = useRouter()

  const [loading, setLoading] = useState(false);
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  // MARK: Auth
  const { user } = useUser()
  const authModal = useAuthModal()
  const supabaseClient = useSupabaseClient()



  // MARK: handleLike
  const handleLike = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
    if(!user) {
      return authModal.onOpen
    }

    setLoading(true)

    try {
      if(isLiked) {
        // INFO: 取消喜欢
        const { error } = await supabaseClient
          .from('liked_songs')
          .delete()
          .eq('user_id',user.id)
          .eq('song_id',song.id)
  
        if(error) {
          toast.error(error.message)
        } else {
          onLikeToggle(song.id,false)
          toast('UnLiked')
        }
      } else {
        //INFO: 添加喜欢
        const { error } = await supabaseClient
          .from('liked_songs')
          .insert({
            song_id:song.id,
            user_id:user.id
          })
  
        if(error) {
          toast.error(error.message)
        } else {
          onLikeToggle(song.id,true)
          toast.success('Liked')
        }
      } 
    }catch (error) {
      toast.error('toggle error')
    }

    router.refresh()
  }

  return (
    <div 
      className='flex items-center justify-center'
      onClick={handleLike}  
    >
      <Icon
        size={20}
        className='
            text-white 
            mr-2 
            hover:scale-125
            transition'
      />
    </div>
  );
};

export default LikedButton;