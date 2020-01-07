import React, {createContext} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PostList from "./components/PostList";

import './App.scss';
import LoginPage from "./components/LoginPage";
import useLocalStorage from "./lib/useLocalStorage";


export const appContext = createContext();


function App() {
  const [jwtToken, setJwtToken] = useLocalStorage('jwtToken', null);

  return (
    <appContext.Provider value={{ jwtToken, setJwtToken }}>
      <BrowserRouter>
        <div className="App">
          <h1>Bootcamp Django Demo</h1>

          <Switch>
            <Route exact path={"/accounts/login/"} component={LoginPage} />
            <Route component={PostList} />
          </Switch>
        </div>
      </BrowserRouter>
    </appContext.Provider>
  );
}


export default App;
