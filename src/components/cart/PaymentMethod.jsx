import React, { useEffect, useState } from 'react';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';
import { useSelector } from 'react-redux';
import { calculateOrderCost } from '../../helpers/helpers';
import {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
} from '../../redux/api/orderApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function PaymentMethod() {
  const [method, setMethod] = useState('');

  const navigate = useNavigate();

  const [createNewOrder, { isLoading, error, isSuccess }] =
    useCreateNewOrderMutation();

  const [
    stripeCheckoutSession,
    { data: checkoutData, error: checkoutError, isLoading: checkoutLoading },
  ] = useStripeCheckoutSessionMutation();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { shippingAmount, ivaAmount, totalAmount } =
    calculateOrderCost(cartItems);

  useEffect(() => {
    if (checkoutError) {
      toast.error(checkoutError?.data?.message);
    }
    if (checkoutData) {
      console.log(checkoutData?.url);
      window.location.href = checkoutData?.url;
    }
  }, [checkoutData, checkoutError]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      navigate('/me/orders?order_success=true');
    }
  }, [error, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (method === 'COD') {
      const orderData = {
        orderItems: cartItems,
        shippingInfo,
        ivaAmount,
        shippingAmount,
        paymentMethod: 'COD',
        paymentInfo: {
          status: 'Not Paid',
        },
      };

      createNewOrder(orderData);
    }

    if (method === 'Card') {
      const orderData = {
        itemsPrice: totalAmount,
        orderItems: cartItems,
        shippingInfo,
      };

      stripeCheckoutSession(orderData);
    }
  };
  return (
    <>
      <MetaData title={'Método de pago'} />
      <CheckoutSteps shipping confirmOrder paymentAmount />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Selecciona método de pago</h2>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                onChange={(e) => setMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="codradio">
                Efectivo en la entrega
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                onChange={(e) => setMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="cardradio">
                Tarjeta - VISA, MasterCard
              </label>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn py-2 w-100"
              disabled={isLoading || checkoutLoading}
            >
              CONTINUAR
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
