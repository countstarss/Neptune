'use client'
import Modal from '@/components/global/Modal';
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
      <Modal
        isOpen={true}
        onChange={() => {}} 
        title='Test modal'
        description='Test modal'
        >
        TEST MODAL
      </Modal>
    </>
  );
};

export default ModalProvider;