'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import BackAndForWardButton from './BackAndForward';
import HomeAndSearchButton from './HomeAndSearch';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import toast from 'react-hot-toast';
import Button from '../global/Button';
import { useAuthModal } from '@/hooks/useAuthModal';

interface Props {
  // You can define any props needed here
  children:React.ReactNode;
  className?:string;
}

const Header: React.FC<Props> = ({
  children,className
}) => {
  const router = useRouter()
  // MARK: Valid
  const supabaseClient = useSupabaseClient()
  // const { user } = useUser()
  const { user } = useUser()
  const { isOpen, onOpen, onClose } = useAuthModal();

  

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut()

    router.refresh()
    
    if(error) {
      console.log('handleLogout: error ==> ',error)
      toast.error(`${error}`)
    }
    toast.success('loged out')
  }

  return (
    <div className={twMerge(`
      h-fit
      bg-gradient-to-b
      from-emerald-800
      p-6
      `,
      className
      )}>
        <div className='
          w-full
          mb-4
          flex
          items-center
          justify-between
        '>

          {/* 
          //MARK: Back & ForWard
          */}
          <BackAndForWardButton />

          {/* 
          //MARK: Home & Search
          */}
          <HomeAndSearchButton />

          {/* 
          //MARK: Login & Logout
          */}
          <>
          {
          user ? (
            <div className='
              flex
              justify-between
              items-center
              gap-x-4
            '>
              <Button 
                onClick={handleLogout}
                title="Logout" 
                className='bg-white px-6 py-2'
              />
              <Button 
                onClick={()=> {}}
                title="User" 
                className='bg-white px-6 py-2'
              />
            </div>
          ) : (
            <div className='
              flex
              justify-between
              items-center
              gap-x-4
            '>
              <Button 
                onClick={onOpen}
                title="Login" 
                className='bg-white px-6 py-2'
              />
            </div>
          )
        }
        </>
        </div>
        {children}
      </div>
  );
};

export default Header;