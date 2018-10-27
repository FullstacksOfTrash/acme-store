
import { LOAD_ORDERS } from './actionTypes';
import { LOAD_PRODUCTS } from './actionTypes';
import { UPDATE_ORDER } from './actionTypes';

export const _loadOrders = (orders)=> ({
  type: LOAD_ORDERS,
  payload: orders
});

export const _loadProducts = (products)=> ({
  type: LOAD_PRODUCTS,
  payload: products
});

export const _updateOrder = order => ({
  type: UPDATE_ORDER,
  payload: order
});
