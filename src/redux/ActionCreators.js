import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";



//for loading categories
export const categoriesLoading = () => ({
  type: ActionTypes.CATEGORIES_LOADING
});

//when loading/fetching of categories fail
export const categoriesFailed = (errorMessage) => ({
  type: ActionTypes.CATEGORIES_FAILED,
  payload: errorMessage
});

//add categories to UI
export const addCategories = (categ) => ({
  type: ActionTypes.ADD_CATEGORIES,
  payload: categ
});

//Thunk used to fetch categories
export const fetchCategories =()=> (dispatch)=>{
dispatch(categoriesLoading(true))
return fetch(baseUrl+"categories")
.then(response=>{
  if(response.ok){
    return response;
  }
  else{
    var error = new Error('Error ' + response.status + ': ' + response.statusText)
    error.response=response
    throw error
  }
},
error=>{
  var errmess = new Error(error.message);
  throw errmess;
})
.then(response=>response.json())
.then(promos=>dispatch(addCategories(promos)))
.catch(error => dispatch(categoriesFailed(error.message)));
}


//for loading subcategories
export const subcategoriesLoading = () => ({
  type: ActionTypes.SUB_CATEGORIES_LOADING
});

//when loading/fetching of subcategories fail
export const subcategoriesFailed = (errorMessage) => ({
  type: ActionTypes.SUB_CATEGORIES_FAILED,
  payload: errorMessage
});

//add subcategories to UI
export const addSubCategories = (categ) => ({
  type: ActionTypes.SUB_CATEGORIES_ADD,
  payload: categ
});

//Thunk used to fetch subcategories
export const fetchSubCategories =()=> (dispatch)=>{
dispatch(subcategoriesLoading(true))
return fetch(baseUrl+"subcategories")
.then(response=>{
  if(response.ok){
    return response;
  }
  else{
    var error = new Error('Error ' + response.status + ': ' + response.statusText)
    error.response=response
    throw error
  }
},
error=>{
  var errmess = new Error(error.message);
  throw errmess;
})
.then(response=>response.json())
.then(promos=>dispatch(addSubCategories(promos)))
.catch(error => dispatch(subcategoriesFailed(error.message)));
}

//action to add items to cart
export const addItemsToCart=(cartItems)=>({
  type: ActionTypes.ADD_ITEMS_TO_CART,
  payload: cartItems
})
//think to add items to cart
export const postItemsToCart=(itemstocart)=>(dispatch)=>{
  console.log("JSON.stringify(itemstocart)",JSON.stringify(itemstocart))
  return fetch(baseUrl + 'additemstocart',{
    method: "POST",
    body: JSON.stringify(itemstocart),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
})
.then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
.then(response=>response.json())
.then(response => alert("Thank you for your feedback!\n" + JSON.stringify(response)))
.catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });

}