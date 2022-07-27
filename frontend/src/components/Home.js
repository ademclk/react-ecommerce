import React, { Fragment, useEffect } from 'react'

import MetaData from './layout/MetaData'

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';

import Product from './product/Product';
import Loader from './layout/Loader';

const Home = () => {

    const dispatch = useDispatch();

    const { loading, products, error, productsCount } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                 <MetaData title={"Home of best products"} />
                 <h1 id="products_heading">Latest Products</h1>
                 <section id="products" className="container mt-5">
                     <div className="row">
                         {products && products.map(product => (
                             <Product key={product._id} product={product} />
                         ))}
                     </div>
                 </section>
                </Fragment>
            )}
        </Fragment>
    )  
}

export default Home