import React, { 
    createContext, 
    useContext, 
    useState,
    ReactNode,
 } from 'react';

interface DarkModeContextProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(undefined);

interface DarkModeContextProviderProps {
    children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeContextProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const value: DarkModeContextProps = {
    darkMode,
    setDarkMode
  };

  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>;
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};