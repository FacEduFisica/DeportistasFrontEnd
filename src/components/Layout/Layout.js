import React from 'react';
import SideBar from './sidebar/SideBar';
import './Layout.scss';

const Layout = props => {
    return (
        <div className='app-layout-container'>
            <SideBar />
            <div className='app-layout-principal_content'>{props.children}</div>
        </div>
    );
};

export default Layout;
