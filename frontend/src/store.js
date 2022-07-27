import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productsReducer, productDetailsReducer } from './reducers/productReducers';

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer
});

let initialState = {};

const middleware = [thunk];
const store = configureStore({reducer}, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
