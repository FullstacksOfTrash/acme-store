import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { productsReducer, ordersReducer } from './reducers';


const reducer = combineReducers({
  products: productsReducer,
  orders: ordersReducer
});

const store = createStore(reducer, applyMiddleware(logger, thunk));



export default store;