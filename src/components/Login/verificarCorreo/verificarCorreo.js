import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { sweetAlert } from '../../actionsGlobals';
import { BASE_URL, SUCCESS, WARNING } from '../../../constantGlobal';
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router";

const StatusEmail =  (props) => {  

    const [newToken] = useState({
        token: props.match.params.token
    });

    const status = async () => { 

            try {            
                    const response = await axios.get(`${BASE_URL}/confirmacion/${props.match.params.token}`, newToken);  
                    console.log(response.data.codigo);

                    if(response.data.codigo === '0000'){
                        sweetAlert(SUCCESS, "¡Éxito!" , "Cuenta verificada, ya puede iniciar sesión con sus credenciales.");
                    }

                    if(response.data.codigo !== '0000'){
                        sweetAlert(WARNING, 'Atención', "¡La cuenta ya ha sido verificada o el link ha expirado!");
                    }                    

                    sweetAlert.onClick(loginSession());

                } catch (error) {
                    console.log(error)
                }
        };

            const [redirect, setRedirect]= useState("");
            const loginSession = () => {
                setRedirect("/");
            };    

    useEffect(() => {
        status();
    }, []);


    return (
        <div>
                {redirect && <Redirect to={redirect} />}            
        </div>
    );
};

export default withRouter(StatusEmail);