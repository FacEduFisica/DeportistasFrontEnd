import React from 'react';
import axios from 'axios';
import './ReportCard.scss';
import { downloadReports } from '../../../helpers/helpers';

const ReportCard = ({ url, report}) => { 

    const handleDownload = async () => {
        try {
            const response = await axios.get(url);
            if (response.data.estado && response.data.codigo === '0000') {
                downloadReports(response.data.nombreArchivo);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='report-card'>
            <div className='report-info'>
                <h2>{report.text}</h2>
                <p>{report.description}</p>
            </div>
            <div className='report-action'>
                <button onClick={() => handleDownload()}>
                    <i className='download icon'></i>
                </button>
            </div>
        </div>
    );
};

export default ReportCard;
