import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./styleLogin.css";

const NavBarLogin = (props) => {
  console.log(props)
  return (
    <div className="form-login">
      <div className="container-header-form">
        <div>
          <h3 className="title-login">
            {props.title}
          </h3>
        </div>
        {/* Aca deben de ir NavLinks - que me indiquen 
            si estoy en el registrar o en el iniciar session */}
        <div className="container-buttons-login">
          <NavLink
            to="/"
            exact
            activeClassName="active"
            className="button-login"
          >
            INICIAR SESIÓN
          </NavLink>
          <NavLink
            to="/registrarse"
            activeClassName="active"
            className="button-register"
          >
            REGISTRARSE
          </NavLink>
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  );
};

export default NavBarLogin;
