import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import { v4 as uuidv4 } from "uuid";
import { db } from "../Firebase";
import { collection, getDocs,onSnapshot ,doc,addDoc, deleteDoc ,serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//for loading categories
export const categoriesLoading = () => ({
  type: ActionTypes.CATEGORIES_LOADING,
});

//when loading/fetching of categories fail
export const categoriesFailed = (errorMessage) => ({
  type: ActionTypes.CATEGORIES_FAILED,
  payload: errorMessage,
});

//add categories to UI
export const addCategories = (categ) => ({
  type: ActionTypes.ADD_CATEGORIES,
  payload: categ,
});

//Thunk used to fetch categories
export const fetchCategories = () => (dispatch) => {
  let categoriesArray=[]
  dispatch(categoriesLoading(true));
  onSnapshot(
    collection(db, "catrgories"),
    (snapshot) => {
      // setCategories(
      //   snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
      // );
      categoriesArray = snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
      // return categoriesArray
      dispatch(addCategories(categoriesArray))
    },
    (error)=>{
      dispatch(categoriesFailed(error.message))
    }
  );
  // return fetch(baseUrl + "categories")
  //   .then(
  //     (response) => {
  //       if (response.ok) {
  //         return response;
  //       } else {
  //         var error = new Error(
  //           "Error " + response.status + ": " + response.statusText
  //         );
  //         error.response = response;
  //         throw error;
  //       }
  //     },
  //     (error) => {
  //       var errmess = new Error(error.message);
  //       throw errmess;
  //     }
  //   )
  //   .then((response) => response.json())
  //   .then((promos) => dispatch(addCategories(promos)))
    //.catch((error) => dispatch(categoriesFailed(error.message)));
};

//for loading subcategories
export const subcategoriesLoading = () => ({
  type: ActionTypes.SUB_CATEGORIES_LOADING,
});

//when loading/fetching of subcategories fail
export const subcategoriesFailed = (errorMessage) => ({
  type: ActionTypes.SUB_CATEGORIES_FAILED,
  payload: errorMessage,
});

//add subcategories to UI
export const addSubCategories = (categ) => ({
  type: ActionTypes.SUB_CATEGORIES_ADD,
  payload: categ,
});

//Thunk used to fetch subcategories
export const fetchSubCategories = () => (dispatch) => {
  let subCategoriesList=[]
  dispatch(subcategoriesLoading(true));
  onSnapshot(
    collection(db, "subcategories"),
    (snapshot) => {
      // setSubCategoryList(
      //   snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
      // );
      subCategoriesList=snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
      dispatch(addSubCategories(subCategoriesList))
    },
    (error)=>{
      dispatch(subcategoriesFailed(error.message))
    }
  );

  // return fetch(baseUrl + "subcategories")
  //   .then(
  //     (response) => {
  //       if (response.ok) {
  //         return response;
  //       } else {
  //         var error = new Error(
  //           "Error " + response.status + ": " + response.statusText
  //         );
  //         error.response = response;
  //         throw error;
  //       }
  //     },
  //     (error) => {
  //       var errmess = new Error(error.message);
  //       throw errmess;
  //     }
  //   )
  //   .then((response) => response.json())
  //   .then((promos) => dispatch(addSubCategories(promos)))
  //   .catch((error) => dispatch(subcategoriesFailed(error.message)));
};

//action to add items to cart
export const addItemsToCart = (cartItems) => ({
  type: ActionTypes.ADD_ITEMS_TO_CART,
  payload: cartItems,
});

//loading of cart items failed
export const loadCartItemsFailed = (errorMessage) => ({
  type: ActionTypes.ADD_ITEMS_TO_CART_FAILED,
  payload: errorMessage,
});

//think to add items to cart
export const postItemsToCart = (
  catid,
  id,
  image,
  name,
  price,
  userid
) => (dispatch) => {

  addDoc(collection(db, "additemstocart"), {
    catid: catid,
    id: id,
    image: image,
    name: name,
    price: price,
    userid: userid
  }).then(() => dispatch(fetchCartItems()))

  // return fetch(baseUrl + "additemstocart", {
  //   method: "POST",
  //   body: JSON.stringify(itemsList),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   credentials: "same-origin",
  // })
  //   .then(
  //     (response) => {
  //       if (response.ok) {
  //         return response;
  //       } else {
  //         var error = new Error(
  //           "Error " + response.status + ": " + response.statusText
  //         );
  //         error.response = response;
  //         throw error;
  //       }
  //     },
  //     (error) => {
  //       throw error;
  //     }
  //   )
  //   .then((response) => response.json())
  //   .then((response) =>
  //     alert(
  //       response.name + " " + "item has been added to the cart!\n"
  //     )
  //   )
  //   .then(() => dispatch(fetchCartItems()))
  //   .catch((error) => {
  //     alert("Your comment could not be posted\nError: " + error.message);
  //   });
};

export const fetchCartItems = () => (dispatch) => {
  let userSpecificCartItemsList=[]
  onSnapshot(
    collection(db, "additemstocart"),
    (snapshot) => {
        snapshot.docs.map((doc) => {
          if(getAuth().currentUser && getAuth().currentUser.uid === doc.data().userid){
            userSpecificCartItemsList=[...userSpecificCartItemsList,({ id: doc.id, post: doc.data() })]
          } 
        })
        dispatch(addItemsToCart(userSpecificCartItemsList))
    },
    (error)=>{
      dispatch(loadCartItemsFailed(error.message))
    }
  );

  // return fetch(baseUrl + "additemstocart")
  //   .then(
  //     (response) => {
  //       if (response.ok) {
  //         return response;
  //       } else {
  //         var error = new Error(
  //           "Error " + response.status + ": " + response.statusText
  //         );
  //         error.response = response;
  //         throw error;
  //       }
  //     },
  //     (error) => {
  //       var errmess = new Error(error.message);
  //       throw errmess;
  //     }
  //   )
  //   .then((response) => response.json())
  //   .then((cartitems) => dispatch(addItemsToCart(cartitems)))
  //   .catch((error) => dispatch(loadCartItemsFailed(error.message)));
};

export const deleteCartItems =(id)=>(dispatch)=>{
  deleteDoc(doc(db, "additemstocart", id)).then(() => dispatch(fetchCartItems()))
//   return fetch(baseUrl + "additemstocart/" + id, {
//   method: 'DELETE',
//   headers: {
//     "Content-Type": "application/json",
//   },
//   credentials: "same-origin"
// })
// // .then(res => res.text()) // or res.json()
// .then(alert('Item is being deleted!!'))
// .then(() => dispatch(fetchCartItems()))
}
