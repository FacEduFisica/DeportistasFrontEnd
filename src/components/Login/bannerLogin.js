import React from "react";
import BannerPoli from "../../assets/bannerPoli.png";
import BackgroundPoli from "../../assets/background.png";
import { MISION_POLITECNICO } from "./constants";

import "./styleLogin.css";
import "./mediaSocial.css";
import "../../icons/icons.css";

const BannerLogin = () => {
  return (
    <div className="banner-login">
      <div className="container-images">
        <img className="background-banner" src={BackgroundPoli} alt="" />
        <img className="logo-poli" src={BannerPoli} alt="" />
      </div>
      <div className="figura-banner">
        {/* pensar em qie contenido se le puede poner al abajo*/}
        <span className="mision-poli">{MISION_POLITECNICO}</span>
        <div className="container-icons">
          <ul className="list-icons">
            <li className="item-list-icons">
              <a
                className="follow"
                href="https://www.facebook.com/polijic/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon-facebook"></span>
              </a>
            </li>
            <li className="item-list-icons">
              <a
                className="follow"
                href="https://www.youtube.com/channel/UCLSaxR0qrhvgCg2SUVW84FQ/videos"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon-youtube"></span>
              </a>
            </li>
            <li className="item-list-icons">
              <a
                className="follow"
                href="https://twitter.com/politecnicoJIC"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon-twitter"></span>
              </a>
            </li>
            <li className="item-list-icons">
              <a
                className="follow"
                href="https://www.instagram.com/politecnicojic/?hl=es-la"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon-instagram"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BannerLogin;
