import React from 'react';
import { Link } from 'react-router-dom';

export default function CheckoutSteps({ shipping, confirmOrder, payment }) {
  return (
    <div className="checkout-progress d-flex justify-content-center mt-5 row">
      {shipping ? (
        <Link
          to="/shipping"
          className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
        >
          <div className="triangle2-active"></div>
          <div className="step active-step">Inf. de envío</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link
          to="#!"
          className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
          disabled
        >
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Inf. de envío</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}

      {confirmOrder ? (
        <Link
          to="/confirm_order"
          className="float-right mt-2 mt-md-0 col-12 col-md-4 col-lg-3"
        >
          <div className="triangle2-active"></div>
          <div className="step active-step">Confirmar Orden</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link
          to="#!"
          className="float-right mt-2 mt-md-0 col-12 col-md-4 col-lg-3"
          disabled
        >
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Confirmar Orden</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}

      {payment ? (
        <Link
          to="/payment_method"
          className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
        >
          <div className="triangle2-active"></div>
          <div className="step active-step">Pago</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link
          to="#!"
          className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
          disabled
        >
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Pago</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}
    </div>
  );
}
