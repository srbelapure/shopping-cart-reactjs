// import { createStore, combineReducers} from 'redux'



// export const ConfigureStore = () => {
//     const store = createStore(
//       combineReducers({
//         Categories:Categories
//       })
//     )
  
//     return store
//   }
  

import { createStore, combineReducers , applyMiddleware} from 'redux'
import {Categories} from "./CategoriesReducer"
import thunk from "redux-thunk"
import logger from "redux-logger"

export const ConfigureStore = () => {

  const store = createStore(
    combineReducers({
      Categories: Categories
    }),
    applyMiddleware(thunk,logger)
  )

  return store
}
