import React, { useState ,useEffect} from "react";
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
import { db } from "../Firebase";
import { collection, getDocs,onSnapshot ,doc,addDoc, deleteDoc ,serverTimestamp } from "firebase/firestore";

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

function ProductsPage () {
  const [categories,setCategories] = useState([])
  const [subCategoryList,setSubCategoryList] = useState([])
  const [subCatList,setSubCatList] = useState([])
  const [cartItems,setCartItems] = useState([])
  
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "catrgories"),
      (snapshot) => {
        setCategories(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      }
    );
    return () => {
      unsubscribe();
    };
  }, [])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "subcategories"),
      (snapshot) => {
        setSubCategoryList(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      }
    );
    return () => {
      unsubscribe();
    };
  }, [])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "additemstocart"),
      (snapshot) => {
        setCartItems(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      }
    );
    return () => {
      unsubscribe();
    };
  }, [])
  
  const handleButtonClick=(id) =>{
    if (id === 1) {
      setSubCatList(
        subCategoryList.filter((item)=>{
          return item.post.catid === 1
        })
      )
    } else if (id === 2) {
      setSubCatList(
        subCategoryList.filter((item)=>{
          return item.post.catid === 2
        })
      )
    } else if (id === 3) {
      setSubCatList(
        subCategoryList.filter((item)=>{
          return item.post.catid === 3
        })
      )
    }
  }

  const addToCartHandleClick = (item) => {
    addDoc(collection(db, "additemstocart"), {
      catid: item.post.catid,
      id: item.post.id,
      image: item.post.image,
      name: item.post.name,
      price: item.post.price,
    });
  };

    if (cartItems.length>0) {
      var selectedItemsCart = cartItems.reduce((a, b) => {
        var i = a.findIndex((x) => ((x.catid === b.post.catid) && (x.id === b.post.id)));
        return (
          i === -1
            ? a.push({
              queryId:b.id,
                id: b.post.id,
                times: 1,
                name: b.post.name,
                image: b.post.image,
                price: b.post.price,
                catid: b.post.catid,
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
          // fetchCartItems={cartItems}
          // deleteCartItems={this.props.deleteCartItems}
        />
        <div className="category-items">
          {categories.length>0 ? (
            categories.map((item) => {
              return (
                <div key={item.id} className="category-options">
                  <button onClick={() => handleButtonClick(item.post.catid)}>
                    {item.post.title}
                  </button>
                </div>
              );
            })
          ) : (
            <LoaderComponent />
          )}
        </div>
        <div className="sub-items-cards">
          {subCatList.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <Card
                  style={{
                    border: "2px solid black",
                    margin: "10px",
                  }}
                >
                  <CardImg
                    alt={item.post.name}
                    src={item.post.image}
                    height="290px"
                    className="item-image"
                  ></CardImg>
                  <CardBody>
                    <CardTitle>{item.post.name}</CardTitle>
                    <CardSubtitle></CardSubtitle>
                    <CardText>
                      <b>Price: {item.post.price}$</b>
                      <br />
                    </CardText>
                    <Button onClick={() => addToCartHandleClick(item)}>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
);
