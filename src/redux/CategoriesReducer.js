import * as ActionTypes from './ActionTypes';

export const Categories = (state  = { isLoading: true,
                                        errorMessage: null,
                                        categories:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CATEGORIES:
        return {...state, isLoading: false, errorMessage: null, categories: action.payload};

        case ActionTypes.CATEGORIES_LOADING:
            return {...state, isLoading: true, errorMessage: null, categories: []}

        case ActionTypes.CATEGORIES_FAILED:
            return {...state, isLoading: false, errorMessage: action.payload};

        default:
          return state;
      }
};