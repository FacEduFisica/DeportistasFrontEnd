import React from "react";

import "./consultaDatosModal.css";

const ConsultaDatosSocioeconomicos = ({ setModalConsulta, requestConsulta }) => {
  return (
      <div className='container-modal-consulta'>
          <div className='hoja' style={{height : 400}}>
              <div className='container-title-closed'>
                  <h2 className='title-consulta'> Mis datos socioeconomicos</h2>
                  <button
                      className='button-closed'
                      onClick={() => setModalConsulta(false)}
                  >
                      <i className='x icon'></i>{' '}
                  </button>
              </div>
              <div className='container-text' style={{height : 280 }}>
                  <div className='container-row-socioeconomicos'>
                      <span className='text-consuta'>
                          País:
                          <span className='content-text'>{`  ${requestConsulta.pais} `}</span>
                      </span>
                      <span className='text-consuta'>
                          Departamento:
                          <span className='content-text'>{`  ${requestConsulta.departamento} `}</span>
                      </span>
                      <span className='text-consuta'>
                          Municipio:
                          <span className='content-text'>{`  ${requestConsulta.municipio}`}</span>
                      </span>
                  </div>

                  <div className='container-row-socioeconomicos'>
                      <span className='text-consuta'>
                          Barrio:
                          <span className='content-text'>{`  ${requestConsulta.barrio}`}</span>
                      </span>
                      <span className='text-consuta'>
                          Direccion:
                          <span className='content-text'>{`  ${requestConsulta.direccion}`}</span>
                      </span>
                      <span className='text-consuta'>
                          Estrato:
                          <span className='content-text'>{`  ${requestConsulta.estrato}`}</span>
                      </span>
                  </div>

                  <div className='container-row-socioeconomicos'>
                      <span className='text-consuta'>
                          Teléfono:
                          <span className='content-text'>{`  ${requestConsulta.telefono}`}</span>
                      </span>
                      <span className='text-consuta'>
                          Celular:
                          <span className='content-text'>{`  ${requestConsulta.celular}`}</span>
                      </span>
                      <span className='text-consuta'>
                          Correo:
                          <span className='content-text'>{`  ${requestConsulta.correo}`}</span>
                      </span>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default ConsultaDatosSocioeconomicos;
