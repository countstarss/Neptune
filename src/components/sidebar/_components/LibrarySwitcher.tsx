'use client'
import { useAuthModal } from '@/hooks/useAuthModal'
import { useUploadModal } from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'
import React from 'react'
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IconType } from 'react-icons'
import { Bs2Circle } from 'react-icons/bs'
import { TbSquareRoundedPlus } from 'react-icons/tb'

interface LibrarySwitcherProps {
  categories: {
    label: string
    categoryId:string
    icon: IconType
  }[]
}

const LibrarySwitcher = ({
  categories
}: LibrarySwitcherProps) => {


  // MARK: OpenModal
  const { user } = useUser()
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()

  // MARK: onClick
  const onClick = () => {
    if (!user) {
      return authModal.onOpen()
    }
    console.log('ONCLICK')

    return uploadModal.onOpen()
  }

  const [selectedCategory, setSelectedCategory] = React.useState<string>(
    categories[0].categoryId
  )

  // const Icon = Bs2Circle
  const Icon = categories[Number(selectedCategory) - 1].icon

  return (
    <div className='flex flex-row gap-2 items-center justify-center mx-2 ml-3'>
      <Select defaultValue={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger
          className={cn(
            `flex items-center gap-2 
            [&>span]:line-clamp-1 
            [&>span]:flex 
            [&>span]:w-full 
            [&>span]:items-center 
            [&>span]:gap-1 
            [&>span]:truncate 
            [&_svg]:h-4 
            [&_svg]:w-4 
            [&_svg]:shrink-0`,
            // isCollapsed &&
            //   "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
          )}
          aria-label="Select account"
        >
          <SelectValue placeholder="Select an account">
            <Icon className='text-white font-bold text-lg' size={24}/>
            <span className={cn("ml-2 text-white text-lg font-bold select-none", false && "hidden")}>
              {
                categories.find((category) => category.categoryId === selectedCategory)
                  ?.label
              }
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.categoryId} value={category.categoryId} >
              <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                <category.icon />
                <span className={cn("ml-2 text-md", false && "hidden")}>
                  {category.label}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <TbSquareRoundedPlus
        size={34}
        onClick={() => onClick()}
        className='
          text-neutral-400
          cursor-pointer
          hover:text-white
          hover:scale-110
          transition
          font-boldbold
          rounded-lg'
      />
    </div>
    
    // <div className='inline-flex items-center justify-between px-5 pt-4 w-full absolute top-0'>
    //   <div className='inline-flex items-center gap-x-2 w-full'>
    //     <TbPlaylist className='text-neutral-400' size={26} />
    //     <h1 className='
    //             text-neutral-400
    //             font-medium
    //             text-md
    //           '>
    //       Your Library
    //     </h1>
    //   </div>
    //   <AiOutlinePlus
    //     size={26}
    //     onClick={() => onClick()}
    //     className='text-neutral-400
    //             cursor-pointer
    //             hover:text-white
    //             transition
    //           '
    //   />
    // </div>
  )
}

export default LibrarySwitcher