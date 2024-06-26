import React, { useEffect, useState } from 'react';
import {
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from '../../redux/api/orderApi';
import { Link, useParams } from 'react-router-dom';
import Loader from '../layout/Loader';
import AdminLayout from '../layout/AdminLayout';
import toast from 'react-hot-toast';
import MetaData from '../layout/MetaData';

export default function ProcessOrder() {
  const [status, setStatus] = useState('');
  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  const [
    updateOrder,
    { isLoading: isUpdateLoading, isSuccess, error: isUpdateError },
  ] = useUpdateOrderMutation();

  useEffect(() => {
    if (order?.orderStatus) {
      setStatus(order?.orderStatus);
    }
  }, [order?.orderStatus]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  useEffect(() => {
    if (isUpdateError) {
      toast.error(isUpdateError?.data?.message);
    }

    if (isSuccess) {
      toast.success('Orden actualizada!');
    }
  }, [isUpdateError, isSuccess]);

  if (isLoading) return <Loader />;

  const updateOrderHandler = (id) => {
    const data = { status };
    updateOrder({ id, body: data });
  };

  return (
    <AdminLayout>
      <MetaData title={'Procesar orden'} />
      <div className="row d-flex justify-content-around">
        <div className="col-12 col-lg-8 order-details">
          <h3 className="mt-5 mb-4">Detalles de la orden</h3>

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
                <th scope="row">Número telefónico</th>
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

          <h3 className="mt-5 mb-4">Información de pago</h3>
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
                <th scope="row">Stripe ID</th>
                <td>{order?.stripeId}</td>
              </tr>
              <tr>
                <th scope="row">Cantidad</th>
                <td>${order?.total}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 my-4">Resumen:</h3>

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

        <div className="col-12 col-lg-3 mt-5">
          <h4 className="my-4">Estatus</h4>

          <div className="mb-3">
            <select
              className="form-select"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <button
            className="btn btn-primary w-100"
            disabled={isUpdateLoading}
            onClick={() => updateOrderHandler(order?.id)}
          >
            Actualizar estatus
          </button>

          <h4 className="mt-5 mb-3">Ticket de compra</h4>
          <Link
            to={`/invoice/order/${order?.id}`}
            className="btn btn-success w-100"
          >
            <i className="fa fa-print"></i> Generar Ticket
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
