import React, { Component } from "react";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCategories,fetchSubCategories ,postItemsToCart} from "../redux/ActionCreators";
import LoginPage from "./LoginPage";
import ProductsPage from "./ProductsPage";

import Test from './test11'
//once we connect the mapStateToProps to the component with connect(), mapStateToProps gets state as an argument
const mapStateToProps = (state) => {
  return {
    Categories: state.Categories,
    subcategories: state.subcategories
  };
};

//once we connect mapDispatchToProps to component with connect(),mapDispatchToProps gets dispatch as an argument
const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchSubCategories:()=>dispatch(fetchSubCategories()),
  postItemsToCart:(additemstocart)=>dispatch(postItemsToCart(additemstocart))
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchSubCategories();
    this.props.fetchCategories();
  }

  render() {
    return (
      <React.Fragment>
        <HeaderComponent headerTitle="$hoppingC@rt.inc"/>
        <Switch location={this.props.location}>
          <Route exact path="/" component={LoginPage} />
          <Route
            path="/products"
            component={() => (
              <ProductsPage
                categoryDetails={this.props.Categories.categories}
                subcategoryItems={this.props.subcategories.subcategories}
                postItemsToCart={this.props.postItemsToCart}
              />
            )}
          />
        </Switch>
        <FooterComponent footerTitle="$hoppingC@rt.inc All Rights Reserved" />
      </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
