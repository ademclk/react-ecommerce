import axios from 'axios';

import {
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_FAILURE,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILURE,
    CLEAR_ERRORS
} from '../constants/productConstants';

export const getProducts = (currentPage) => async (dispatch) => {
    try {

        dispatch({ type: ALL_PRODUCTS_REQUEST });

        const { data } = await axios.get(`/api/v1/products?page=${currentPage}`);

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAILURE,
            payload: error.response.data.message
        })
    }
}

// Clear errors
export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}   