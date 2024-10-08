import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/sidebar/Sidebar";
import SupabaseProvider from "@/provider/supabase-provider";
import UserProvider from "@/provider/user-provider";
import ModalProvider from "@/provider/ModalProvider";
import ToasterProvider from "@/provider/toaster-provider";
import { getSongsByUserId } from "@/actions/getSongsByUserId";
import Player from "@/components/player/Player";
import { getLikedSongs } from "@/actions/getLikedSongs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Neptune",
  description: "Enjoy music with spotify",
};

// NOTE: 不缓存此页面，保持最新状态
export const revalidate = 0;

// MARK: RootLayout
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const userSongs = await getSongsByUserId()
  const userLikedSongs = await getLikedSongs()

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar 
              userSongs={userSongs}
              userLikedSongs={userLikedSongs}
            >
              {children}
              <Player />
            </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
