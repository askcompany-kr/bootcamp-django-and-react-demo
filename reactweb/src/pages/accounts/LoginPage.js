import React, {useContext, useState} from "react";
import {parse as parseQueryString} from "querystring";
import useInputs from "lib/useInputs";
import {AppContext} from "contexts/AppContext";
import {requestLogin} from "api/UserAPI";


export default function LoginPage({ history, location }) {
  const { actions: { setJwtToken } } = useContext(AppContext);
  const [inputState, onChange] = useInputs({ username: '', password : '' });
  const { username, password } = inputState;
  const [isLoading, setIsLoading] = useState(false);

  const queryString = parseQueryString(location.search.replace('?', ''));

  const login = () => {
    setIsLoading(true);

    const data = { username, password };

    requestLogin({ data })
      .then(jwtToken => {
        setJwtToken(jwtToken);
        const { next: nextUrl } = queryString;
        history.push(nextUrl || "/");
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
