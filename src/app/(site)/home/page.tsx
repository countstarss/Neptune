'use client'
import { useUser } from '@/hooks/useUser';
import { User } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useState } from 'react';

interface Props {
  // You can define any props needed here
}

const HomePage: React.FC<Props> = ({
  
}) => {
  const { user } = useUser()
  
  return (
    <div className='h-full w-full flex justify-center'>
      <h1 className='text-2xl font-extrabold mt-10 text-white'>Welcome HomePage</h1>
      <br />
      <h1 className='text-2xl font-extrabold mt-10 text-white'>{user?.email}</h1>
    </div>
  );
};

export default HomePage;