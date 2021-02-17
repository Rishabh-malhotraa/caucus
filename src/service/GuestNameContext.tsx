import React from 'react';
import { GuestNameContextTypes } from 'types';

export const GuestNameContext = React.createContext<GuestNameContextTypes | null>(
  null
);

const GuestNameProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [name, setName] = React.useState<string>('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value as string);
  };

  return (
    <GuestNameContext.Provider value={{ name, handleOnChange }}>
      {children}
    </GuestNameContext.Provider>
  );
};

export default GuestNameProvider;
