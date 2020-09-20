import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";



//for loading promotions
export const categoriesLoading = () => ({
  type: ActionTypes.CATEGORIES_LOADING
});

//when loading/fetching of promotions fail
export const categoriesFailed = (errorMessage) => ({
  type: ActionTypes.CATEGORIES_FAILED,
  payload: errorMessage
});

//add promotions to UI
export const addCategories = (categ) => ({
  type: ActionTypes.ADD_CATEGORIES,
  payload: categ
});

//Thunk used to fetch promotions
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
