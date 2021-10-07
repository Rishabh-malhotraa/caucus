import React from "react";
import { RoomIDContextTypes } from "types";

export const RoomIDContext = React.createContext<RoomIDContextTypes>({ roomID: "", setRoomID: () => "" });

const RoomIDProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [roomID, setRoomID] = React.useState("");

  return (
    <RoomIDContext.Provider
      value={{
        roomID,
        setRoomID,
      }}
    >
      {children}
    </RoomIDContext.Provider>
  );
};

export const useRoomID = (): RoomIDContextTypes => {
  const contextValue = React.useContext(RoomIDContext);
  if (contextValue === undefined) {
    throw new Error("useRoomId must be used within RoomIdProvider");
  }

  return contextValue;
};

export default RoomIDProvider;
