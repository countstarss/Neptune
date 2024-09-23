import React from 'react';
import Button from './Button';

interface Props {
  // You can define any props needed here
}

const SignupAndLoginButton: React.FC<Props> = ({
  
}) => {
  return (
    <div className='
      flex
      justify-between
      items-center
      gap-x-4
    '>
      <Button 
        title="Sign Up" 
        className='bg-transparent text-neutral-300 font-bold'
        />
      <Button 
        title="Login" 
        className='bg-white px-6 py-2'
      />

    </div>
  );
};

export default SignupAndLoginButton;