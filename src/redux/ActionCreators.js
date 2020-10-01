import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import { v4 as uuidv4 } from 'uuid';

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
  dispatch(categoriesLoading(true));
  return fetch(baseUrl + "categories")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addCategories(promos)))
    .catch((error) => dispatch(categoriesFailed(error.message)));
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
  dispatch(subcategoriesLoading(true));
  return fetch(baseUrl + "subcategories")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addSubCategories(promos)))
    .catch((error) => dispatch(subcategoriesFailed(error.message)));
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
export const postItemsToCart = (id,categoryid,name,image,date,price,size) => (dispatch) => {
  // console.log(
  //   "JSON.stringify(itemstocart)",
  //   JSON.stringify(itemstocart),
  //   itemstocart
  // );
  // var result = {};
  // for (var i = 0; i < itemstocart.length; i++) {
  //   return(
  //     result[itemstocart[i].id] = itemstocart[i].id,
  //   result[itemstocart[i].name] = itemstocart[i].name,
  //   result[itemstocart[i].times] = itemstocart[i].times,
  //   result[itemstocart[i].image] = itemstocart[i].image,
  //   result[itemstocart[i].price] = itemstocart[i].price
  //   )
  // }

  // var result = arr.reduce(
  //   (obj, item) => Object.assign(obj, { [item.key]: item.value }),
  //   {}
  // );
  var itemsList={
    id:id+uuidv4(),
    catid:categoryid,
    name:name,
    price:price,
    image:image,
    date:date,
    size:size,
    // totalamount:totalamount
  }

  return fetch(baseUrl + "additemstocart", {
    method: "POST",
    body: JSON.stringify(itemsList) ,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) =>
      alert("Thank you for your feedback!\n" + JSON.stringify(response))
    )
    .catch((error) => {
      console.log("post comments", error.message);
      alert("Your comment could not be posted\nError: " + error.message);
    });
};

export const fetchCartItems = () => (dispatch) => {
  return fetch(baseUrl + "additemstocart")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((cartitems) => dispatch(addItemsToCart(cartitems)))
    .catch((error) => dispatch(loadCartItemsFailed(error.message)));
};
