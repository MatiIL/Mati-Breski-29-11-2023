import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FavoritesContextProps {
  favorites: { id: string; name: string }[];
  addToFavorites: (location: { id: string; name: string }) => void;
  removeFromFavorites: (locationId: string) => void;
  isLocationInFavorites: (locationId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

interface FavoritesContextProviderProps {
  children: ReactNode;
}

export const FavoritesContextProvider: React.FC<FavoritesContextProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<{ id: string; name: string }[]>([]);

  const addToFavorites = (location: { id: string; name: string }) => {
    setFavorites((prevFavorites) => [...prevFavorites, location]);
  };

  const removeFromFavorites = (locationId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((location) => location.id !== locationId)
    );
  };

  const isLocationInFavorites = (locationId: string) => {
    return favorites.some((location) => location.id === locationId);
  };

  const contextValue: FavoritesContextProps = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isLocationInFavorites,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesContextProvider');
  }

  return context;
};