import React, { Component } from "react";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCategories,fetchSubCategories,
  fetchCartItems,deleteCartItems} from "../redux/ActionCreators";
import LoginPage from "./LoginPage";
import ProductsPage from "./ProductsPage";
import CartComponent from "./CartComponent";
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
  fetchCartItems: () => dispatch(fetchCartItems()),
  deleteCartItems: (id) => dispatch(deleteCartItems(id))
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //isCartVisible: false
    };
  }
  cartItemsCount=0

  openCart = () => {
    // this.props.fetchCartItems()
    this.props.history.push("/cart");
    // this.setState({
    //   isCartVisible: !this.state.isCartVisible,
    // });
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
    if (this.props.cartItems.cartItemsList && this.props.cartItems.cartItemsList.length>0) {
      var selectedItemsCart = this.props.cartItems.cartItemsList.reduce((a, b) => {
        var i = a.findIndex((x) => ((x.catid === b.post.catid) && (x.id === b.post.id)));
        return (
          i === -1
            ? a.push({
              queryId:b.id,
                id: b.post.id,
                times: 1,
                name: b.post.name,
                image: b.post.image,
                price: b.post.price,
                catid: b.post.catid,
              })
            : a[i].times++,
          a
        );
      }, []);
      if (selectedItemsCart) {
        var amountOfCartItems = selectedItemsCart.map((item) => {
          return item.price * item.times;
        });
      }

      if (amountOfCartItems.length > 0) {
        var totalAmountOfAllItemsInCart = amountOfCartItems.reduce(
          (total, sum) => {
            return total + sum;
          }
        );
      }
    }
    return (
      <React.Fragment>
        <div className={this.props.history.location.pathname==='/' ? "main-container base-page-background" : "main-container"}>
          <HeaderComponent
            headerTitle="$hoppingC@rt.inc"
            onClick={this.openCart}
            // isCartVisible={this.state.isCartVisible}
            cartItemsCount={this.props.cartItems.cartItemsList.length}
            fetchCartItems={this.props.fetchCartItems}
          />
          <Switch location={this.props.location}>
            <Route exact path="/" />
            <Route
              path="/products"
              component={() => (
                <ProductsPage
                  categoryDetails={this.props.Categories}
                  subcategoryItems={this.props.subcategories.subcategories}
                  // postItemsToCart={this.props.postItemsToCart}
                  cartItems={this.props.cartItems.cartItemsList}
                  // fetchCartItems={this.props.fetchCartItems}
                  // isCartVisible={this.state.isCartVisible}
                  // getCartItemsCount={this.getCartItemsCount.bind(this)}
                />
              )}
            />
            <Route
              path="/cart"
              component={() => (
                <CartComponent
                  totalAmountOfAllItemsInCart={totalAmountOfAllItemsInCart}
                  selectedItemsCart={selectedItemsCart}
                  deleteCartItems={this.props.deleteCartItems}
                  // isCartVisible={props.isCartVisible}
                  // cartItems={props.cartItems}
                  cartItems={this.props.cartItems}
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
