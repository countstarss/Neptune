import React from 'react';

interface SelectCategoryProps {
  // You can define any props needed here
}

const SelectCategory: React.FC<SelectCategoryProps> = ({
  
}) => {
  return (
    <div
      className='
        w-1/2 h-full 
        rounded-full 
        bg-neutral-400 
        items-center 
        justify-center 
        p-4 mx-4
        lg:block hidden
        transition
      '
    >
      SelectCategory
    </div>
  );
};

export default SelectCategory;