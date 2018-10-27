import axios from 'axios';

import { _loadProducts } from './actionCreators';
import { _loadOrders } from './actionCreators';
import { _updateOrder } from './actionCreators';





export const loadProducts_thunk = ()=> {
  return (dispatch)=> {
    axios.get('/api/products')
      .then(res => res.data)
      .then(products => dispatch(_loadProducts(products)));
  };
};

export const loadOrders_thunk = ()=> {
  return (dispatch)=> {
    axios.get('/api/orders')
      .then(res => res.data)
      .then(orders => dispatch(_loadOrders(orders)));
  };
};

export const updateLineItem_thunk = (lineItem)=> {
  return (dispatch)=> {
    axios.put(`/api/orders/${lineItem.orderId}/lineItems/${lineItem.id}`, lineItem)
      .then(()=> axios.get('/api/orders'))
      .then(res => res.data)
      .then(orders => dispatch(_loadOrders(orders)));
  };
};

export const createLineItem_thunk = (lineItem)=> { //assumes lineItem data has been prepared before passed in
  // const lineItem = {
  //   orderId: order.id,
  //   productId: product.id,
  //   quantity
  // }
  return (dispatch)=> {
    axios.post(`/api/orders/${lineItem.orderId}/lineItems`, lineItem)
      .then(()=> axios.get('/api/orders'))
      .then(res => res.data)
      .then(orders => dispatch(_loadOrders(orders)));
  };
};

export const deleteLineItem_thunk = (lineItem)=> {
  return (dispatch)=> {
    axios.delete(`/api/orders/${lineItem.orderId}/lineItems/${lineItem.id}`)
      .then(()=> axios.get('/api/orders'))
      .then(res => res.data)
      .then(orders => dispatch(_loadOrders(orders)));
  };
};


export const updateOrder_thunk = (order)=> {
  return (dispatch)=> {
    axios.put(`/api/orders/${order.id}`, order)
      .then(res => res.data)
      .then(order => dispatch(_updateOrder(order)))
      .then(()=> axios.get('/api/orders'))
      .then(res => res.data)
      .then(orders => dispatch(_loadOrders(orders)))  
  };
};


export const reset_thunk = ()=> {
  return dispatch =>
    axios.post('/api/reset')
      .then(()=> {
        dispatch(loadProducts_thunk());
        dispatch(loadOrders_thunk());
      });
};