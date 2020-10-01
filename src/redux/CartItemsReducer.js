import * as ActionTypes from "./ActionTypes";

export const CartItems = (
  state = {
    errorMessage: null,
    cartItemsList: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_ITEMS_TO_CART:
      return {
        ...state,
        errorMessage: null,
        cartItemsList: action.payload,
      };
    case ActionTypes.ADD_ITEMS_TO_CART_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
        cartItemsList: [],
      };
    default:
      return state;
  }
};