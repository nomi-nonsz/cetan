import { createContext, ReactNode, useContext, useState } from 'react';

// Definisikan tipe data untuk konteks
interface AppContextProps {
  count: number;
  increment: () => void;
}

// Buat konteks dengan nilai default
export const AppContext = createContext<AppContextProps | undefined>(undefined);

// Fungsi penggunaan kustom untuk menggunakan konteks
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

// Komponen penyedia konteks
export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount(count + 1);
  };

  const contextValue: AppContextProps = {
    count,
    increment,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
