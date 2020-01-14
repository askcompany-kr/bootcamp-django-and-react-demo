import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PostList from "./components/PostList";
import LoginPage from "./components/LoginPage";
import {AppProvider} from "./AppContext";
import './App.scss';


function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="App">
          <h1>Bootcamp Django Demo</h1>

          <Switch>
            <Route exact path={"/accounts/login/"} component={LoginPage} />
            <Route component={PostList} />
          </Switch>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}


export default App;
