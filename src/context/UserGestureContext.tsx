import React, { 
    createContext, 
    useContext, 
    useState,
    ReactNode,
 } from 'react';

interface UserGestureContextProps {
  userGesture: boolean;
  setUserGesture: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserGestureContext = createContext<UserGestureContextProps | undefined>(undefined);

interface UserGestureContextProviderProps {
    children: ReactNode;
}

export const UserGestureProvider: React.FC<UserGestureContextProviderProps> = ({ children }) => {
  const [userGesture, setUserGesture] = useState<boolean>(false);

  const value: UserGestureContextProps = {
    userGesture,
    setUserGesture
  };

  return <UserGestureContext.Provider value={value}>{children}</UserGestureContext.Provider>;
};

export const useUserGestureContext = () => {
  const context = useContext(UserGestureContext);
  if (!context) {
    throw new Error('useUserGesture must be used within a UserGestureProvider');
  }
  return context;
};