import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import BannerLogin from "./bannerLogin";
import FormRegister from "./formRegister";
import NavBarLogin from "./navBarLogin";

const Register = () => {
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
      <NavBarLogin title='Registrarse'>
        <FormRegister />
      </NavBarLogin>
      {redirect && <Redirect to={redirect} />}
    </div>
  );
};

export default Register;
