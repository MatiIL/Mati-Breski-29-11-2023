import React, { 
    createContext, 
    useContext, 
    useState,
    ReactNode,
 } from 'react';

interface TempUnitContextProps {
  isFahrenheit: boolean;
  setIsFahrenheit: React.Dispatch<React.SetStateAction<boolean>>;
}

const TempUnitContext = createContext<TempUnitContextProps | undefined>(undefined);

interface TempUnitContextProviderProps {
    children: ReactNode;
}

export const TempUnitProvider: React.FC<TempUnitContextProviderProps> = ({ children }) => {
  const [isFahrenheit, setIsFahrenheit] = useState<boolean>(false);

  const value: TempUnitContextProps = {
    isFahrenheit,
    setIsFahrenheit
  };

  return <TempUnitContext.Provider value={value}>{children}</TempUnitContext.Provider>;
};

export const useTempUnitContext = () => {
  const context = useContext(TempUnitContext);
  if (!context) {
    throw new Error('useTempUnit must be used within a TempUnitProvider');
  }
  return context;
};