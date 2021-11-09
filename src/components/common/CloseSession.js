import React, { useState, useEffect, Fragment } from "react";
import authService from "../../services/authService";
import { Redirect } from "react-router";

const CloseSession = () => {
  const [redirect, setRedirect] = useState("");
  const handleCloseSession = () => {
    authService.logout();
    setRedirect("/");
  };
  return (
    <Fragment>
      <div className="container-logout" onClick={() => handleCloseSession()}>
        <p>
        CERRAR SESIÓN
        </p>
      </div>
      {redirect && <Redirect to={redirect} />}
    </Fragment>
  );
};

export default CloseSession;
