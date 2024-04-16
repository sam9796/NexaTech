import React, { createContext, useContext, useState } from 'react';

// Create a context
const GlobalContext = createContext();

// Define a provider component
export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(false);

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Define a custom hook to use the global state
export const useGlobalState = () => useContext(GlobalContext);



