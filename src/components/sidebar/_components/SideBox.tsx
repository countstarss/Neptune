import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  // You can define any props needed here
  children:React.ReactNode,
  className?:string
}

const Box: React.FC<Props> = ({
  children,className
}) => {
  return (
    <div className={twMerge(`
      bg-white/10
      rounded-lg
      h-fit
      w-full
    `,className)}>
      {children}
    </div>
  );
};

export default Box;