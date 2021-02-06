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
} from "reactstrap";
import Fade from "react-reveal/Fade";
import LoaderComponent from "./LoaderComponent";
import { v4 as uuidv4 } from "uuid";

class CartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartVisible: false,
      showCheckoutDetails: false,
      checkoutItemsButton: false,

      paymentModal: false,
      checkOutDetails: { name: "", address: "", emailId: "" },
    };
    this.fname = React.createRef();
    this.addressRef = React.createRef();
    this.emailIdRef = React.createRef();
  }

  // componentDidMount(){
  //   console.log("**********************************")
  //   this.setState({
  //     isCartVisible :this.props.cartVisibilityState
  //   })
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(
  //     "Component DID UPDATE prevProps, prevState!************",
  //     prevProps.cartVisibilityState,
  //     prevState.isCartVisible
  //   );
  //   console.log("cartVisibilityState",this.props.cartVisibilityState)
  //   console.log("this.state.isCartVisible",this.state.isCartVisible)
  //   if(prevProps && this.props.cartVisibilityState){
  //     this.setState({
  //       isCartVisible :true
  //     })
  //   }
  // }

  // componentWillReceiveProps(newProps) {
  //   console.log("Component WILL RECIEVE PROPS*************!", newProps);
  //   console.log("cartVisibilityStatenewProps",this.props.cartVisibilityState,newProps.cartVisibilityState)
  //   if((this.props.cartVisibilityState !== newProps.cartVisibilityState) && newProps.cartVisibilityState){
  //     this.setState({
  //       isCartVisible : newProps.cartVisibilityState
  //     })
  //   }
  //   else{
  //     this.setState({
  //       isCartVisible : false
  //     })
  //   }
  //   // if(!this.state.isCartVisible){
  //   //   this.setState({
  //   //     isCartVisible :newProps.cartVisibilityState
  //   //   })
  //   // }
  // }
////////////////
  // addToCartHandleClick = (item) => {
  //   this.props.postItemsToCart(
  //     item.id,
  //     item.catid,
  //     item.name,
  //     item.image,
  //     item.date,
  //     item.price,
  //     item.size
  //   );
  //   //we have tried to use a callback in this setState, so that updated value of state is available immediately
  //   // Generally setState is asynchronous so it is not possible to get updated value immediately
  //   // this.setState(
  //   //   {
  //   //     addSelectedItemsToCart: [...this.state.addSelectedItemsToCart, item],
  //   //   }

  //   // this.setState({
  //   //   isCartVisible: true,
  //   // });
  // };
/////////////////////////
  closeCart = () => {
    // if(this.props.cartVisibilityState){
    //   this.setState({
    //     isCartVisible: false,
    //   });
    // }
    // else{
    //   this.setState({
    //     isCartVisible: false,
    //   });
    // }


    this.setState({
      isCartVisible: false,
    });

  };

  openCart = () => {
    // if(this.props.cartVisibilityState){
    //   this.setState({
    //     isCartVisible: true,
    //   });
    // }
    // else{
    //   this.setState({
    //     isCartVisible: true,
    //   });
    // }

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
    var checkOutDetails = this.state.checkOutDetails;

    var currentDate = new Date();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var year = currentDate.getFullYear();
    var checkOrderDate = day + "/" + month + "/" + year;
    return (
      <div>
        <button className="show-cart-button" onClick={this.openCart} disabled={this.state.isCartVisible}>
          Show Cart
        </button>
        <div
          // className={this.state.isCartVisible ? "show-cart" : 
          // (this.state.isCartVisible && this.props.cartVisibilityState) ? "hide-cart" :
          // (this.props.cartVisibilityState||this.state.isCartVisible)? "show-cart" : "hide-cart"}
          className={this.state.isCartVisible? "show-cart" : "hide-cart"}
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
              {this.props.selectedItemsCart ? (
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
          </Modal>
        </div>
      </div>
    );
  }
}

export default CartComponent;
