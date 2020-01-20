import React from "react";
import {createStore} from "redux";
import rootReducer from "../store/modules";
import {Provider} from "react-redux";


const store = createStore(rootReducer);


export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
