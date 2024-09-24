import React from 'react';

interface Props {
  // You can define any props needed here
}

const HomePage: React.FC<Props> = ({
  
}) => {
  return (
    <div className='h-full w-full flex justify-center'>
      <h1 className='text-2xl font-extrabold mt-10'>Welcome HomePage</h1>
    </div>
  );
};

export default HomePage;