import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardSubtitle,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Fade from "react-reveal/Fade";
import LoaderComponent from "./LoaderComponent";

class CartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartVisible: false,
      showCheckoutDetails: false,
      checkoutItemsButton: false,
    };
    this.fname = React.createRef();
    this.addressRef = React.createRef();
    this.emailIdRef = React.createRef();
  }

  closeCart = () => {
    this.setState({
      isCartVisible: false,
    });
  };

  openCart = () => {
      alert('1')
    this.setState({
      isCartVisible: true,
    });
    this.props.fetchCartItems();
    console.log("aaaaaaaaa", this.fname.current === null);
    if (
      this.fname.current === null &&
      this.addressRef.current === null &&
      this.emailIdRef.current === null
    ) {
      this.setState({
        checkoutItemsButton: true,
      });
    }
  };

  deleteItemFromCart = (item) => {
    this.props.deleteCartItems(item);
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
    console.log(
      "this.fname.current.value",
      this.fname.current.value === "",
      this.fname.current.value === null,
      this.fname.current.value === undefined
    );
    this.setState({
      checkOutDetails: {
        name: this.fname.current.value,
        address: this.addressRef.current.value,
        emailId: this.emailIdRef.current.value,
      },
    });
    this.finalizeCartItems();
    if (
      this.fname.current.value === "" &&
      this.addressRef.current.value === "" &&
      this.emailIdRef.current.value === ""
    ) {
      // $('button.checkout-items').disabled=true
      // this.checkoutItemsRef.current.disabled=true
      this.setState({
        checkoutItemsButton: true,
      });
    }
  };

  onInputValueChange = () => {
    if (
      this.fname.current.value === "" ||
      this.addressRef.current.value === "" ||
      this.emailIdRef.current.value === ""
    ) {
      // $('button.checkout-items').disabled=true
      // this.checkoutItemsRef.current.disabled=true
      this.setState({
        checkoutItemsButton: true,
      });
    } else {
      this.setState({
        checkoutItemsButton: false,
      });
    }
  };

  render() {
    return (
      <div>
        <button className="show-cart-button" onClick={this.openCart}>
          Show Cart
        </button>
        <div
          className={this.props.cartVisibilityState ? "show-cart" : "hide-cart"}
        >
          <button className="close-cart-item" onClick={this.closeCart}>
            Close Cart
          </button>
          <button
            className="finalize-cart-item"
            onClick={this.showCheckoutDetails}
          >
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
                    onChange={this.onInputValueChange}
                  />
                  <br />
                  <label htmlFor="address">Address : </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    ref={this.addressRef}
                    onChange={this.onInputValueChange}
                  />
                  <br />
                  <label htmlFor="mailid">Email : </label>
                  <input
                    type="email"
                    name="mailid"
                    id="mailid"
                    ref={this.emailIdRef}
                    onChange={this.onInputValueChange}
                  />
                  <br />
                </form>
                <button
                  className="checkout-items"
                  onClick={this.handleCheckoutDetails}
                  disabled={this.state.checkoutItemsButton}
                >
                  Checkout Items
                </button>
              </Fade>
            )}
          </div>
          <div>TOTAL : {this.props.totalAmountOfAllItemsInCart}$</div>
          <div className="selected-item-details">
            {this.props.selectedItemsCart ? (
              this.props.selectedItemsCart.map((item, index) => {
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
                      <button onClick={() => this.deleteItemFromCart(item.id)}>
                        Delete Item
                      </button>
                    </CardBody>
                  </Card>
                );
              })
            ) : (
              <LoaderComponent />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CartComponent;
