import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface SideBarItemProps {
  // You can define any props needed here
  icon:IconType;
  label:string;
  active?:boolean;
  href:string
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  icon:Icon,
  label,
  active,
  href
}) => {

  return (
    <Link 
      href={href}
      className={twMerge(`
        flex
        flex-row
        h-auto
        items-center
        w-full
        gap-x-4
        text-md
        font-medium
        cursor-pointer
        hover:text-white
        transition
        text-neutral-400
      `, active && "text-white")}
    >
      <Icon size={26} />
      <h1 className='truncate w-full'>{label}</h1>
    </Link>
  );
};

export default SideBarItem;