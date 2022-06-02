import React,{useState} from 'react';
import LoginPage from './LoginPage'
import Badge from 'react-bootstrap/Badge'
import { useHistory } from "react-router-dom";
// import './PageTemplateDetails.css'
import './ComponentStyles.css'

const HeaderComponent =({headerTitle,onClick,isCartVisible,cartItemsCount})=>{
  const [userDetail, setUserDetail] = useState()
  const history = useHistory();
  const isUserLoggedIn =(val)=>{
      setUserDetail(val)
  }
    return (
      <div className="header-section">
        <div
          onClick={() => history.push("/products")}
          style={{ cursor: "pointer" }}
        >
          E-cart
        </div>
        <LoginPage isUserLoggedIn={(val) => isUserLoggedIn(val)} />
        {userDetail && userDetail.displayName && (
          <div className="cart-button">
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
        )}
      </div>
    );
}

export default HeaderComponent;