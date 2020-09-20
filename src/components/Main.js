import React, { Component } from "react";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCategories } from "../redux/ActionCreators";
import LoginPage from "./LoginPage";
import ProductsPage from "./ProductsPage";

//once we connect the mapStateToProps to the component with connect(), mapStateToProps gets state as an argument
const mapStateToProps = (state) => {
  return {
    Categories: state.Categories,
  };
};

//once we connect mapDispatchToProps to component with connect(),mapDispatchToProps gets dispatch as an argument
const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories())
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div>
        <HeaderComponent headerTitle="$hoppingC@rt.inc" />
        <Switch location={this.props.location}>
          <Route exact path="/" component={LoginPage} />
          <Route path="/products" component={ProductsPage} />
        </Switch>
        <FooterComponent footerTitle="$hoppingC@rt.inc All Rights Reserved" />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
