import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import BannerLogin from "./bannerLogin";
import FormLogin from "./formLogin";
import NavBarLogin from "./navBarLogin";

import "./styleLogin.css";

const Login = () => {
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    let userToken = localStorage.getItem("userToken");
    if (userToken) {
      setRedirect("/home");
    }
  }, []);

  return (
    <div className="app-login">
      <BannerLogin />
      <NavBarLogin title='Iniciar sesión'>
        <FormLogin/>
      </NavBarLogin>
      {redirect && <Redirect to={redirect} />}
    </div>
  );
};

export default Login;
