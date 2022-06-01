import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardSubtitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
import Fade from "react-reveal/Fade";
import LoaderComponent from "./LoaderComponent";
import { v4 as uuidv4 } from "uuid";
import { db } from "../Firebase";
import { collection, getDocs,onSnapshot ,doc,addDoc, deleteDoc ,serverTimestamp } from "firebase/firestore";

class CartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckoutDetails: false,
      checkoutItemsButton: true,

      paymentModal: false,
      checkOutDetails: { name: "", address: "", emailId: "" },
    };
    this.fname = React.createRef();
    this.addressRef = React.createRef();
    this.emailIdRef = React.createRef();
  }

  closeCart = () => {
    if (this.fname.current || this.addressRef.current || this.emailIdRef.current) {
      this.fname.current.value = "";
      this.addressRef.current.value = "";
      this.emailIdRef.current.value = "";
    }
    this.setState({
      showCheckoutDetails: false
    });
  };

  openCart = () => {
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
    this.props.deleteCartItems(item.queryId);
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
    if (
      this.fname.current.value === "" &&
      this.addressRef.current.value === "" &&
      this.emailIdRef.current.value === ""
    ) {
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
      this.setState({
        checkoutItemsButton: true,
      });
    } else {
      this.setState({
        checkoutItemsButton: false,
      });
    }
  };

  onCheckoutModalClose=()=>{
    this.setState({
      paymentModal: !this.state.paymentModal,
      checkoutItemsButton:true
    });
    this.fname.current.value = ""
    this.addressRef.current.value = ""
    this.emailIdRef.current.value = ""
  }

  render() {
    var checkOutDetails = this.state.checkOutDetails;

    var currentDate = new Date();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var year = currentDate.getFullYear();
    var checkOrderDate = day + "/" + month + "/" + year;
    return (
      <div>
        {/* <button className="show-cart-button" onClick={this.openCart} disabled={this.state.isCartVisible}>
          Show Cart
        </button> */}
        <div
          className={this.props.isCartVisible? "show-cart" : "hide-cart"}
          // className="cart-details-section"
        >
          {/* <button className="close-cart-item" onClick={this.closeCart}>
            Close Cart
          </button> */}
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
                  <div className="form-section">
                    <label htmlFor="fname">Name : </label>
                    <input
                      type="text"
                      name="fname"
                      id="fname"
                      // innerRef={(input) => this.fname = input}
                      ref={this.fname}
                      onChange={this.onInputValueChange}
                    />
                  </div>
                  <br />
                  <div className="form-section">
                    <label htmlFor="address">Address : </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      ref={this.addressRef}
                      onChange={this.onInputValueChange}
                    />
                  </div>
                  <br />
                  <div className="form-section">
                    <label htmlFor="mailid">Email : </label>
                    <input
                      type="email"
                      name="mailid"
                      id="mailid"
                      ref={this.emailIdRef}
                      onChange={this.onInputValueChange}
                    />
                  </div>
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
          <div style={{ fontWeight: 600 }}>
            TOTAL : {this.props.totalAmountOfAllItemsInCart}$
          </div>
          <div className="selected-item-details">
            {this.props.selectedItemsCart && this.props.selectedItemsCart.length>0 ? (
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
                      className="item-image"
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
                      <button className="card-function-button" onClick={() => this.deleteItemFromCart(item)}>
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

        <div className="checkout-modal">
          <Modal
            isOpen={this.state.paymentModal}
            toggle={this.finalizeCartItems}
          >
            <ModalHeader className="checkout-modal-header" toggle={this.finalizeCartItems}>
              <div style={{ color: "green", margin: "10px" }}>
                Your order has been placed
              </div>
              <div>Order: {uuidv4()}</div>
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
              {this.props.selectedItemsCart && this.props.selectedItemsCart.length>0 ? (
                this.props.selectedItemsCart.map((item) => {
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
                })
              ) : (
                <LoaderComponent />
              )}
              <div className="order-details">
                <b>Total : {this.props.totalAmountOfAllItemsInCart}$</b>
              </div>
            </ModalBody>
            <ModalFooter><Button color="secondary" onClick={this.onCheckoutModalClose}>close</Button></ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default CartComponent;
