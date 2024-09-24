import React from 'react';
import * as Dialog from "@radix-ui/react-dialog"
import { FaXmark } from 'react-icons/fa6';

interface ModalProps {
  // You can define any props needed here
  children:React.ReactNode;
  isOpen:boolean;
  onChange: (open:boolean) => void;
  title:string;
  description:string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onChange,
  title,
  description
}) => {
  return (
    <Dialog.Root
      open={isOpen}
      defaultOpen={isOpen}
      onOpenChange={onChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay 
          className='
            bg-neutral-900/80
            backdrop-blur-sm
            fixed
            inset-0
          '
        />
        <Dialog.Content className='
          fixed
          drop-shadow-md
          border
          border-neutral-700
          top-[50%] left-[50%]
          max-h-full h-full md:h-auto md:max-h[85vh]
          w-full md:w-[90vw] md:max-w-[450px]
          translate-x-[-50%]
          translate-y-[-50%]
          rounded-md
          bg-neutral-800
          p-[25px]
          focus:outline-none
        '>  
          <Dialog.Title className='
            text-xl
            text-center
            font-extrabold
            mb-3
          '>
            {title}
          </Dialog.Title>
          <Dialog.Description
            className='text-sm flex justify-center mb-5'
          >
            {description}
          </Dialog.Description>
          <div>
            {children}
          </div>
          <Dialog.Close asChild>
            <button className='
              text-neutral-400
              hover:text-white
              absolute
              top-[10px]
              right-[10px]
              inline-flex
              h-[25px]
              w-[25px]
              appearance-none
              items-center
              justify-center
              rounded-full
              focus:outline-none
            '>
              <FaXmark />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
