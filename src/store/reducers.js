import { LOAD_PRODUCTS } from './actionTypes';
import { LOAD_ORDERS } from './actionTypes';

export const productsReducer = (products=[], action)=> {
  switch(action.type) {
  case LOAD_PRODUCTS:
    return action.payload;
  default:
    return products;
  }
};

export const ordersReducer = (orders=[], action)=> {
  switch(action.type) {
  case LOAD_ORDERS:
    return action.payload;
  default:
    return orders;
  }
};
