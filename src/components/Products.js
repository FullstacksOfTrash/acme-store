import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateLineItem_thunk, createLineItem_thunk, deleteLineItem_thunk, updateOrder_thunk } from '../store/thunks';


const getCart = (orders)=> {
  return orders.find( order => order.status === 'CART')
}

const getQuantityInCart = (orders, product)=> {
  if (!orders.length) {
    return [];
  }
  // console.log('orders:', orders);

  const cart = orders.find( order => order.status === 'CART' );

  // console.log('cart:', cart);

  const lineItem = cart.lineItems.find( lineItem => lineItem.productId === product.id );
  // console.log('lineItem:', lineItem);
  return lineItem ? lineItem.quantity : 0;

  //loop over all orders where the status is 'CART'
  //find its lineItems where the lineItem's productId === product.id

  //return that lineItem's quantity

};


const getLineItemInCart = (orders, product)=> {
  if (!orders.length) {
    return null;
  }
  const cart = orders.find( order => order.status === 'CART' );
  const lineItem = cart.lineItems.find( lineItem => lineItem.productId === product.id );
  // console.log('getLineItemInCart, lineItem:', lineItem);
  return lineItem;
};






class Products extends Component {
  constructor() {
    super();
  }

  render() {
    const { products, orders, increaseQuantity, createLineItem, decreaseQuantity, submitOrder } = this.props;
    const cart = getCart(orders);
    return (
      <Fragment>
        <h2>Products</h2>
        <ul>
          {
            products.map( product => {
              const quantity = getQuantityInCart(orders, product);
              // console.log('quantity:', quantity);
              const lineItem = getLineItemInCart(orders, product);
              const empty = lineItem && lineItem.quantity > 0 ? false : true;
              return (
                <li key={product.id}>
                  {product.name} - {quantity} in cart
                  <button disabled={empty} onClick={
                    ()=> decreaseQuantity(lineItem)
                  }>
                    -
                  </button>
                  <button onClick={
                    lineItem
                      ? ()=> increaseQuantity(lineItem)
                      : ()=> createLineItem(cart, product, 1) //order, product, quantity
                  }>
                    +
                  </button>
                </li>
                
              );
            }
            )
          }
          <hr />
          <button onClick={()=> submitOrder(cart)}>Submit Order (aka set orders's status to 'ORDER')</button>
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ products, orders })=> ({
  products,
  orders
});

const mapDispatchToProps = (dispatch, { history })=> ({
  increaseQuantity: (lineItem)=> {
    const payload = {
      ...lineItem,
      quantity: lineItem.quantity + 1
    };
    dispatch(updateLineItem_thunk(payload));
  },
  createLineItem: (order, product, quantity)=> {
    const lineItem = {
      orderId: order.id,
      productId: product.id,
      quantity
    };
    dispatch(createLineItem_thunk(lineItem));
  },
  decreaseQuantity: (lineItem)=> {
    if (lineItem.quantity === 0) {
      dispatch(deleteLineItem_thunk(lineItem));
    }
    const payload = {
      ...lineItem,
      quantity: lineItem.quantity - 1
    };
    dispatch(updateLineItem_thunk(payload));
  },
  submitOrder: (order)=> {
    dispatch(updateOrder_thunk({...order, status: 'ORDER'}));
    history.push('/orders');
  }
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);


//i will need to, for each product, find its lineItem
//then, for that lineItem




//if the lineItem i would like to update has a payload of quantity zero, i will make a DELETE request rather than a PUT