import React from "react";
import {createStore} from "redux";
import rootReducer from "../store/modules";
import {Provider} from "react-redux";


// FIXME: redux-devtools-extension 활용하기
const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devToolsExtension);


export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
