import Header from "@/components/header/Header";
import ListItem from "@/components/ListItem";
import Image from "next/image";
import HomePage from "./home/page";
import { getSongs } from "@/actions/getSongs";

// NOTE: 代表这个页面将不会北被缓存，永远保持最新
export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs()
  return (
      <div className='flex h-full w-full'>
        <HomePage songs={songs}/>
      </div>
  );
}
