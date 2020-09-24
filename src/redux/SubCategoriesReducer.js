import * as ActionTypes from './ActionTypes';

export const SubCategories = (state  = { isLoading: true,
                                        errorMessage: null,
                                        subcategories:[]}, action) => {
    switch (action.type) {
        case ActionTypes.SUB_CATEGORIES_ADD:
        return {...state, isLoading: false, errorMessage: null, subcategories: action.payload};

        case ActionTypes.SUB_CATEGORIES_LOADING:
            return {...state, isLoading: true, errorMessage: null, subcategories: []}

        case ActionTypes.SUB_CATEGORIES_FAILED:
            return {...state, isLoading: false, errorMessage: action.payload};

        default:
          return state;
      }
};