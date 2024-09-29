'use client'
import AuthModal from '@/components/modal/AuthModal';
import UploadModal from '@/components/modal/UploadModal';
import React, { useEffect, useState } from 'react';


const ModalProvider: React.FC = ({
  
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