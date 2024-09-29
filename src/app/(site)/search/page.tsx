import React from 'react';
import SearchInput from './_components/SearchPage';


const SearchPage: React.FC = ({
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
        overflow-y-auto
        mt-4'
    >

      <div className='h-fit p-6 py-8 max-w-full'>
        <SearchInput />
      </div>
    </div>
  );
};

export default SearchPage;