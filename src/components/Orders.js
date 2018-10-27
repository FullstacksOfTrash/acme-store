import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';


const getSubmittedOrders = (orders)=> {
  return orders.filter( order => order.status === 'ORDER' );
};


const getProduct = (products, id)=> {
  return products.find( product => product.id === id );
};

class Orders extends Component {
  constructor() {
    super();
  }

  render() {
    const { submittedOrders, products } = this.props;
    return (
      <Fragment>
        <h2>Orders</h2>
        <p>Submitted orders: {submittedOrders.length}</p>
        <ul>
          {
            submittedOrders.map( order => (
              <li key={order.id}>
                <p>Order: {order.id}</p>
                <ul>
                  {
                    order.lineItems.map( lineItem => {
                      const product = getProduct(products, lineItem.productId);
                      const { id, quantity } = lineItem;
                      return (
                        <li key={id}>
                          {product.name} - {quantity}
                        </li>
                      )
                    })
                  }
                </ul>
              </li>
            ))
          }
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ orders, products })=> {
  return {
    products,
    orders,
    submittedOrders: getSubmittedOrders(orders)
  };
};

export default connect(mapStateToProps)(Orders);