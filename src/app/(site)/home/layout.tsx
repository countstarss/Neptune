import React from 'react';

type Props  = {
  children: React.ReactNode; // children 是必须的
}

// Next.js layout component
const Layout = ({ children }: Props) => {
  return (
    <div className='
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    '>
      <div className='mt-14 mb-36 px-3'>
        {children}
      </div>
    </div>
  );
};

export default Layout;