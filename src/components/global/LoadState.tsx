import React from 'react';

interface LoadStateProps {
  // You can define any props needed here
  state?:string
}

const LoadState: React.FC<LoadStateProps> = ({
  state
}) => {
  return (
    <div className='
      w-full
      h-96
      flex
      flex-col
      items-center
      justify-center
    '>
      <h1 className=' text-xl text-white'>{state || "loading"}</h1>
    </div>
  );
};

export default LoadState;