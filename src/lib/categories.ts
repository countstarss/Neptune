import { GrUserManager } from 'react-icons/gr';
import { RiHeart2Line } from "react-icons/ri";
import { HiLibrary } from 'react-icons/hi';
import { IconType } from 'react-icons';

// MARK: Accounts
export const categories = [
  {
    categoryId:'1',
    label: "Library",
    icon: HiLibrary
  },
  {
    categoryId:'2',
    label: "Liked",
    icon: RiHeart2Line
  },
  {
    categoryId:'3',
    label: "Author",
    icon: GrUserManager
  },
]

export interface category{
  categoryId:string,
  label:string
  icon: IconType
}