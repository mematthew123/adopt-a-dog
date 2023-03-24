import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

interface FavoriteContextType {
  favorites: number[];
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error(
      "useFavorite must be used within a FavoriteContextProvider"
    );
  }
  return context;
};

interface FavoriteContextProviderProps {
  children: React.ReactNode;
}

export function FavoriteContextProvider({
  children,
}: FavoriteContextProviderProps) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    const savedFavorites = localStorage.getItem(`favorites-${userId}`);
    setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
  }, [userId]);

  useEffect(() => {
    localStorage.setItem(`favorites-${userId}`, JSON.stringify(favorites));
  }, [favorites, userId]);

  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
}
