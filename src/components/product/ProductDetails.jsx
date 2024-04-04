import React, { useEffect, useState } from 'react';
import { useGetProductDetailsQuery } from '../../redux/api/productsApi';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader';
import toast from 'react-hot-toast';
import StarRatings from 'react-star-ratings';

export default function ProductDetails() {
  const params = useParams();
  const { data, isLoading, error, isError } = useGetProductDetailsQuery(
    params?.id
  );

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  const product = data?.product;
  const images = data?.images;

  const [activeImg, setActiveImg] = useState('');

  useEffect(() => {
    setActiveImg(
      data?.images[0]?.url ? images[0]?.url : '/images/default_product.png'
    );
  }, [product, data, images]);

  if (isLoading) return <Loader />;

  return (
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <img
            className="d-block w-100"
            src={activeImg}
            alt={activeImg}
            width="340"
            height="390"
          />
        </div>
        <div className="row justify-content-start mt-5">
          {images?.map((img) => (
            <div className="col-2 ms-4 mt-2">
              <a role="button">
                <img
                  className={`d-block border rounded p-3 cursor-pointer ${
                    img?.url === activeImg ? 'border-warning' : ''
                  }`}
                  height="100"
                  width="100"
                  src={img?.url}
                  alt={img?.url}
                  onClick={(e) => setActiveImg(img?.url)}
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{product?.name}</h3>
        <p id="product_id">Product # w43453456456756786</p>

        <hr />

        <div className="d-flex">
          <StarRatings
            rating={product?.rating || 0}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name="rating"
            starDimension="24px"
            starSpacing="1px"
          />
          <span id="no-of-reviews" className="pt-1 ps-2">
            {' '}
            ({product?.commentNum} Reviews){' '}
          </span>
        </div>
        <hr />

        <p id="product_price">${product?.price}</p>
        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus">-</span>
          <input
            type="number"
            className="form-control count d-inline"
            value="1"
            readonly
          />
          <span className="btn btn-primary plus">+</span>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled=""
        >
          Añadir al carrito
        </button>

        <hr />

        <p>
          Status:{' '}
          <span
            id="stock_status"
            className={product?.stock > 0 ? 'greenColor' : 'redColor'}
          >
            {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </p>

        <hr />

        <h4 className="mt-2">Descripción:</h4>
        <p>{product?.description}</p>
        <hr />
        <p id="product_seller mb-3">
          Vendido Por: <strong>{product?.seller}</strong>
        </p>

        <div className="alert alert-danger my-5" type="alert">
          Login para publicar to reseña.
        </div>
      </div>
    </div>
  );
}
