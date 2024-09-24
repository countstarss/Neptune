'use client'

import { UserContextProvider } from '@/hooks/useUser';
import React from 'react';

interface UserProviderProps {
  // You can define any props needed here
  children:React.ReactNode
}

const UserProvider: React.FC<UserProviderProps> = ({
  children
}) => {
  return (
    <UserContextProvider>
      {children}
    </UserContextProvider>
  );
};

export default UserProvider;