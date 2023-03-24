export interface FavoriteContextProps {
    favorites: any[];
    totalFavorites: number;
    addFavorite: (favoriteAnimal: any) => void;
    removeFavorite: (favoriteAnimalId: string) => void;
    itemIsFavorite: (favoriteAnimalId: string) => boolean;
  }
  
  export interface FavoriteContextProviderProps {
    children: any;
  }
  