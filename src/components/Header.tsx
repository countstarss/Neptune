'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiHome } from 'react-icons/hi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';
import BackAndForWardButton from './header/BackAndForwardButton';
import { BiSearch } from 'react-icons/bi';
import Button from './header/Button';
import HomeAndSearchButton from './header/HomeAndSearchButton';
import SignupAndLoginButton from './header/SignupAndLoginButton';

interface Props {
  // You can define any props needed here
  children:React.ReactNode;
  className?:string;
}

const Header: React.FC<Props> = ({
  children,className
}) => {
  const router = useRouter()
  const handleLogout = () => {

  }

  const handleClick = () => {

  }

  return (
    <div className={twMerge(`
      h-fit
      bg-gradient-to-b
      from-emerald-800
      p-6
      `,
      className
      )}>
        <div className='
          w-full
          mb-4
          flex
          items-center
          justify-between
        '>
          <BackAndForWardButton />

          <HomeAndSearchButton />

          <SignupAndLoginButton />
        </div>
        {children}
      </div>
  );
};

export default Header;