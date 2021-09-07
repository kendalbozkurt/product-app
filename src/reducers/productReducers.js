import {
    FETCH_PRODUCTS,
    FETCH_BRANDS
  } from "../types";
  
  export const productsReducer = (state = {}, action) => {
    switch (action.type) {
      
      case FETCH_PRODUCTS:
        return { 
            ...state,
            sort: action.sort,
            order: action.order,
            items: action.payload, 
            filteredItems: action.payload,
            page: action.page 
          };
      case FETCH_BRANDS:
        return { 
            ...state,
            brands: action.payload,
            page: action.page 
          };
      default:
        return state;
    }
  };