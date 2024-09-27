'use client'
import AuthModal from '@/components/modal/AuthModal';
import Modal from '@/components/global/Modal';
import UploadModal from '@/components/modal/UploadModal';
import React, { useEffect, useState } from 'react';

interface Props {
  // You can define any props needed here
}

const ModalProvider: React.FC<Props> = ({
  
}) => {

  const [ismounted,setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  },[])

  if(!ismounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};

export default ModalProvider;