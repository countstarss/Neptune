/*
INFO: 这段代码是使用 Supabase 和 Next.js 的中间件功能来处理用户身份验证和会话管理的。
      它主要用于在处理请求时，在服务端检查用户的身份认证信息，并保持用户会话的状态。
*/

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

// NOTE: NextRequest:表示传入的 HTTP 请求对象，包含了有关请求的所有信息
// NOTE: NextResponse：表示从中间件发回的响应对象
// NOTE: NextResponse.next() 方法用于继续请求流程，并将控制权交回给下一个中间件或处理函数

export async function middleware(req:NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({
    req,
    res
  })

  await supabase.auth.getUser()
  return res
}

// NOTE: 代码的作用

// 	1.	会话验证：中间件会在每个请求中验证用户的会话信息，判断用户是否已登录。
// 	2.	会话管理：如果用户已登录，中间件可以自动注入用户会话信息到请求中，这样后续的页面或 API 可以基于此信息来执行身份验证或授权逻辑。
// 	3.	透明处理：如果用户未登录，这段代码并不会干预请求流，而是简单地获取会话信息后继续处理流程。

// 使用场景：

// 	- 保护路由：你可以将这段中间件应用于保护需要用户登录的页面或 API。通过在中间件中检查用户会话状态，可以确保只有经过认证的用户才能访问某些内容。
// 	- 全局身份验证：可以在全局范围（如在 middleware.ts 文件中）使用，确保所有请求都经过身份验证的检查，避免在每个页面或 API 里重复编写会话管理代码。

// 这段代码为你提供了在 Next.js 项目中统一处理 Supabase 用户认证的方式
