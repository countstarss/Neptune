import Header from '@/components/header/Header';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SearchInput from './_components/SearchPage';

interface SearchPageProps {
  // You can define any props needed here
  searchParams: {
    title: string
  }
}

const SearchPage: React.FC<SearchPageProps> = ({
  searchParams
}) => {


  // FIXME: 解决搜索出来的所有歌曲都是Liked状态的问题

  return (
    // INFO: 这里改变的是首页右半部分的内容

    <div
      className='bg-neutral-900
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto'
    >

      <div className='h-fit p-6 max-w-full'>
        <SearchInput />
      </div>
    </div>
  );
};

export default SearchPage;