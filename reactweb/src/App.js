import React, {useContext} from 'react';
import {Router as BrowserRouter, Route, Switch} from 'react-router-dom';
import {createBrowserHistory as createHistory} from "history";
import PostList from "./components/PostList";
import LoginPage from "./components/LoginPage";
import AppContext from "./AppContext";
import axiosInstance from "./api";

import './App.scss';


const history = createHistory();


function App() {
  const { state: { jwtToken } } = useContext(AppContext);

  axiosInstance.interceptors.request.use(
    config => {
      // Do something before request is sent
      if ( jwtToken )
        config.headers.common['Authorization'] = `Token ${jwtToken}`;
      return config;
    },
    undefined,
  );

  axiosInstance.interceptors.response.use(
    undefined,
    error => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      if ( error.response.status === 401 ) {
        setTimeout(() => {
          const { location: { pathname, search } } = history;
          const nextUrl = encodeURIComponent(pathname + search);
          history.push(`/accounts/login/?next=${nextUrl}`);
        });
      }
      else {
        console.error(error);
      }

      return Promise.reject(error);
    }
  );

  return (
    <BrowserRouter history={history}>
      <div className="App">
        <h1>Bootcamp Django Demo</h1>

        <Switch>
          <Route exact path={"/accounts/login/"} component={LoginPage}/>
          <Route component={PostList}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}


export default App;
