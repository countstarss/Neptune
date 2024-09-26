import React from 'react';

interface TemplateProps {
  // You can define any props needed here
  children:React.ReactNode
}

const Template: React.FC<TemplateProps> = ({
  children
}) => {
  return (
    <div className='h-full w-full'>
      {children}
    </div>
  );
};

export default Template;