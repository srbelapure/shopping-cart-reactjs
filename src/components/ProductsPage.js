import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  CardSubtitle,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import "./PageTemplateDetails.css";
import {
  fetchCategories,
  fetchSubCategories,
  postItemsToCart,
  fetchCartItems,
} from "../redux/ActionCreators";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import { v4 as uuidv4 } from "uuid";
import LoaderComponent from './LoaderComponent'

var testArr = [];
//once we connect the mapStateToProps to the component with connect(), mapStateToProps gets state as an argument
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart_Items,
  };
};

//once we connect mapDispatchToProps to component with connect(),mapDispatchToProps gets dispatch as an argument
const mapDispatchToProps = (dispatch) => ({
  fetchCartItems: () => dispatch(fetchCartItems()),
  postItemsToCart:(id,categoryid,name,image,date,price,size)=>dispatch(postItemsToCart(id,categoryid,name,image,date,price,size))
});

class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subCategoryList: [],
      addSelectedItemsToCart: [],
      isCartVisible: false,
      totalBillAmountFOrSelectedItems: 0,
      paymentModal: false,
      showCheckoutDetails: false,
      // checkOutDetails: [{ name: "", address: "", emailId: "" }],
      checkOutDetails: { name: "", address: "", emailId: "" },
    };
    this.fname = React.createRef();
    this.addressRef = React.createRef();
    this.emailIdRef = React.createRef();
  }

  componentWillMount() {
    console.log("Component WILL MOUNT!");
  }
  componentDidMount() {
    this.props.fetchCartItems();
    console.log("Component DID MOUNT!");
  }
  componentWillReceiveProps(newProps) {
    console.log("Component WILL RECIEVE PROPS!", newProps);
  }
  shouldComponentUpdate(newProps, newState) {
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log(
      "Component WILL UPDATE nextProps, nextState!",
      nextProps,
      nextState
    );
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(
      "Component DID UPDATE prevProps, prevState!",
      prevProps.cartItems.cartItemsList.length,
      prevState.addSelectedItemsToCart.length
    );
    // if (
    //   prevProps.cartItems.cartItemsList.length !==
    //   prevState.addSelectedItemsToCart.length
    // ) {
    //   this.props.fetchCartItems();
    // }
    // this.props.fetchCartItems();
    // console.log(
    //   "Component DID UPDATE prevProps, prevState!",
    //   prevProps,
    //   prevState
    // );
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

  addToCartHandleClick = (item, totalAmountOfAllItemsInCart) => {
    // this.setState({
    //   addSelectedItemsToCart: [...this.state.addSelectedItemsToCart, item],
    // });
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
    //   },
    //   function () {
    //     this.testFunction(this.state.addSelectedItemsToCart);
    //   }
    // );

    this.setState({
      isCartVisible: true,
    });
  };

  testFunction = (item) => {
    var selectedItemsCart = item.reduce((a, b) => {
      var i = a.findIndex((x) => x.name === b.name);
      return (
        i === -1
          ? a.push({
              id: b.id,
              times: 1,
              name: b.name,
              image: b.image,
              price: b.price,
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
  };

  closeCart = () => {
    this.setState({
      isCartVisible: false,
    });
  };

  openCart = () => {
    this.setState({
      isCartVisible: true,
    });
    this.props.fetchCartItems();
  };

  deleteItemFromCart = (item) => {
    // alert(
    //   "item name" + item.name + "item id" + item.id + "item.catid" + item.catid
    // );
    // console.log(
    //   "this.props.cartItems.cartItemsList",
    //   this.props.cartItems.cartItemsList
    // );
    // debugger;
    // var test = this.props.cartItems.cartItemsList.filter(
    //   (x) => x.id !== item.id
    // );
    // console.log("testtttttttttttttttt", test);
  };

  finalizeCartItems = () => {
    this.setState({
      paymentModal: !this.state.paymentModal,
    });
  };

  showCheckoutDetails = () => {
    this.setState({
      showCheckoutDetails: !this.state.showCheckoutDetails,
    });
  };

  handleCheckoutDetails = (e) => {
    this.setState({
      checkOutDetails: {
        name: this.fname.current.value,
        address: this.addressRef.current.value,
        emailId: this.emailIdRef.current.value,
      },
    });
    this.finalizeCartItems();
  };

  render() {
    console.log("this.props.cartItems.cartItemsList",this.props.cartItems.cartItemsList)
    var checkOutDetails = this.state.checkOutDetails;

    var currentDate = new Date();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var year = currentDate.getFullYear();
    var checkOrderDate = day + "/" + month + "/" + year;

    var itemsListFromServer = this.props.cartItems.cartItemsList;
   if( itemsListFromServer && itemsListFromServer[0]){
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
        <button className="show-cart-button" onClick={this.openCart}>Show Cart</button>
        <div className={this.state.isCartVisible ? "show-cart" : "hide-cart"}>
          <button className="close-cart-item" onClick={this.closeCart}>Close Cart</button>
          <button className="finalize-cart-item" onClick={this.showCheckoutDetails}>
            Finalize Cart Items
          </button>
          <br />
          <div className="checkout-details">
            {this.state.showCheckoutDetails && (
              <Fade right cascade>
                <form>
                  <label htmlFor="fname">Name : </label>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    // innerRef={(input) => this.fname = input}
                    ref={this.fname}
                  />
                  <br />
                  <label htmlFor="address">Address : </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    ref={this.addressRef}
                  />
                  <br />
                  <label htmlFor="mailid">Email : </label>
                  <input
                    type="email"
                    name="mailid"
                    id="mailid"
                    ref={this.emailIdRef}
                  />
                  <br />
                </form>
                <button onClick={this.handleCheckoutDetails}>
                  Checkout Items
                </button>
              </Fade>
            )}
          </div>
          <div>TOTAL : {totalAmountOfAllItemsInCart}$</div>
          <div className="selected-item-details">
            {selectedItemsCart ? selectedItemsCart.map((item, index) => {
              return (
                <Card
                  style={{
                    border: "2px solid black",
                    margin: "10px",
                  }}
                  key={index}
                >
                  <CardImg
                    alt={item.name}
                    src={item.image}
                    height="100px"
                  ></CardImg>
                  <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardSubtitle></CardSubtitle>
                    <CardText>
                      <b>
                        Price: {item.price}$ x {item.times}
                      </b>{" "}
                      <br />
                      <b>Quantity : {item.times}</b>
                      <br />
                    </CardText>
                    <button onClick={() => this.deleteItemFromCart(item)}>
                      Delete Item
                    </button>
                  </CardBody>
                </Card>
              );
            }):<div>Loading..........</div>}
          </div>
        </div>
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
            <LoaderComponent/>
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
                    <Button
                      onClick={() =>
                        this.addToCartHandleClick(
                          item,
                          totalAmountOfAllItemsInCart
                        )
                      }
                    >
                      Add To Cart
                    </Button>
                  </CardBody>
                </Card>
              </React.Fragment>
            );
          })}
        </div>
        <div className="checkout-modal">
          <Modal
            isOpen={this.state.paymentModal}
            toggle={this.finalizeCartItems}
          >
            <ModalHeader toggle={this.finalizeCartItems}>
              <div style={{ color: "green", margin: "10px" }}>
                Your order has been placed
              </div>
              <div style={{ textAlign: "center" }}>Order: {uuidv4()}</div>
            </ModalHeader>
            <ModalBody>
              <React.Fragment>
                <div className="order-details">Name:{checkOutDetails.name}</div>
                <div className="order-details">
                  Address: {checkOutDetails.address}
                </div>
                <div className="order-details">
                  Email : {checkOutDetails.emailId}
                </div>
                <div className="order-details">Date:{checkOrderDate}</div>
              </React.Fragment>

              <div className="order-details">Cart Items:</div>
              {selectedItemsCart ? selectedItemsCart.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <div
                      className="order-details-items"
                      style={{ marginLeft: "40px" }}
                    >
                      {item.name} x {item.times}
                    </div>
                  </React.Fragment>
                );
              }):<div>Loading.............</div>}
              <div className="order-details">
                <b>Total : {totalAmountOfAllItemsInCart}</b>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
);
