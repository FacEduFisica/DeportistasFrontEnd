import React from "react";
import HojaLogo from "../../assets/logohv.png";
import { MESSAGE_WELCOME, MESSAGE_PCJIC } from "../../constantGlobal";

import "./welcome.css";

const Welcome = () => {
  return (
    <div className="container-welcome">
      <h1 className="title-welcome">{MESSAGE_WELCOME}</h1>
      <div className="container-logo">
        <img className="image-logo" src={HojaLogo} alt="" />
        <h3 className="siglas-logo">SGDAR</h3>
      </div>
      <span className="footer-welcome">
        {MESSAGE_PCJIC} <span> &copy; </span> 2020
      </span>
    </div>
  );
};

export default Welcome;
