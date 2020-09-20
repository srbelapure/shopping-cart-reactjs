import React, { Component } from "react";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import { fetchCategories } from "../redux/ActionCreators";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
  return {
    categories: state.Categories,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCategories:() => dispatch(fetchCategories())
});

class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchCategories();
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <HeaderComponent headerTitle="$hoppingC@rt.inc" />
        hiiiiiiiiiiiiiiii
        <FooterComponent footerTitle="$hoppingC@rt.inc All Rights Reserved" />
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
);
