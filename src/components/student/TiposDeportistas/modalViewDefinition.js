import React, { useState } from "react";

import "./modalViewDefinition.css";

const ModalViewDefinition = ({
  setShowModalDefinition,
  setViewModalDefinition,
  setViewDefinitions,
}) => {
  return (
    <div className="container-modal-definition">
      <div className="viewDefinition">
        <h1 className="title-viewDefinition">
          ¿Conoce los tipos de deportistas?
        </h1>
        <div className="container-buttons-definition">
          <button
            className="button-ok-definition"
            onClick={() => {
              setShowModalDefinition(true);
              setViewModalDefinition(false);
            }}
          >
            SI
          </button>
          <button
            className="button-no-definition"
            onClick={() => {
              setViewDefinitions(true);
              setViewModalDefinition(false);
              setShowModalDefinition(true);
            }}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalViewDefinition;
