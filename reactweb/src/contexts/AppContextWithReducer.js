import React, {useContext, useReducer} from "react";
import {createContext} from "react";
import useLocalStorage from "lib/useLocalStorage";

export const AppContextWithReducer = createContext();

export const useAppContextWithReducer = () => useContext(AppContextWithReducer);

const initialAppState = {
  name: 'Ask Company',
};


const appStateReducer = (state, action) => {
  switch ( action.type ) {
    case RESET:
      return initialAppState;
    case SET_NAME:
      const { name } = action;
      return { ...state, name };
    default:
      throw new Error(`Unexpected action.type: ${action.type}`);
  }
};

const RESET = 'app/RESET';
const SET_NAME = 'app/setName';

export const reset = () => ({ type: RESET });
export const setName = (name) => ({ type: SET_NAME, name });

const AppProviderWithReducer = ({ children }) => {
  const [appState, dispatchAppState] = useReducer(appStateReducer, initialAppState);

  const [jwtToken, setJwtToken] = useLocalStorage('jwtToken', null);

  const value = {
    state: { appState, jwtToken },
    actions: { dispatchAppState, setJwtToken },
  };

  return (
    <AppContextWithReducer.Provider value={value}>
      {children}
    </AppContextWithReducer.Provider>
  );
};

const { Consumer: AppConsumerWithReducer } = AppContextWithReducer;

export { AppProviderWithReducer, AppConsumerWithReducer };

export default AppContextWithReducer;
