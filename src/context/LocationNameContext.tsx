import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LocationDetailsContextProps {
  locationDetails: {
    name: string;
    id: string;
  }
  setLocationDetails: React.Dispatch<React.SetStateAction<{
    name: string;
    id: string;
  }>>;
}

const LocationDetailsContext = createContext<LocationDetailsContextProps | undefined>(undefined);

interface LocationDetailsContextProviderProps {
  children: ReactNode;
}

export const LocationDetailsProvider: React.FC<LocationDetailsContextProviderProps> = ({ children }) => {
  const [locationDetails, setLocationDetails] = useState<{
    name: string;
    id: string;
  }>({
    name: "",
    id: ""
  });

  return (
    <LocationDetailsContext.Provider value={{ locationDetails, setLocationDetails }}>
      {children}
    </LocationDetailsContext.Provider>
  );
};

export const useLocationDetails = () => {
  const context = useContext(LocationDetailsContext);

  if (!context) {
    throw new Error('useLocationDetails must be used within a LocationDetailsProvider');
  }

  return context;
};
