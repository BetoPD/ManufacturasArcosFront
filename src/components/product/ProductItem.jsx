import React from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

export default function ProductItem({ product, columnSize }) {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${columnSize} my-3`}>
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={product?.url ? product?.url : './images/default_product.png'}
          alt={product?.name}
        />
        <div className="card-body ps-3 d-flex justify-content-center flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product?.id}`}>{product?.name}</Link>
          </h5>
          <div className="ratings mt-auto d-flex">
            <StarRatings
              rating={product?.rating || 0}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
              starDimension="22px"
              starSpacing="1px"
            />
            <span id="no_of_reviews" className="pt-2 ps-2">
              {' '}
              ({product?.commentNum}){' '}
            </span>
          </div>
          <p className="card-text mt-2">${product?.price}</p>
          <Link
            to={`/product/${product?.id}`}
            id="view_btn"
            className="btn btn-block"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}
