import React, {useContext} from "react";
import axiosInstance from "../api";
import useInputs from "../lib/useInputs";
import {appContext} from "../App";


export default function LoginPage() {
  const { setJwtToken } = useContext(appContext);
  const [inputState, onChange] = useInputs({ username: '', password : '' });
  const { username, password } = inputState;

  const login = () => {
    const data = { username, password };
    axiosInstance
      .post("/accounts/login/", data)
      .then(response => {
        const { data: jwt_token } = response;
        console.log(">>> jwt_token :", jwt_token);
        setJwtToken(jwt_token);
      })
    ;
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
        <input type="text" name="password" onChange={onChange}
               value={password}
               placeholder="password" />
      </div>

      <button onClick={login}>Login</button>
    </div>
  );
}