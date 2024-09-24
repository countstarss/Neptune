'use client'
import { Database } from '@/lib/supabase';
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from "@supabase/auth-helpers-react";
interface SupabaseProviderProps {
  // You can define any props needed here
  children:React.ReactNode
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
  children
}) => {
  const [supabaseClient] = useState(() => 
    createClientComponentClient<Database>()
  )


  return (
    <SessionContextProvider supabaseClient={supabaseClient} >
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;