import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import "./PageTemplateDetails.css";
import {
  postItemsToCart,
  fetchCartItems,
  deleteCartItems,
} from "../redux/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import LoaderComponent from "./LoaderComponent";
import CartComponent from "./CartComponent";

//once we connect the mapStateToProps to the component with connect(), mapStateToProps gets state as an argument
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart_Items,
  };
};

//once we connect mapDispatchToProps to component with connect(),mapDispatchToProps gets dispatch as an argument
const mapDispatchToProps = (dispatch) => ({
  fetchCartItems: () => dispatch(fetchCartItems()),
  postItemsToCart: (id, categoryid, name, image, date, price, size) =>
    dispatch(postItemsToCart(id, categoryid, name, image, date, price, size)),
  deleteCartItems: (id) => dispatch(deleteCartItems(id)),
});

class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subCategoryList: [],
      addSelectedItemsToCart: [],
      totalBillAmountFOrSelectedItems: 0
    };
  }

  componentWillMount() {
    console.log("Component WILL MOUNT!");
  }
  componentDidMount() {
    console.log("Component DID MOUNT!");
  }
  componentWillReceiveProps(newProps) {
    console.log("Component WILL RECIEVE PROPS!");
  }
  shouldComponentUpdate(newProps, newState) {
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log(
      "Component WILL UPDATE nextProps, nextState!");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(
      "Component DID UPDATE prevProps, prevState!");
  }
  componentWillUnmount() {
    console.log("Component WILL UNMOUNT!");
  }

  handleButtonClick(id) {
    if (id === 0) {
      this.setState({
        subCategoryList: this.props.subcategoryItems.filter(
          (item) => item.catid === 0
        ),
      });
    } else if (id === 1) {
      this.setState({
        subCategoryList: this.props.subcategoryItems.filter(
          (item) => item.catid === 1
        ),
      });
    } else if (id === 2) {
      this.setState({
        subCategoryList: this.props.subcategoryItems.filter(
          (item) => item.catid === 2
        ),
      });
    }
  }

  addToCartHandleClick = (item) => {
    this.props.postItemsToCart(
      item.id,
      item.catid,
      item.name,
      item.image,
      item.date,
      item.price,
      item.size
    );
    //we have tried to use a callback in this setState, so that updated value of state is available immediately
    // Generally setState is asynchronous so it is not possible to get updated value immediately
    // this.setState(
    //   {
    //     addSelectedItemsToCart: [...this.state.addSelectedItemsToCart, item],
    //   }
  };

  render() {
    var itemsListFromServer = this.props.cartItems.cartItemsList;
    if (itemsListFromServer && itemsListFromServer[0]) {
      var selectedItemsCart = itemsListFromServer.reduce((a, b) => {
        var i = a.findIndex((x) => x.name === b.name);
        return (
          i === -1
            ? a.push({
                id: b.id,
                times: 1,
                name: b.name,
                image: b.image,
                price: b.price,
                catid: b.catid,
                size: b.size,
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
      <div className="container-section">
        <CartComponent
          totalAmountOfAllItemsInCart={totalAmountOfAllItemsInCart}
          selectedItemsCart={selectedItemsCart}
          fetchCartItems={this.props.fetchCartItems}
          deleteCartItems={this.props.deleteCartItems}
        />
        <div className="category-items">
          {this.props.categoryDetails ? (
            this.props.categoryDetails.map((item) => {
              return (
                <div key={item.id} className="category-options">
                  <button onClick={() => this.handleButtonClick(item.id)}>
                    {item.title}
                  </button>
                </div>
              );
            })
          ) : (
            <LoaderComponent />
          )}
        </div>
        <div className="sub-items-cards">
          {this.state.subCategoryList.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <Card
                  style={{
                    border: "2px solid black",
                    margin: "10px",
                  }}
                >
                  <CardImg
                    alt={item.name}
                    src={item.image}
                    height="290px"
                  ></CardImg>
                  <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardSubtitle></CardSubtitle>
                    <CardText>
                      <b>Price: {item.price}$</b>
                      <br />
                    </CardText>
                    <Button onClick={() => this.addToCartHandleClick(item)}>
                      Add To Cart
                    </Button>
                  </CardBody>
                </Card>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
);
