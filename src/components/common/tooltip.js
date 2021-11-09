import React from 'react';

import './tooltip.css';

const Tooltip = ({ text , icon }) => {
    return (
        <div className='tooltip'>
            <i className={`${icon} icon`}></i>
            <span className='tooltiptext'>{text}</span>
        </div>
    );
};

export default Tooltip;

