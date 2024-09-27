// app/api/songs/route.ts

import { NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title');
  
  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  // 获取 cookies
  const supabase = createServerComponentClient({ cookies });

  const { data: songs, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(songs);
}