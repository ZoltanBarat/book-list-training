import React, { createContext, useState } from 'react'


export const UpdateIDContext = createContext();

export const UpdateIDContextProvider = ({ children }) => {
  const [updateId, setUpdateId] = useState("");

  return (
    <UpdateIDContext.Provider value={[updateId, setUpdateId]}>
      {children}
    </UpdateIDContext.Provider>
  );
};