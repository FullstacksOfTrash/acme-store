import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

import { loadProducts_thunk, loadOrders_thunk } from '../store/thunks';

import Nav from './Nav';
import Orders from './Orders';
import Products from './Products';

class App extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {
    this.props.init();
  }

  render() {
    const { orders, products } = this.props;
    return (
      <Fragment>
        <Router>
          <Fragment>
            <Route path='/' component={Nav}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/products' component={Products}/>
          </Fragment>
        </Router>
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

const mapDispatchToProps = (dispatch)=> {
  return {
    init: ()=> {
      dispatch(loadProducts_thunk());
      dispatch(loadOrders_thunk());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);