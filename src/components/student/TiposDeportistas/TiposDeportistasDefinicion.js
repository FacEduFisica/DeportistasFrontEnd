import React from 'react';
import { TIPOS_DEPORTISTAS } from './contentCards';

import './tiposDeportistas.css';

const TiposDeportistasDefinicion = ({ setViewDefinitions }) => {
    return (
        <div className='container'>
            <h1 className='title-tiposDeportistas'>Tipos de deportistas</h1>
            <div className='container-cards'>
                {TIPOS_DEPORTISTAS.map(item => (
                    <div className='card-definition'>
                        <div className='content'>
                            <span className='icon-definition'>
                                <i className={`${item.icon} icon`} />
                            </span>
                            <h3 className='title-card'>{item.title}</h3>
                        </div>
                        <div className='content-text-definition'>
                            <p className='text-definition'>
                                {item.description}
                            </p>
                            <a
                                className='button-link'
                                href={item.link}
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                CONOCE MAS...
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className='button-entendido'
                onClick={() => setViewDefinitions(false)}
            >
                ENTENDIDO <i className='check icon'></i>
            </button>
        </div>
    );
};

export default TiposDeportistasDefinicion;
