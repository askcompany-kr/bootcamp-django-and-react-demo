import React, {useContext, useState} from "react";
import {parse as parseQueryString} from "querystring";
import axiosInstance from "../api";
import useInputs from "../lib/useInputs";
import {AppContext} from "../AppContext";


export default function LoginPage({ history, location }) {
  const { actions: { setJwtToken } } = useContext(AppContext);
  const [inputState, onChange] = useInputs({ username: '', password : '' });
  const { username, password } = inputState;
  const [isLoading, setIsLoading] = useState(false);

  const queryString = parseQueryString(location.search.replace('?', ''));

  const login = () => {
    setIsLoading(true);

    const data = { username, password };

    axiosInstance.post("/accounts/login/", data)
      .then(response => {
        const { data: jwtToken } = response;
        setJwtToken(jwtToken);

        const { next: nextUrl } = queryString;
        history.push(nextUrl || "/");
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      Login Page

      <div>
        <input type="text" name="username" onChange={onChange}
               value={username}
               placeholder="username" />
      </div>
      <div>
        <input type="password" name="password" onChange={onChange}
               value={password}
               placeholder="password" />
      </div>

      <button onClick={login} disabled={isLoading}>Login</button>
    </div>
  );
}
