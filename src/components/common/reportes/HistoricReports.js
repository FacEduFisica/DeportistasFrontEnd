import React from 'react';
import './HistoricReports.scss';
import moment from 'moment';
import { downloadReports } from '../../../helpers/helpers';
import { Pagination } from 'semantic-ui-react';

const HistoricReports = ({ reports, activePage, onPageChange, totalPages }) => {
    const ReportRow = ({ report }) => {
        return (
            <div key={report._id} className='historic-report-row'>
                <div className='historic-report-info'>
                    <p>{report.nombreArchivo}</p>
                    <span>{moment(report.fecha).format('DD-MM-YYYY')}</span>
                </div>
                <div className='historic-report-action'>
                    <button
                        onClick={() => downloadReports(report.nombreArchivo)}
                    >
                        <i className='download icon'></i>
                    </button>
                </div>
            </div>
        );
    };
    return (
        <div className='historic-reports-list'>
            <h2>Histórico de reportes generados</h2>
            <div className='reports-list'>
                {reports.map(report => (
                    <ReportRow key={report._id} report={report} />
                ))}
                <div>
                <Pagination
                    activePage={activePage}
                    onPageChange={onPageChange}
                    totalPages={totalPages}
                    className='pagination-app'
                />
                </div>
            </div>
        </div>
    );
};

export default HistoricReports;
