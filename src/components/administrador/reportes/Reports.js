import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../../../services/authService';
import ReportCard from '../../common/reportes/ReportCard';
import HistoricReports from '../../common/reportes/HistoricReports';
import { BASE_URL } from '../../../constantGlobal';
import {
    REPORT_GENERAL,
    REPORT_ENTRENADOR,
    REPORT_DEPORTOLOGO,
    REPORT_FISIOTERAPEUTA
} from './constants';

import './Reports.scss';

const Reports = () => {
    // hook para saber el rol del usuario logueado
    const [url, setUrl] = useState('');

    // hook para armar el historico de reportes
    const [historicReports, setHistoricReports] = useState([]);

    // hook para armar el titulo y description del reporte general
    const [report, setReport] = useState({
        id: '',
        text: '',
        description: ''
    });

    const token = authService.getToken();
    const userId = authService.getUserId();
    const userRol = authService.getUserRole();
    const [pagination, setPagination] = useState({
        activePage: 1,
        totalPages: 1
    });
    const [updateReports, setUpdateReports] = useState(true);

    const REPORTS = [{}];

    const getHistoricReports = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/historicoreportes/${userId}?page=${pagination.activePage}&token=${token}`
            );
            if (response.data.estado && response.data.codigo === '0000') {
                setHistoricReports(response.data.reportes);
                setPagination({
                    ...pagination,
                    totalPages: response.data.pages
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (updateReports) {
            getHistoricReports();
            setUpdateReports(false);
            switch (userRol) {
                case 'DEPORTOLOGO_ROLE':
                    setUrl(
                        `${BASE_URL}/generarreporte/deportologo/${userId}?token=${token}`
                    );
                    setReport(
                        Object.assign({}, report, {
                            id: 1,
                            text: 'Planilla deportologo',
                            description: REPORT_DEPORTOLOGO
                        })
                    );
                    break;
                case 'FISIOTERAPEUTA_ROLE':
                    setUrl(
                        `${BASE_URL}/generarreporte/fisioterapeuta/${userId}?token=${token}`
                    );
                    setReport(
                        Object.assign({}, report, {
                            id: 1,
                            text: 'Planilla fisioterapeuta',
                            description: REPORT_FISIOTERAPEUTA
                        })
                    );
                    break;
                case 'ENTRENADOR_ROLE':
                    setUrl(
                        `${BASE_URL}/generarplanilla/entrenador/${userId}?token=${token}`
                    );
                    setReport(
                        Object.assign({}, report, {
                            id: 1,
                            text: 'Planilla entrenador',
                            description: REPORT_ENTRENADOR
                        })
                    );
                    break;
                case 'ADMINISTRADOR_ROLE':
                    setUrl(
                        `${BASE_URL}/generarreporte/general/${userId}?token=${token}`
                    );
                    setReport(
                        Object.assign({}, report, {
                            id: 1,
                            text: 'Reporte general',
                            description: REPORT_GENERAL
                        })
                    );
                    break;
                case 'CONSULTOR_ROLE':
                    setUrl(
                        `${BASE_URL}/generarreporte/general/${userId}?token=${token}`
                    );
                    setReport(
                        Object.assign({}, report, {
                            id: 2,
                            text: 'Reporte general',
                            description: REPORT_GENERAL
                        })
                    );
                    break;

                default:
                    break;
            }
        }
    }, [updateReports]);

    const handlePaginationChange = (e, { activePage }) => {
        setPagination({ ...pagination, activePage });
        setUpdateReports(true);
    };

    return (
        <div className='reports-container'>
            <h1 className='title-form'>Generación de reportes</h1>
            <div className='report-cards_container'>
                <ReportCard key={report.id} url={url} report={report} />
            </div>
            {historicReports.length > 0 ? (
                <HistoricReports
                    reports={historicReports}
                    activePage={pagination.activePage}
                    onPageChange={handlePaginationChange}
                    totalPages={pagination.totalPages}
                />
            ) : (
                <div>
                    <p>No hay reportes generados</p>
                </div>
            )}
        </div>
    );
};

export default Reports;
