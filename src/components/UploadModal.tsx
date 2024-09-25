'use client'
import React, { useEffect, useState } from 'react';
import Modal from './global/Modal';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useUploadModal } from '@/hooks/useUploadModal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from './global/Input';
import Button from './global/Button';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import uniqid from "uniqid"
import { CreateClient } from '@/utils/supabase/client';
import { supabase } from '@/utils/supabase/server';

interface UploadModalProps {
  // You can define any props needed here
}

const UploadModal: React.FC<UploadModalProps> = ({ }) => {

  const [isLoading,setIsLoading] = useState(false)

  // MARK: Auth
  const uploadModal = useUploadModal()
  const router = useRouter()
  const { session } = useSessionContext()
  // MARK: Upload
  const { user } = useUser()
  // const supabaseClient = useSupabaseClient()
  // const supabaseClient = supabase

  const onChange = (open:boolean) => {
    if(!open) {
      uploadModal.onClose()
    }
  }

  useEffect(() => {
    if (session) {
      router.refresh() // 登录成功后跳转到指定页面
      uploadModal.onClose()
    }
  },[session,router,uploadModal.onClose])

  // MARK: react-hook-form
  const {
    register,
    handleSubmit,
    reset
  } = useForm<FieldValues>({
    defaultValues:{
      author:'',
      title:'',
      song:null,
      image:null
    }
  })

  const onSubmit:SubmitHandler<FieldValues> = async (values) => {
    // upload to supabase
    try {
      setIsLoading(true)
      const songFile = values.song?.[0];
      const imageFile = values.image?.[0];
      if(!user || !songFile || !imageFile) {
        toast.error('Missing fields')
        return
      }

      const UniqID = uniqid()

      //MARK: upload song
      const {
        data: songData,
        error:songError
      } = await supabase
        .storage
        .from('songs')
        .upload(`song-${values.title}-${UniqID}`,songFile,{
          cacheControl:'3600',
          upsert:false
        });

      if(songError) {
        setIsLoading(false)
        return toast.error('Upload song failed')
      }
      toast.success('Upload song success')
      //MARK: upload image
      const {
        data: imageData,
        error:imageError
      } = await supabase
        .storage
        .from('images')
        .upload(`image-${values.title}-${UniqID}`,imageFile,{
          cacheControl:'3600',
          upsert:false
        });

      if(imageError) {
        setIsLoading(false)
        return toast.error('Upload image failed')
      }
      toast.success('Upload image success')

      // MARK: insert song
      const { 
        error:supabaseError
      } = await supabase
        .from('songs')
        .insert({
          user_id:user.id,
          author:values.author,
          title:values.title,
          song_path:songData.path,
          image_path:imageData.path
        })
      if(supabaseError) {
        return toast.error(supabaseError.message)
      }

      // MARK: finish
      router.refresh()
      setIsLoading(false)
      toast.success('Song Created')
      reset()
      uploadModal.onClose()
    } catch (error) {
      toast.error("Something went wrong")
    }finally {
      setIsLoading(false)
    }
    
  }

  return (

    <Modal 
      title='Welcome back'
      description='Login to your account'
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-y-4'
      >
        <Input
          autoComplete='false'
          id='title'
          disabled={isLoading}
          {...register('title',{ required: true })}
          placeholder='Song title'
          className='text-white text-xl'
        />
        <Input
          autoComplete='false'
          id='author'
          disabled={isLoading}
          {...register('author',{ required: true })}
          placeholder='Song author'
          className='text-white text-xl'
        />
        <div>
          <div className='py-1 text-white'>Select a song file</div>
          <Input 
            id='song'
            type="file"
            {...register('song',{ required: true })}
            accept='mp3'
            className='text-white'
          />
          <div className='py-1 text-white'>Select a image file</div>
          <Input 
            id='image'
            type="file"
            {...register('image',{ required: true })}
            accept='image'
            className='text-white'
          />
        </div>
        <Button 
          type='submit'
          title='Create'
          disabled={isLoading}
        />
      </form>
    </Modal>
  );
};

export default UploadModal;