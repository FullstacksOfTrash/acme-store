import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { reset_thunk, loadProducts_thunk, loadOrders_thunk } from '../store/thunks';

class Nav extends Component {
  constructor() {
    super();
  }

  render() {
    const { orders, products, reset } = this.props;
    return (
      <Fragment>
        <h2>Nav</h2>
        <ul>
          <li><Link to='/products'>Products ({products.length})</Link></li>
          <li><Link to='/orders'>Submitted Orders ({orders.length - 1})</Link></li>
        </ul>
        <button onClick={reset}>Reset</button>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ orders, products })=> {
  return {
    orders,
    products
  };
};

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    reset: ()=> {
      dispatch(reset_thunk());
      // history.push('/');
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);