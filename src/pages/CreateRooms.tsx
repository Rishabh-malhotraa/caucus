import React from 'react';
import { v1 as uuid } from 'uuid';

const CreateRooms = (props: any) => {
  const create = () => {
    const id = uuid();
    props.history.push(`/room/${id}`);
  };
  return (
    <div>
      <button onClick={create}></button>
    </div>
  );
};

export default CreateRooms;
