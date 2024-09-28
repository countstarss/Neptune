import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ControlButtonProps {
  // You can define any props needed here
  children:React.ReactNode
  className?:string
}

const ControlButton: React.FC<ControlButtonProps> = ({
  children,className
}) => {
  return (
    <div className={twMerge(`flex h-10 w-10 items-center justify-center p-1 cursor-pointer`,className)}>
      {children}
    </div>
  );
};

export default ControlButton;