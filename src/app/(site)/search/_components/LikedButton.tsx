import AuthModal from '@/components/modal/AuthModal';
import { useAuthModal } from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { Song } from '@/lib/types';
import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface LikedButtonProps {
  // You can define any props needed here
  song:Song;

}

const LikedButton: React.FC<LikedButtonProps> = ({
  song
}) => {
  const router = useRouter()

  const [isLiked,setIsLiked] = useState(true)
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  // MARK: Auth
  const { user } = useUser()
  const authModal = useAuthModal()
  const supabaseClient = useSupabaseClient()

  // TODO: Effect 获取库里是否有那首歌，确定是否 Liked

  // MARK: handleLike
  const handleLike = async () => {
    if(!user) {
      return authModal.onOpen
    }

    if(isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id',user.id)
        .eq('song_id',song.id)

      if(error) {
        toast.error(error.message)
      } else {
        setIsLiked(false)
        toast('UnLiked')
      }
    } else {
      const { error } = await supabaseClient
        .from('liked_songs')
        .insert({
          song_id:song.id,
          user_id:user.id
        })

      if(error) {
        toast.error(error.message)
      } else {
        setIsLiked(true)
        toast.success('Liked')
      }
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