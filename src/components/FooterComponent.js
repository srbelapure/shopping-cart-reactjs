import React,{Component} from 'react';
import './PageTemplateDetails.css'

const FooterComponent =(props)=>{
    return(
        <div className='footer-section'>
            {props.footerTitle}
        </div>
    )
}

export default FooterComponent;