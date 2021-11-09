import React, { useState, useEffect } from 'react';
import TabMenuModal from './TabMenuModal';
import PersonalForm from './modal-menu-components/PersonalForm';
import AcademicForm from './modal-menu-components/AcademicForm';
import SocioEconomicForm from './modal-menu-components/SocioEconomicForm';
import SportForm from './modal-menu-components/SportsForm';
import './UserModal.scss';

const UserModal = ({ modalMenu, toggleModal, userId }) => {
    const [tab, setTab] = useState(1);
    const renderCurrentTab = () => {
        let currentTab;
        switch (tab) {
            case 1:
                currentTab = <PersonalForm userId={userId}/>;
                break;
            case 2:
                currentTab = <SocioEconomicForm userId={userId}/>;
                break;
            case 3:
                currentTab = <AcademicForm userId={userId}/>;
                break;

            default:
                currentTab = <SportForm userId={userId}/>;
                break;
        }
        return currentTab;
    };
    return (
        <div className='user-modal' onClick={e => e.stopPropagation()}>
            <div className='user-modal_container'>
                <TabMenuModal tab={tab} setTab={setTab} modalMenu={modalMenu} />
                <div className='form-container'>{renderCurrentTab()}</div>
                <button
                    className='close-modal-btn'
                    onClick={e => toggleModal(e)}
                >
                    <i className='close icon'></i>{' '}
                </button>
            </div>
        </div>
    );
};

export default UserModal;
