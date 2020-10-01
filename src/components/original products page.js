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
} from "reactstrap";
import "./PageTemplateDetails.css";

var testArr = [];
class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subCategoryList: [],
      addSelectedItemsToCart: [],
      isCartVisible: false,
    };
  }
  componentDidMount(){
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
    // this.setState({
    //   addSelectedItemsToCart: [...this.state.addSelectedItemsToCart, item],
    // });

    console.log(
      "on_click_items",
      item.id,
      item.catid,
      item.name,
      item.image,
      item.date,
      item.price,
      item.size
    );

    this.props.postItemsToCart(
      item.id,
      item.catid,
      item.name,
      item.image,
      item.date,
      item.price,
      item.size
    );
    console.log("get_cart_items_on_add_to_cart", this.props.cartItems);

    var aaa = this.props.cartItems.reduce((a, b) => {
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

    if (aaa) {
      var bbb = aaa.map((item) => {
        return item.price * item.times;
      });
    }

    if (bbb.length > 0) {
      var ccc = bbb.reduce(
        (total, sum) => {
          return total + sum;
        }
      );
    }

    console.log("ccc_ccc",ccc,aaa)
    //we have tried to use a callback in this setState, so that updated value of state is available immediately
    // Generally setState is asynchronous so it is not possible to get updated value immediately
    this.setState(
      {
        addSelectedItemsToCart: [
          ...this.state.addSelectedItemsToCart,
          item,
        ],
      },
      function () {
        this.testFunction(this.state.addSelectedItemsToCart);
      }
    );

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
    debugger;
    console.log("async", item);
  };

  // selectCostumeSize = (item) => {
  //   alert();
  // };
  closeCart = () => {
    this.setState({
      isCartVisible: false,
    });
  };

  openCart = () => {
    this.setState({
      isCartVisible: true,
    });
    console.log("get_cart_items_on_open_cart", this.props.cartItems);
  };

  deleteItemFromCart = (item) => {
    alert(
      "item name" + item.name + "item id" + item.id + "item.catid" + item.catid
    );
  };

  finalizeCartItems = () => {
    alert("hi");
  };

  // displayListOfCartItems=()=>{
  //   alert("hi")
  //   var selectedItemsCart = item.reduce((a, b) => {
  //     var i = a.findIndex((x) => x.name === b.name);
  //     return (
  //       i === -1
  //         ? a.push({
  //             id: b.id,
  //             times: 1,
  //             name: b.name,
  //             image: b.image,
  //             price: b.price,
  //           })
  //         : a[i].times++,
  //       a
  //     );
  //   }, []);

  //   if (selectedItemsCart) {
  //     var amountOfCartItems = selectedItemsCart.map((item) => {
  //       return item.price * item.times;
  //     });
  //   }

  //   if (amountOfCartItems.length > 0) {
  //     var totalAmountOfAllItemsInCart = amountOfCartItems.reduce(
  //       (total, sum) => {
  //         return total + sum;
  //       }
  //     );
  //   }
  // }

  render() {
    var selectedItemsCart = this.state.addSelectedItemsToCart.reduce((a, b) => {
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
    // this.props.postItemsToCart(selectedItemsCart)

    return (
      <div className="container-section">
        <button onClick={this.openCart}>Show Cart</button>
        <div className={this.state.isCartVisible ? "show-cart" : "hide-cart"}>
          <button onClick={this.closeCart}>Close Cart</button>
          <button onClick={this.finalizeCartItems}>Finalize Cart Items</button>
          <div>TOTAL : {totalAmountOfAllItemsInCart}$</div>
          <div>
            {selectedItemsCart.map((item, index) => {
              return (
                <Card
                  style={{
                    border: "2px solid black",
                    height: "100px",
                    width: "100px",
                    margin: "10px",
                  }}
                  key={index}
                >
                  <CardImg
                    alt={item.name}
                    src={item.image}
                    height="100px"
                    width="100px"
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
            })}
            {this.state.addSelectedItemsToCart.map((item, index) => {
              return (
                <Card
                  style={{
                    border: "2px solid black",
                    height: "100px",
                    width: "100px",
                    margin: "10px",
                  }}
                  key={index}
                >
                  <CardImg
                    alt={item.name}
                    src={item.image}
                    height="100px"
                    width="100px"
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
                  </CardBody>
                </Card>
              );
            })}
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
            <div>Loading...........</div>
          )}
        </div>
        <div className="sub-items-cards">
          {this.state.subCategoryList.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <Card
                  style={{
                    border: "2px solid black",
                    height: "300px",
                    width: "300px",
                    margin: "10px",
                  }}
                >
                  <CardImg
                    alt={item.name}
                    src={item.image}
                    height="290px"
                    width="290px"
                  ></CardImg>
                  {/* <CardImgOverlay>
                    <CardTitle>
                      {item.name}
                      <b></b>
                    </CardTitle>
                  </CardImgOverlay> */}
                  <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardSubtitle></CardSubtitle>
                    <CardText>
                      <b>Price: {item.price}$</b>
                      <br />
                      {/* <b>
                        Available in size:
                        {item.size.map((sizeItem) => {
                          return (
                            <span
                              className="costume-size"
                              onClick={() => this.selectCostumeSize(sizeItem)}
                            >
                              {sizeItem}
                            </span>
                          );
                        })}
                      </b> */}
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

export default ProductsPage;
