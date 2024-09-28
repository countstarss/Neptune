'use client'
import React from 'react';
import * as RadixSlider from '@radix-ui/react-slider'
import { twMerge } from 'tailwind-merge';

interface SliderProps {
  // You can define any props needed here
  value:number;
  onChange?: (value:number) => void;
  className?:string
}

const Slider: React.FC<SliderProps> = ({
  value,onChange,className
}) => {

  
  const handleChange = (newValue:number[]) => {
    onChange?.(newValue[0]);
  }
  return (
    <RadixSlider.Root className={twMerge(`
      relative
      flex
      items-center
      select-none
      touch-none
      w-full
      h-10`,className)}
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label='Volume'
    >
      <RadixSlider.Track className='
      bg-white
        relative
        grow
        rounded-full
        h-[3px]
        w-[3px]
      '>
        <RadixSlider.Range className='
          absolute
          bg-green-500
          rounded-full
          h-full
        '/>
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;