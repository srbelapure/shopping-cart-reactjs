import React, { Component } from "react";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCategories,fetchSubCategories,
  fetchCartItems} from "../redux/ActionCreators";
import LoginPage from "./LoginPage";
import ProductsPage from "./ProductsPage";
import './ComponentStyles.css'


//once we connect the mapStateToProps to the component with connect(), mapStateToProps gets state as an argument
const mapStateToProps = (state) => {
  return {
    Categories: state.Categories,
    subcategories: state.subcategories,
    cartItems: state.cart_Items
  };
};

//once we connect mapDispatchToProps to component with connect(),mapDispatchToProps gets dispatch as an argument
const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchSubCategories:()=>dispatch(fetchSubCategories()),
  fetchCartItems: () => dispatch(fetchCartItems())
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartVisible: false
    };
  }
  cartItemsCount=0

  openCart = () => {
    // this.props.fetchCartItems()
    // this.props.history.push("/cart");
    this.setState({
      isCartVisible: !this.state.isCartVisible,
    });
  };

  componentDidMount() {
    this.props.fetchSubCategories();
    this.props.fetchCategories();
    this.props.fetchCartItems()
  }

  // getCartItemsCount = (countValue) => {
  //   this.cartItemsCount=countValue.length
  // };

  render() {
    return (
      <React.Fragment>
        <div className="main-container">
          <HeaderComponent
            headerTitle="$hoppingC@rt.inc"
            onClick={this.openCart}
            isCartVisible={this.state.isCartVisible}
            cartItemsCount={this.props.cartItems.cartItemsList.length}
            fetchCartItems={this.props.fetchCartItems}
          />
          <Switch location={this.props.location}>
            <Route exact path="/" />
            <Route
              path="/products"
              component={() => (
                <ProductsPage
                  categoryDetails={this.props.Categories.categories}
                  subcategoryItems={this.props.subcategories.subcategories}
                  // postItemsToCart={this.props.postItemsToCart}
                  cartItems={this.props.cartItems.cartItemsList}
                  // fetchCartItems={this.props.fetchCartItems}
                  isCartVisible={this.state.isCartVisible}
                  // getCartItemsCount={this.getCartItemsCount.bind(this)}
                />
              )}
            />
          </Switch>
          <FooterComponent footerTitle="$hoppingC@rt.inc All Rights Reserved" />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
