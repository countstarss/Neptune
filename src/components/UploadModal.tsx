'use client'
import React, { useEffect } from 'react';
import Modal from './global/Modal';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';
import { useAuthModal } from '@/hooks/useAuthModal';
import { supabase } from '@/utils/supabase/server';
import { useUploadModal } from '@/hooks/useUploadModal';


interface UploadModalProps {
  // You can define any props needed here
}

const UploadModal: React.FC<UploadModalProps> = ({ }) => {

  const uploadModal = useUploadModal()
  const router = useRouter()
  const { session } = useSessionContext()
  const { onClose,isOpen } = useUploadModal()

  const onChange = (open:boolean) => {
    if(!open) {
      onClose()
    }
  }

  useEffect(() => {
    if (session) {
      router.refresh() // 登录成功后跳转到指定页面
      uploadModal.onClose()
    }
  },[session,router,onClose])

  return (

    <Modal 
      title='Welcome back'
      description='Login to your account'
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <h1>Form</h1>
    </Modal>
  );
};

export default UploadModal;