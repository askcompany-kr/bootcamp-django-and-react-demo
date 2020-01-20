import React, {useState} from 'react';
import {Layout, Menu, Breadcrumb, Alert, Input} from 'antd';
import {Router as BrowserRouter, Route, Switch, Redirect, NavLink} from 'react-router-dom';
import {createBrowserHistory as createHistory} from "history";

import {AppProvider, useAppContext} from "./contexts/AppContext";
import axiosInstance from "./api/instance";

import LoginPage from "./pages/accounts/LoginPage";
import NoMatchPage from "./pages/NoMatchPage";
import PhotoListPage from "./pages/blog/PhotoListPage";
import PostListPage from "./pages/blog/PostListPage";

import 'antd/dist/antd.css';
import './App.scss';
import LogoutPage from "./pages/accounts/LogoutPage";
import PrivateRoute from "./lib/PrivateRouter";
import ProfilePage from "./pages/accounts/ProfilePage";
import RootPage from "./pages/RootPage";

import CounterPage from "./pages/CounterPage";
import WaitingListContainer from "./containers/WaitingListContainer";
import ReduxProvider from "./contexts/ReduxProvider";


const history = createHistory();


function App() {
  const { state: { jwtToken } } = useAppContext();
  const [error, setError] = useState();

  const isAuthenticated = !!jwtToken;

  axiosInstance.interceptors.request.use(
    config => {
      setError(null);

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

      if ( !error.response ) {
        console.error(error);
        setError(error.message);
      }
      else if ( error.response.status === 401 ) {
        setTimeout(() => {
          const { location } = history;
          // const nextUrl = encodeURIComponent(pathname + search);
          // history.push(`/accounts/login/?next=${nextUrl}`);
          return <Redirect to={{ pathname: '/accounts/login/', state: { from: location } }} />;
        });
      }
      else {
        console.error(error);
      }

      return Promise.reject(error);
    }
  );

  // TODO: verify jwtToken

  return (
    <BrowserRouter history={history}>
      <Layout className={"layout"}>
        {error && <Alert message={error} type={"error"} showIcon />}
        <Layout.Header>
          <div className={"logo"} />
          <Menu theme={"dark"} mode={"horizontal"} style={{ lineHeight: '64px' }}
                defaultSelectedKeys={"/blog/"}>
            <Menu.Item key={"/blog/"}>
              <NavLink to={"/blog/"}>
                Blog
              </NavLink>
            </Menu.Item>
            <Menu.Item key={"/photos/"}>
              <NavLink to={"/photos/"}>
                Photos
              </NavLink>
            </Menu.Item>

            <Menu.Item key={"/counter/"}>
              <NavLink to={"/counter/"}>
                Counter
              </NavLink>
            </Menu.Item>
            <Menu.Item key={"/waiting/"}>
              <NavLink to={"/waiting/"}>
                Waiting
              </NavLink>
            </Menu.Item>

            <Menu.Item key={"/about/"}>
              <NavLink to={"/about/"}>
                About
              </NavLink>
            </Menu.Item>
            <Menu.Item key={"/accounts/profile/"}>
              <NavLink to={"/accounts/profile/"}>
                Profile
              </NavLink>
            </Menu.Item>

            {jwtToken &&
              <Menu.Item key={"/accounts/logout/"} style={{ float: 'right' }}>
                <NavLink to={"/accounts/logout/"}>
                  Logout
                </NavLink>
              </Menu.Item>}
          </Menu>
        </Layout.Header>
        <Layout.Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Blog</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ backgroundColor: '#fff', padding: 24, minHeight: 280 }}>
            <Switch>
              <Route exact path={"/"} component={RootPage} />
              {/*<Route exact path={"/"}>*/}
              {/*  <Redirect to={"/blog/"} />*/}
              {/*</Route>*/}
              <Route exact path={"/accounts/login/"} component={LoginPage} />
              <Route exact path={"/accounts/logout/"} component={LogoutPage} />
              <Route exact path={"/blog/"} component={PostListPage}/>
              <Route exact path={"/photos/"} component={PhotoListPage}/>
              <Route exact path={"/counter/"} component={CounterPage}/>
              <Route exact path={"/waiting/"} component={WaitingListContainer}/>
              <PrivateRoute exact path={"/accounts/profile/"} component={ProfilePage} isAuthenticated={isAuthenticated} />
              <Route component={NoMatchPage} />
            </Switch>
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Layout.Footer>
      </Layout>
    </BrowserRouter>
  );
}


export default (() => (
  <AppProvider>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </AppProvider>
));
