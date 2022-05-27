import React from 'react';
import LoginPage from './LoginPage'
import Badge from 'react-bootstrap/Badge'
import './PageTemplateDetails.css'

const HeaderComponent =({headerTitle,onClick,isCartVisible,cartItemsCount})=>{
    return (
      <div className="header-section">
        <div>E-cart</div>
        <LoginPage />
        <div className='cart-button'>
          <button
            // className="show-cart-button"
            onClick={onClick}
            // disabled={isCartVisible}
          >
            <Badge pill bg="warning" text="dark">
              {cartItemsCount}
            </Badge>
            Cart
            {/* {isCartVisible ? "Hide Cart" : "Show Cart"} */}
          </button>
        </div>
      </div>
    );
}

export default HeaderComponent;