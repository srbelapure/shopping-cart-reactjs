import React, { Component } from "react";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import { fetchCategories } from "../redux/ActionCreators";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStore, bindActionCreators } from "redux";

class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        hiiiiiiiiiiiiiiii
      </div>
    );
  }
}

export default ProductsPage;
