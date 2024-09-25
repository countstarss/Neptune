'use client'
import React from 'react';
import { Toaster } from "react-hot-toast"

interface ToasterProviderProps {
  // You can define any props needed here
}

const ToasterProvider = ({ }: ToasterProviderProps) => {


  return (
    <Toaster
      toastOptions={{
        style: {
          background: '#333',
          color: '#fff'
        }
      }}
    />
  );
};

export default ToasterProvider;