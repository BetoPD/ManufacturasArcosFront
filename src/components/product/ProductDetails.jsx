import React, { useEffect, useState } from 'react';
import { useGetProductDetailsQuery } from '../../redux/api/productsApi';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader';
import toast from 'react-hot-toast';
import StarRatings from 'react-star-ratings';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItems } from '../../redux/features/cartSlice';
import MetaData from '../layout/MetaData';
import NewReview from '../review/NewReview';
import ListReviews from '../review/ListReviews';

export default function ProductDetails() {
  const params = useParams();
  const dispatch = useDispatch();

  const [activeImg, setActiveImg] = useState('/images/default_product.png');
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useSelector((state) => state.auth);

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

  useEffect(() => {
    if (images?.[0]?.url) {
      setActiveImg(images[0].url);
    }
  }, [images]);

  if (isLoading) return <Loader />;

  const increaseQty = (e) => {
    setQuantity((prev) => {
      if (prev < product?.stock) {
        return prev + 1;
      }

      return prev;
    });
  };

  const decreaseQty = (e) => {
    setQuantity((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  const setItemToCart = () => {
    const cartItem = {
      product: product?.id,
      name: product?.name,
      price: product?.price,
      image: images[0]?.url,
      stock: product?.stock,
      quantity,
    };

    dispatch(setCartItems(cartItem));
    toast.success('Productos añadidos al carrito!');
  };

  return (
    <>
      <MetaData title={product?.name} />
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
              <div className="col-2 ms-4 mt-2" key={img?.url}>
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
          <p id="product_id">Producto # {product?.id}</p>

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
              ({product?.commentNum} Reseñas){' '}
            </span>
          </div>
          <hr />

          <p id="product_price">${product?.price}</p>
          <div className="stockCounter d-inline">
            <span className="btn btn-danger minus" onClick={decreaseQty}>
              -
            </span>
            <input
              type="number"
              className="form-control count d-inline"
              value={quantity}
              readOnly
            />
            <span className="btn btn-primary plus" onClick={increaseQty}>
              +
            </span>
          </div>
          <button
            type="button"
            id="cart_btn"
            className="btn btn-primary d-inline ms-4"
            disabled={product?.stock <= 0}
            onClick={setItemToCart}
          >
            Añadir al carrito
          </button>

          <hr />

          <p>
            Estatus:{' '}
            <span
              id="stock_status"
              className={product?.stock > 0 ? 'greenColor' : 'redColor'}
            >
              {product?.stock > 0 ? 'Disponible' : 'Agotado'}
            </span>
          </p>

          <hr />

          <h4 className="mt-2">Descripción:</h4>
          <p>{product?.description}</p>
          <hr />
          <p id="product_seller mb-3">
            Vendido Por: <strong>{product?.seller}</strong>
          </p>
          {isAuthenticated ? (
            <NewReview productId={params?.id} />
          ) : (
            <div className="alert alert-danger my-5" type="alert">
              Login para publicar to reseña.
            </div>
          )}
        </div>
      </div>
      {data?.reviews?.length > 0 && <ListReviews reviews={data?.reviews} />}
    </>
  );
}
