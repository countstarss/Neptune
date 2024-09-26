## Button扩展写法

## router的多种用法

- 路由切换动画支持
  使用 router 的生命周期方法，如 router.events.on()，可以监听路由事件，并结合 CSS 动画库或动画框架，在页面切换时实现平滑过渡动画。
  好处:
  - 提升用户体验，为复杂的页面切换创建流畅的动画效果。
- 自定义路由行为
  next/router 提供了丰富的 API，如 push(), replace(), back() 等，允许开发者对路由行为进行自定义控制。

## 导出数据库的types

`supabase gen types typescript --<proect name>  --schema <schema name> > supabase-types.ts`

## @supabase/auth-helpers-nextjs

## supabase client 新API

```tsx
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
```

## npm i stripe

## useUser !!重要

## npm i @radix-ui/react-dialog

## useAuthModal 登录验证

## npm i zustand

## npm i @supabase/auth-ui-react

## npm i @supabase/auth-ui-shared

## npm i react-hook-form

## npm i uniqid

## npm i -D @types/uniqid

## npm install uploadthing @uploadthing/react
