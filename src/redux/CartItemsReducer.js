import * as ActionTypes from "./ActionTypes";

export const CartItems = (
  state = {
    isLoading: true,
    errorMessage: null,
    cartItemsList: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_ITEMS_TO_CART:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        cartItemsList: action.payload,
      };
    case ActionTypes.CART_ITEMS_LOADING:
      return { ...state, isLoading: true, errorMessage: null, cartItemsList: [] };
    case ActionTypes.ADD_ITEMS_TO_CART_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
        cartItemsList: [],
      };
    default:
      return state;
  }
};