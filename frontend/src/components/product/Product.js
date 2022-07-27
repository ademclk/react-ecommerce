import React from 'react'
import { Link } from 'react-router-dom';
// Instead of a element with href attribute we use Link. Because whenever you click a link with a element it refresh
// the page but Link doesn't.

const Product = ({ product }) => {
    return (
        <div key={product._id} className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={product.image[0].url} alt='product'
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={
                                { width: `${(product.rating / 5) * 100}%` }
                            }></div>
                        </div>
                        <span id="no_of_reviews">({product.numberOfReviews} Reviews)</span>
                    </div>
                    <p className="card-text">${product.price}</p>
                    <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                </div>
            </div>
        </div>
    )
}

export default Product