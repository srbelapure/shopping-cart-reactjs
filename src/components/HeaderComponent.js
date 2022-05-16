import React from 'react';
import LoginPage from './LoginPage'
import './PageTemplateDetails.css'

const HeaderComponent =({headerTitle})=>{
    return(
        <div className="header-section">
            <div>{headerTitle}</div>
            <LoginPage/>
        </div>
    )
}

export default HeaderComponent;