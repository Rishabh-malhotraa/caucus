import React from "react";
import { GuestNameContextTypes } from "types";
import generate from "dog-names";

export const GuestNameContext = React.createContext<GuestNameContextTypes | null>(null);

const GuestNameProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [guestName, setGuestName] = React.useState<string>(generate.allRandom());
  const [guestLoginClick, setGuestLoginClick] = React.useState<boolean>(false);

  const isGuestNameClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setGuestLoginClick(guestName ? true : false);
  };

  const handleGuestNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setGuestName(e.target.value as string);
  };

  return (
    <GuestNameContext.Provider
      value={{ guestName, handleGuestNameChange, guestLoginClick, isGuestNameClick }}
    >
      {children}
    </GuestNameContext.Provider>
  );
};

export default GuestNameProvider;
