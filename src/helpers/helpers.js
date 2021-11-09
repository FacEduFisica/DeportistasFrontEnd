import axios from 'axios';
import { sweetAlert } from '../components/actionsGlobals';
import { BASE_URL, ERROR } from '../constantGlobal';
import authService from '../services/authService';

export const validateUserName = name => {
    let nameRegExp = new RegExp(/^[A-Za-z\s]+$/g);
    return nameRegExp.test(name);
};

export const downloadReports = reportName => {
    const token = authService.getToken();
    axios
        .get(`${BASE_URL}/descargarreporte/${reportName}?token=${token}`, {
            responseType: 'arraybuffer'
        })
        .then(res => {
            const type = res.headers['content-type'];
            if (!type.includes('json')) {
                const url = window.URL.createObjectURL(
                    new Blob([res.data], {
                        type:
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    })
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${reportName}`);
                document.body.appendChild(link);
                link.click();
            } else {
                sweetAlert(
                    ERROR,
                    '¡Alerta!',
                    'Hubo un error intentando obtener el informe.'
                );
            }
        })
        .catch(error => {
            console.log(error);
            sweetAlert(
                ERROR,
                '¡Alerta!',
                'Hubo un error intentando obtener el informe.'
            );
        });
};

export const filterByName = (value, array, attribute) => {
    if(value !== '' && !Number(value)){
        let filteredArray = array.filter(element => element[attribute].toLowerCase().includes(value.toLowerCase()))
        return filteredArray
    }else if ( Number(value)){
        
        let filteredArray = array.filter(element => element[attribute].toString().includes(value))
        return filteredArray
    }
    return array
}
