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

  await supabase.auth.getSession()
  return res
}
