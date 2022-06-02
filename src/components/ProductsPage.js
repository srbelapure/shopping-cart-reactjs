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
import './ComponentStyles.css'
import {
  postItemsToCart
} from "../redux/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import LoaderComponent from "./LoaderComponent";
import { getAuth } from "firebase/auth";
import { db } from "../Firebase";
import { collection, getDocs,onSnapshot ,doc,addDoc, deleteDoc ,serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth } from "../Firebase";

//once we connect the mapStateToProps to the component with connect(), mapStateToProps gets state as an argument
const mapStateToProps = (state) => {
  return {
    // cartItems: state.cart_Items,
  };
};

//once we connect mapDispatchToProps to component with connect(),mapDispatchToProps gets dispatch as an argument
const mapDispatchToProps = (dispatch) => ({
  postItemsToCart: (catid, id, image, name, price, userid) =>
    dispatch(postItemsToCart(catid, id, image, name, price, userid))
});

function ProductsPage (props) {
  const [categories,setCategories] = useState([])
  const [subCategoryList,setSubCategoryList] = useState([])
  const [subCatList,setSubCatList] = useState([])
  const [cartItems,setCartItems] = useState([])
  const [user, setUser] = useState(null); // To keep track of user we use this state (logged-in user)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        //if user has logged inn
        setUser(authUser);
      } else {
        // if user has loggedd out
        setUser(null); // if user logs out set user to null
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]); // user,username => because everytime values change we need to trigger the useEffect hook

  useEffect(() => {
    setSubCatList(
      props.subcategoryItems.filter((item)=>{
        return item.post.catid === +sessionStorage.getItem('selectedCategory')
      })
    )
  }, [props.cartItems])
  
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     collection(db, "catrgories"),
  //     (snapshot) => {
  //       setCategories(
  //         snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
  //       );
  //     }
  //   );
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [])

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     collection(db, "subcategories"),
  //     (snapshot) => {
  //       setSubCategoryList(
  //         snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
  //       );
  //     }
  //   );
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [])

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     collection(db, "additemstocart"),
  //     (snapshot) => {
  //       // setCartItems(
  //       //   snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
  //       // );
  //       console.log("getAuth().currentUser.uid",getAuth().currentUser.uid)
  //         snapshot.docs.map((doc) => {
  //           console.log("doc.data().userid",doc.data().userid)
  //           if(getAuth().currentUser.uid === doc.data().userid){
  //             setCartItems(result => [...result, ({ id: doc.id, post: doc.data() })]);
  //             // setCartItems(...cartItems,({ id: doc.id, post: doc.data() }))
  //           }
            
  //         })
  //     }
  //   );
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [])
  
  const handleButtonClick=(id) =>{
    sessionStorage.setItem('selectedCategory',id)
    if (id === 1) {
      setSubCatList(
        props.subcategoryItems.filter((item)=>{
          return item.post.catid === 1
        })
      )
    } else if (id === 2) {
      setSubCatList(
        props.subcategoryItems.filter((item)=>{
          return item.post.catid === 2
        })
      )
    } else if (id === 3) {
      setSubCatList(
        props.subcategoryItems.filter((item)=>{
          return item.post.catid === 3
        })
      )
    }
  }

  const addToCartHandleClick = (item) => {
    props.postItemsToCart(
      item.post.catid,
      item.post.id,
      item.post.image,
      item.post.name,
      item.post.price,
      getAuth().currentUser.uid
    );
  };

    // if (props.cartItems && props.cartItems.length>0) {
    //   var selectedItemsCart = props.cartItems.reduce((a, b) => {
    //     var i = a.findIndex((x) => ((x.catid === b.post.catid) && (x.id === b.post.id)));
    //     return (
    //       i === -1
    //         ? a.push({
    //           queryId:b.id,
    //             id: b.post.id,
    //             times: 1,
    //             name: b.post.name,
    //             image: b.post.image,
    //             price: b.post.price,
    //             catid: b.post.catid,
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
    return (
      <div className="container-section">
        {/* <CartComponent
          totalAmountOfAllItemsInCart={totalAmountOfAllItemsInCart}
          selectedItemsCart={selectedItemsCart}
          deleteCartItems={props.deleteCartItems}
          isCartVisible={props.isCartVisible}
          // cartItems={props.cartItems}
        /> */}
        <div className="category-items">
          {props.categoryDetails.categories.length>0 && !props.categoryDetails.isLoading? (
            props.categoryDetails.categories.map((item) => {
              return (
                <div key={item.id} className="category-options">
                  <button onClick={() => handleButtonClick(item.post.catid)}>
                    {item.post.title}
                  </button>
                </div>
              );
            })
          ) : <LoaderComponent />}
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
                    className="item-image"
                  ></CardImg>
                  <CardBody>
                    <CardTitle>{item.post.name}</CardTitle>
                    <CardSubtitle></CardSubtitle>
                    <CardText>
                      <b>Price: {item.post.price}$</b>
                      <br />
                    </CardText>
                    <Button className="card-function-button" onClick={() => addToCartHandleClick(item)}>
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
