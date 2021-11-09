import React, { useState } from "react";
import axios from "axios";
import { validateUserName } from "../../helpers/helpers";
import {
  MESSAGE_NO_FOUND,
  MESSAGE_NO_VALID_EMAIL,
  MESSAGE_NO_VALID_PASSWORD,
  MESSAGE_NO_EQUALS,
  MESSAGE_NAME_LENGTH,
  MESSAGE_CARACTERES_NO_VALIDOS,
  MESSAGE_NO_FOUND_API,
  MESSAGE_SUCCESS_REGISTER,
  MESSAGE_EMAIL_EXISTING,
} from "./constants";
import Loading from "../common/loader";

import "./styleLogin.css";
import { BASE_URL } from "../../constantGlobal";

const FormRegister = () => {
  // hooks para el loader de la aplicacion
  const [loader, setLoader] = useState(false);

  // hooks para capturar la informacion del formulario
  const [nameComplete, setNameComplete] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // hooks para setear los diferentes errores - validaciones
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPass, setErrorConfirmPass] = useState(false);
  const [errorNoEquals, setErrorNoEquals] = useState(false);

  // hooks para setear los diferentes mensajes de validaicones
  const [messageName, setMessageName] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePasword, setMessagePassword] = useState("");
  const [messageConfirmPass, setMessageConfirmPassd] = useState("");
  const [messageNoEquals, setMessageNoEquals] = useState("");

  // hook para guardar la resuesta a la peticion register
  const [responseRequest, setResponseRequest] = useState("");
  const [errorRequest, setErrorRequest] = useState("");

  // funcion para limpiar los campor del formulario
  const clearForm = () => {
    setNameComplete("");
    setEmail("");
    setPassword("");
    setConfirmPass("");
  };

  // funcion cuando se le click al boton registrar
  const submitRegister = async () => {
    if (!nameComplete && !email && !password && !confirmPass) {
      setErrorName(true);
      setErrorEmail(true);
      setErrorPassword(true);
      setErrorConfirmPass(true);
      setMessageName(MESSAGE_NO_FOUND);
      setMessageEmail(MESSAGE_NO_FOUND);
      setMessagePassword(MESSAGE_NO_FOUND);
      setMessageConfirmPassd(MESSAGE_NO_FOUND);
    } else if (!nameComplete) {
      setErrorName(true);
      setMessageName(MESSAGE_NO_FOUND);
    } else if (!email) {
      setErrorEmail(true);
      setMessageEmail(MESSAGE_NO_FOUND);
    } else if (!password) {
      setErrorPassword(true);
      setMessagePassword(MESSAGE_NO_FOUND);
    } else if (!confirmPass) {
      setErrorConfirmPass(true);
      setMessageConfirmPassd(MESSAGE_NO_FOUND);
    } else if (!email.includes("@elpoli.edu.co")) {
      setErrorEmail(true);
      setMessageEmail(MESSAGE_NO_VALID_EMAIL);
    } else if (password.length < 8 || password.length > 12) {
      setErrorPassword(true);
      setMessagePassword(MESSAGE_NO_VALID_PASSWORD);
    } else if (password !== confirmPass) {
      setErrorNoEquals(true);
      setMessageNoEquals(MESSAGE_NO_EQUALS);
    } else if (nameComplete.length < 4 || nameComplete.length > 100) {
      setErrorName(true);
      setMessageName(MESSAGE_NAME_LENGTH);
    } else if (!validateUserName(nameComplete)) {
      setErrorName(true);
      setMessageName(MESSAGE_CARACTERES_NO_VALIDOS);
    } else {
      setLoader(true);
      const user = {
        nombre: nameComplete,
        email,
        password,
      };
      try {
        const response = await axios.post(
          `${BASE_URL}/autenticacion/registrarse`,
          user
        );
        if (response.data.codigo !== "0001") {
          setResponseRequest(response.data.codigo);
          setLoader(false);
          clearForm();
        }
      } catch (error) {
        setErrorRequest(error);
        setLoader(false);
      }
    }
  };

  return (
    <div className="container-body-form">
      {/* el titulo depende del link donde este 
          al igual que el boton. personaliar lo inputs */}
      <div className="container-form">
        <div>
          <div className="input-box">
            <input
              type="text"
              required
              onChange={({ target: { value } }) => setNameComplete(value)}
              onFocus={() => setErrorName(false)}
              value={nameComplete}
            />
            {errorName && <span className="message-alert">{messageName}</span>}
            <label>Ingresar nombre completo</label>
          </div>
          <div className="input-box">
            <input
              type="text"
              required
              onChange={({ target: { value } }) => setEmail(value)}
              onFocus={() => setErrorEmail(false)}
              value={email}
            />
            {errorEmail && (
              <span className="message-alert">{messageEmail}</span>
            )}
            <label>Ingrese su correo institucional</label>
          </div>
          <div className="input-box">
            <input
              type="password"
              required
              onChange={({ target: { value } }) => setPassword(value)}
              onFocus={() => {
                setErrorPassword(false);
                setErrorNoEquals(false);
              }}
              value={password}
            />
            {errorPassword && (
              <span className="message-alert">{messagePasword}</span>
            )}
            {errorNoEquals && (
              <span className="message-alert">{messageNoEquals}</span>
            )}
            <label>Ingrese su contraseña</label>
          </div>
          <div className="input-box">
            <input
              type="password"
              required
              onChange={({ target: { value } }) => setConfirmPass(value)}
              onFocus={() => {
                setErrorConfirmPass(false);
                setErrorNoEquals(false);
              }}
              value={confirmPass}
            />
            {errorConfirmPass && (
              <span className="message-alert">{messageConfirmPass}</span>
            )}
            <label>Confirmar contraseña</label>
          </div>
          <button className="button-submit" onClick={() => submitRegister()}>
            {loader ? <Loading /> : "REGISTRARSE"}
          </button>
        </div>
        {errorRequest !== "" && (
          <span className="message-error">{MESSAGE_NO_FOUND_API}</span>
        )}
        {responseRequest == "0000" && (
          <span className="message-success">{MESSAGE_SUCCESS_REGISTER}</span>
        )}
        {responseRequest == "0009" && (
          <span className="message-error">{MESSAGE_EMAIL_EXISTING}</span>
        )}
      </div>
    </div>
  );
};

export default FormRegister;
