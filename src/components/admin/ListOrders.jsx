import React, { useEffect } from 'react';
import { useGetAdminOrdersQuery } from '../../redux/api/orderApi';
import toast from 'react-hot-toast';
import AdminLayout from '../layout/AdminLayout';
import MetaData from '../layout/MetaData';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader';

export default function ListOrders() {
  const { data, isLoading, error } = useGetAdminOrdersQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);


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
          label: 'Estatus de Pago',
          field: 'paymentStatus',
          sort: 'asc',
        },
        {
          label: 'Estatus de la orden',
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
        paymentStatus: order?.stripeStatus,
        orderStatus: order?.orderStatus,
        actions: (
          <>
            <Link
              to={`/admin/orders/${order?.id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-outline-danger ms-2"
              //   onClick={() => deleteProductHandler(order?.id)}
              //   disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      })
    );
    return orders;
  };

  return (
    <AdminLayout>
      <MetaData title={'Productos en venta'} />
      <div>
        <h1 className="my-5">{data?.orders?.length} Órdenes</h1>
        <MDBDataTable
          className="px-3"
          data={setOrders()}
          bordered
          striped
          hover
        />
      </div>
    </AdminLayout>
  );
}
