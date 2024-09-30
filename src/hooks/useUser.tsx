import { UserDetails } from '@/lib/types';
import { User } from '@supabase/auth-helpers-nextjs';
import { 
  useUser as useSupaUser
} from '@supabase/auth-helpers-react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

// NOTE: 使用这个Hook，可以获取user，以及其他的所有内容
// MARK: UserContextType
type UserContextType = {
  accessToken:string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading:boolean;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
)

export interface Props {
  // You can define any props needed here
  // FIXME: HERE
  [propsName :string] :any;
}
// FIXME: 再学习一遍UserContextProvider的写法
// MARK: UserContextProvider
export const UserContextProvider= (props: Props) => {
  const {
    session,
    isLoading:isLoadingUser,
    supabaseClient: supabase
  } = useSessionContext();
  const user = useSupaUser()
  const accessToken = session?.access_token ?? null
  const [isLoadingData,setIsLoadingData] = useState(false)
  const [userDetails,setUserDetails] = useState<UserDetails | null>(null)

  //NOTE: 定义获取内容方法 
  const getUserDetails = () => supabase.from('users').select('*').single()
  const getSubscription = () => 
    supabase
      .from('subscription')
      .select('*, prices(*,products(*))')
      .in('status',['trialing','active'])
      .single()

  useEffect(() => {
    if(user && !isLoadingData && !userDetails) {
      setIsLoadingData(true)

      Promise.allSettled([getUserDetails()]).then(
        (result) => {
          const userDetailsPromise = result[0]

          if(userDetailsPromise.status === "fulfilled") {
            setUserDetails(userDetailsPromise.value.data as UserDetails)
          }

          setIsLoadingData(false)
      })
    } else if(!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null)
    }

  },[user,isLoadingUser, isLoadingData, userDetails])


  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingData || isLoadingUser,
  };

  return <UserContext.Provider value={value} {...props} />
};

// MARK: useUser
export const useUser = () => {
  const context = useContext(UserContext)
  if(context === undefined) {
    throw new Error('useUser must be used within a MyUserContextProvider')
  }

  return context
}
