import React, {useEffect} from "react";
import {useAppContext} from "../../contexts/AppContext";
import {Button} from "antd";
import {NavLink} from "react-router-dom";


export default function LogoutPage() {
  const { actions: { setJwtToken } } = useAppContext();

  useEffect(() => {
    setJwtToken(null);
  }, []);

  return (
    <div>
      Logged out.
      <hr />
      <NavLink to={"/"}>
        Go to home.
      </NavLink>
    </div>
  );
}
