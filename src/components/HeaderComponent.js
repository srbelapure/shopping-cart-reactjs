import React,{Component} from 'react';
import './PageTemplateDetails.css'

const HeaderComponent =({headerTitle})=>{
    return(
        <div className="header-section">
            {headerTitle}
        </div>
    )
}

export default HeaderComponent;