import React, { useState, useEffect } from 'react';

const TabMenuModal = ({ tab, setTab, modalMenu }) => {
    return (
        <div className='nav-menu-container'>
            <nav>
                {modalMenu.map((option, index) => (
                    <li
                        key={index}
                        className={option.value === tab ? 'active-menu' : ''}
                        onClick={() => setTab(option.value)}
                    >
                        <a>{option.text}</a>
                    </li>
                ))}
            </nav>
        </div>
    );
};

export default TabMenuModal;
