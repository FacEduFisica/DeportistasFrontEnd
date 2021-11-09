import React from 'react';

import './infoApp.css';

const InfoApp = ({ setOpenInfoModal }) => {
    return (
        <div className='container-info-app'>
            <div className='info-app'>
                <div className='container-title-closed-infoApp'>
                    <h3 className='title-infoApp'>SGDAR</h3>
                    <button
                        className='button-closed-infoApp'
                        onClick={() => setOpenInfoModal(false)}
                    >
                        <i className='x icon'></i>{' '}
                    </button>
                </div>

                <div className='container-text-infoApp'>
                    <p className='text-infoApp'>
                        {`SGDAR (Sistema de información para la gestión de la hoja de vida deportiva y socioeconómica de los deportistas de alto rendimiento del
                        Politécnico Colombiano Jaime Isaza Cadavid.) es un sistema creado con la finalidad de tener la información personal, socioeconómica, 
                        deportiva y acádemica de los estudiantes deportistas del Politécnico Colombiano Jaime Isaza Cadavid de una manera centralizada. `}
                    </p>

                    <p className='text-infoApp'>
                        {`Esto permite una mejor gestión de todos estos datos, generando tanto a estudiantes como administradores una mejor experiencia a la hora 
                        de diligenciar dichos datos, y la consulta de los mismos, ademas permite la generación de reportes que son de vital importancia para la 
                        institución. `}
                    </p>

                    <p className='text-infoApp'>
                        {`Con SGDAR se genera un avance imortante en la gestión de hojas de vida deportiva que se realiza en la institución, lo cual es de gran 
                        importancia ya que el Politécnico Colombiano Jaime Isaza Cadavid se destaca por su potencial deportivo. `}
                    </p>
                </div>

                <div className='container-button-infoApp'>
                    <button
                        className='button-Entendido-infoApp'
                        onClick={() => setOpenInfoModal(false)}
                    >
                        ENTENDIDO <i className='check icon'></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoApp;
