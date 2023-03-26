import { createContext, useContext, useState, useEffect } from "react";

export interface Favorite {
  userId: string;
  animalId: number;
}

export interface FavoriteContextData {
  favorites: Favorite[];
  toggleFavorite: (userId: string, animalId: number) => void;
  getUserFavorites: (userId: string) => Favorite[];
}

const FavoriteContext = createContext<FavoriteContextData>({
  favorites: [],
  toggleFavorite: () => {},
  getUserFavorites: () => [],
});

interface FavoriteContextProviderProps {
  children: React.ReactNode;
}

export const FavoriteContextProvider: React.FC<FavoriteContextProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
  
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  
  const getUserFavorites = (userId: string) => {
    return favorites.filter((fav) => fav.userId === userId);
  };
  

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (userId: string, animalId: number) => {
    setFavorites((prevFavorites) => {
      const existingFavorite = prevFavorites.find(
        (fav) => fav.userId === userId && fav.animalId === animalId
      );

      if (existingFavorite) {
        const updatedFavorites = prevFavorites.filter(
          (fav) => fav !== existingFavorite
        );
        return updatedFavorites;
      } else {
        const updatedFavorites = [...prevFavorites, { userId, animalId }];
        return updatedFavorites;
      }
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, getUserFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
  }  

export const useFavorite = () => useContext(FavoriteContext);
