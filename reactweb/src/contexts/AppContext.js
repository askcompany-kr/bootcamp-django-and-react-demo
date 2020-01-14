import React from "react";
import {createContext, useState} from "react";
import useLocalStorage from "../lib/useLocalStorage";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [name, setName] = useState('Ask Company');
  const [jwtToken, setJwtToken] = useLocalStorage('jwtToken', null);

  const value = {
    state: { name, jwtToken },
    actions: { setName, setJwtToken },
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

const { Consumer: AppConsumer } = AppContext;

export { AppProvider, AppConsumer };

export default AppContext;
