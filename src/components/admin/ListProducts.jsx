import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useGetAdminProductsQuery } from '../../redux/api/productsApi';
import AdminLayout from '../layout/AdminLayout';

export default function ListProducts() {
  const { data, isLoading, error } = useGetAdminProductsQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  if (isLoading) return <Loader />;

  const setProducts = () => {
    const products = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Nombre',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Precio',
          field: 'price',
          sort: 'asc',
        },
        {
          label: 'Stock',
          field: 'stock',
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

    data?.products?.forEach((product) =>
      products.rows.push({
        id: product?.id,
        name: product?.name,
        price: product?.price,
        stock: product?.stock,
        actions: (
          <>
            <Link
              to={`/admin/products/${product?.id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Link
              to={`/admin/products/${product?.id}/upload_images`}
              className="btn btn-outline-success ms-2"
            >
              <i className="fa fa-image"></i>
            </Link>
            <button className="btn btn-outline-danger ms-2">
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      })
    );
    return products;
  };

  return (
    <AdminLayout>
      <MetaData title={'Productos en venta'} />
      <div>
        <h1 className="my-5">{data?.products?.length} Productos</h1>
        <MDBDataTable
          className="px-3"
          data={setProducts()}
          bordered
          striped
          hover
        />
      </div>
    </AdminLayout>
  );
}
