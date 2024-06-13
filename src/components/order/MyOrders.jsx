import React, { useEffect } from 'react';
import { useMyOrdersQuery } from '../../redux/api/orderApi';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';
import { MDBDataTable } from 'mdbreact';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/features/cartSlice';
export default function MyOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, error } = useMyOrdersQuery();
  const [searchParams] = useSearchParams();
  const orderSuccess = searchParams.get('order_success');

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (orderSuccess) {
      dispatch(clearCart());
      navigate('/me/orders');
    }
  }, [error, navigate, orderSuccess, dispatch]);

  if (isLoading) return <Loader />;

  const setOrders = () => {
    const orders = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Total Pagado',
          field: 'total',
          sort: 'asc',
        },
        {
          label: 'Estatus pago',
          field: 'status',
          sort: 'asc',
        },
        {
          label: 'Estatus Orden',
          field: 'orderStatus',
          sort: 'asc',
        },
        {
          label: 'Acciones',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    data?.orders?.forEach((order) =>
      orders.rows.push({
        id: order?.id,
        total: order?.total,
        status: order?.stripeStatus?.toUpperCase(),
        orderStatus: order?.orderStatus?.toUpperCase(),
        actions: (
          <>
            <Link to={`/me/orders/${order?.id}`} className="btn btn-primary">
              <i className="fa fa-eye"></i>
            </Link>
            <Link
              to={`/invoice/order/${order?.id}`}
              className="btn btn-success ms-2"
            >
              <i className="fa fa-print"></i>
            </Link>
          </>
        ),
      })
    );
    return orders;
  };

  return (
    <>
      <MetaData title={'Tus órdenes'} />
      <div>
        <h1 className="my-5">{data?.orders?.length} Orders</h1>
        <MDBDataTable
          className="px-3"
          data={setOrders()}
          bordered
          striped
          hover
        />
      </div>
    </>
  );
}
