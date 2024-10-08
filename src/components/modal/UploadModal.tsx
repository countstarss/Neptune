'use client'

import uniqid from 'uniqid'
import { useState } from 'react'
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { useUploadModal } from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'

import Modal from '../global/Modal'
import Button from '../global/Button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import CustomInput from '../global/CustomInput'

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const uploadModal = useUploadModal()
  // MARK: Auth
  const { user } = useUser()
  const supabaseClient = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY})
  const router = useRouter()

  // NOTE:  Use "ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free. 
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null
    }
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      uploadModal.onClose()
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)

      const imageFile = values.image?.[0]
      const songFile = values.song?.[0]

      if (!imageFile || !songFile || !user) {
        toast.error('Missing fields')
        return
      }

      const uniqueID = uniqid()

      // MARK: Create Bucket
      // INFO: Create Bucket once
      // const { data:spngBucketData, error:songBucketError } = await supabaseClient.storage.createBucket('spotify-songs', {
      //   public: true,
      //   allowedMimeTypes: ['audio/*'],
      //   fileSizeLimit: '10MB',
      // })
      // if (songBucketError) {
      //   setIsLoading(false)
      //   console.log(songBucketError)
      //   return toast.error('songBucketError.')
      // }

      // const { data:imageBucketData, error:imageBucketError } = await supabaseClient.storage.createBucket('spotify-images', {
      //   public: true,
      //   allowedMimeTypes: ['image/*'],
      //   fileSizeLimit: '1MB',
      // })
      // if (imageBucketError) {
      //   setIsLoading(false)
      //   console.log(imageBucketError)
      //   return toast.error('imageBucketError.')
      // }


      // MARK: Upload song
      const { data: songData, error: songError } = await supabaseClient
        .storage
        .from('spotify-songs')
        .upload(`song-${uniqueID}`, songFile, {
          contentType:'audio/mpeg'
        })

      if (songError) {
        setIsLoading(false)
        console.log(songError)
        return toast.error('Failed song upload.')
      }

      

      // MARK: Upload image
      const { data: imageData, error: imageError } = await supabaseClient.storage
        .from('spotify-images')
        .upload(`image-${uniqueID}`, imageFile, {
          contentType:"image"
        })

      if (imageError) {
        setIsLoading(false)
        console.log(imageError)
        return toast.error('Failed image upload.')
      }

      // MARK: Insert song
      const { error: supabaseError } = await supabaseClient.from('songs').insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path
      })

      if (supabaseError) {
        setIsLoading(false)
        return toast.error(supabaseError.message)
      }

      router.refresh()
      setIsLoading(false)
      toast.success('Song created!')
      reset()
      uploadModal.onClose()
    } catch (error) {
      toast.error('Something went wrong')
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <CustomInput
          className='text-white text-lg'
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Enter Song Title"
          autoComplete='false'
        />
        <CustomInput
          className='text-white text-lg'
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Enter Song Author"
          autoComplete='false'
        />
        <div>
          <div className="pb-1 text-white text-lg">Select a song file</div>
          <CustomInput
            className='text-white text-lg'
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3, .wav, .ogg, .m4a, .aac, .flac"
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div className="pb-1 text-white text-lg">Select an image</div>
          <CustomInput
            className='text-white text-lg'
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register('image', { required: true })}
          />
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          title='Create'
        >
          Create
        </Button>
      </form>
    </Modal>
  )
}

export default UploadModal
