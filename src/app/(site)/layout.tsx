import Header from '@/components/header/Header';
import ListItem from '@/components/ListItem';
import React from 'react';

interface TemplateProps {
  // You can define any props needed here
  children:React.ReactNode
}
// MARK: Welcome
// INFO: 这是所有页面的模板，添加一个背景 还有Header
const Template: React.FC<TemplateProps> = ({
  children
}) => {
  return (
    <div className='
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    '>
      <Header />
      {children}
    </div>
  );
};

export default Template;