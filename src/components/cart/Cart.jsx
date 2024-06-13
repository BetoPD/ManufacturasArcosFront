import React from 'react';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeCartItem, setCartItems } from '../../redux/features/cartSlice';

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const increaseQty = (item, quantity) => {
    const newQty = quantity + 1;

    if (newQty > item?.stock) return;

    setItemToCart(item, newQty);
  };

  const decreaseQty = (item, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    setItemToCart(item, newQty);
  };

  const setItemToCart = (item, newQty) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQty,
    };

    dispatch(setCartItems(cartItem));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <>
      <MetaData title={'Tu carrito'} />
      {cartItems?.length === 0 ? (
        <h2 className="mt-5">Carrito vacío</h2>
      ) : (
        <>
          <h2 className="mt-5">
            Tu carrito: <b>{`${cartItems?.length} producto(s)`}</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems?.map((cartItem) => (
                <React.Fragment key={cartItem?.product}>
                  <hr />
                  <div className="cart-item" data-key="product1">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={cartItem?.image || '/images/default_product.png'}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>
                      <div className="col-5 col-lg-3">
                        <Link to={`/product/${cartItem?.product}`}>
                          {' '}
                          {cartItem?.name}{' '}
                        </Link>
                      </div>
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${cartItem?.price}</p>
                      </div>
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              decreaseQty(cartItem, cartItem?.quantity)
                            }
                          >
                            {' '}
                            -{' '}
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={cartItem?.quantity}
                            readOnly
                          />
                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              increaseQty(cartItem, cartItem?.quantity)
                            }
                          >
                            {' '}
                            +{' '}
                          </span>
                        </div>
                      </div>
                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() =>
                            removeCartItemHandler(cartItem?.product)
                          }
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Resumen de la orden</h4>
                <hr />
                <p>
                  Subtotal:{' '}
                  <span className="order-summary-values">
                    {cartItems?.reduce(
                      (prev, item) => prev + item?.quantity,
                      0
                    )}{' '}
                    (Unidades)
                  </span>
                </p>
                <p>
                  Est. total:{' '}
                  <span className="order-summary-values">
                    {'$'}
                    {cartItems
                      ?.reduce(
                        (prev, item) => prev + item?.price * item?.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>
                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary w-100"
                  onClick={checkoutHandler}
                >
                  Proceder al pago
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
