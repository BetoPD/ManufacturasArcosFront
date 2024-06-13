import React, { useEffect } from 'react';
import MetaData from '../layout/MetaData';
import { Link, useParams } from 'react-router-dom';
import { useOrderDetailsQuery } from '../../redux/api/orderApi';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';

export default function OrderDetails() {
  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  if (isLoading) return <Loader />;
  return (
    <>
      <MetaData title={'Detalles Orden'} />
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-lg-9 mt-5 order-details">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-5 mb-4">Detalles de la orden</h3>
            <Link
              className="btn btn-success"
              to={`/invoice/order/${order?.id}`}
            >
              <i className="fa fa-print"></i> Factura
            </Link>
          </div>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>{order?.id}</td>
              </tr>
              <tr>
                <th scope="row">Estatus</th>
                <td
                  className={
                    order?.orderStatus === 'Delivered'
                      ? 'greenColor'
                      : 'redColor'
                  }
                >
                  <b>{order?.orderStatus}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Fecha</th>
                <td>{new Date(order?.created_at).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Información de envío</h3>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Nombre</th>
                <td>{order?.name}</td>
              </tr>
              <tr>
                <th scope="row">Teléfono</th>
                <td>{order?.phoneNo}</td>
              </tr>
              <tr>
                <th scope="row">Dirección</th>
                <td>
                  {order?.address}, {order?.city}, {order?.country}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Información de Pago</h3>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Estatus</th>
                <td
                  className={
                    order?.stripeStatus === 'paid' ? 'greenColor' : 'redColor'
                  }
                >
                  <b>{order?.stripeStatus}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Método</th>
                <td>{order?.paymentMethod}</td>
              </tr>
              <tr>
                <th scope="row">ID Stripe</th>
                <td>{order?.stripeId || 'Null'}</td>
              </tr>
              <tr>
                <th scope="row">Total</th>
                <td>${order?.total}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 my-4">Productos:</h3>
          <hr />
          <div className="cart-item my-1">
            {order?.products?.map((product) => (
              <div className="row my-5">
                <div className="col-4 col-lg-2">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    height="45"
                    width="65"
                  />
                </div>

                <div className="col-5 col-lg-5">
                  <Link to={`/product/${product?.id}`}>{product?.name}</Link>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p>${product?.price}</p>
                </div>

                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <p>{product?.quantity} Pieza(s)</p>
                </div>
              </div>
            ))}
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}
