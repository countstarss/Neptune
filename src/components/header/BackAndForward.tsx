import { useRouter } from 'next/navigation';
import React from 'react';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';


const BackAndForWardButton: React.FC = ({
}) => {
  const router = useRouter()
  return (
    <div className='
            hidden
            md:flex
            gap-x-2
            items-center
          '>
            <button className='
              rounded-full
              bg-black/90
              flex
              items-center
              justify-center
              hover:opacity-55
              transition'
              onClick={() => router?.back()}
            >
              <RxCaretLeft 
                className='cursor-pointer text-white' 
                size={35}
              />
            </button>
            <button className='
              rounded-full
              bg-black/90
              flex
              items-center
              justify-center
              hover:opacity-55
              transition'
              onClick={() => router.forward()}
            >
              <RxCaretRight 
                className='cursor-pointer text-white' 
                size={35}
              />
            </button>
          </div>
  );
};

export default BackAndForWardButton;