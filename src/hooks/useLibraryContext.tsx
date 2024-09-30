import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Song } from '@/lib/types';
import { categories, category } from '@/lib/categories';

interface LibraryContextType {
  selectedCategory: category,
  setSelectedCategory: (category: category) => void;
  filteredSongs: Song[];
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

//MARK: useLibraryContext
export const useLibraryContext = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibraryContext must be used within a LibraryProvider");
  }
  return context;
};

// MARK: ProviderProps
interface LibraryProviderProps {
  // INFO: Songs Data
  userSongs: Song[];
  userLikedSongs?: Song[];
  userAlbums?: Song[][];
  children: ReactNode;
}

//MARK: LibraryProvider
export const LibraryProvider = ({ 
    userSongs, 
    userLikedSongs = [], 
    userAlbums = [], 
    children 
}: LibraryProviderProps) => {
  const [selectedCategory, setSelectedCategory] = useState<category>(categories[0]);

  const filteredSongs = React.useMemo(() => {
    switch (selectedCategory.label) {
      case 'Liked':
        return userLikedSongs;
      case 'Library':
        return userSongs;
      case 'Author':
        return userAlbums.flat(); // 假设 'Author' 分类是基于专辑或歌手的数据
      default:
        return userSongs;
    }
  }, [selectedCategory, userSongs, userLikedSongs, userAlbums]);

  return (
    
    <LibraryContext.Provider value={{ selectedCategory, setSelectedCategory, filteredSongs }}>
      {children}
    </LibraryContext.Provider>
  );
};