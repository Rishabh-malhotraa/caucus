import React from 'react';
import { v1 as uuid } from 'uuid';
import { SnackbarProvider } from 'notistack';
import Home from 'pages/Home';
export const NotificationWrappedHome = () => {
  return (
    <SnackbarProvider>
      <Home />
    </SnackbarProvider>
  );
};

const CreateRooms = (props: any) => {
  // const id = uuid();
  const id = 1;
  props.history.push(`/room/${id}`);
  return <NotificationWrappedHome />;
};

export default CreateRooms;
