import React, {useContext} from 'react';
import {Router as BrowserRouter, Route, Switch, Redirect, NavLink} from 'react-router-dom';
import {createBrowserHistory as createHistory} from "history";
import PostList from "./components/PostList";
import LoginPage from "./components/LoginPage";
import AppContext from "./contexts/AppContext";
import axiosInstance from "./api";

import { Layout, Menu, Breadcrumb } from 'antd';

import 'antd/dist/antd.css';
import './App.scss';
import NoMatch from "./components/NoMatch";
import PhotoList from "./components/PhotoList";


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
      <Layout className={"layout"}>
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
            <Menu.Item key={"/about/"}>
              <NavLink to={"/about/"}>
                About
              </NavLink>
            </Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout.Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Blog</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ backgroundColor: '#fff', padding: 24, minHeight: 280 }}>
            <Switch>
              <Route exact path={"/"}>
                <Redirect to={"/blog/"} />
              </Route>
              <Route exact path={"/accounts/login/"} component={LoginPage}/>
              <Route exact path={"/blog/"} component={PostList}/>
              <Route exact path={"/photos/"} component={PhotoList}/>
              <Route component={NoMatch} />
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


export default App;
