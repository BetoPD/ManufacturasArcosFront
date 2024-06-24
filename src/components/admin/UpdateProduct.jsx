import React, { useEffect, useState } from 'react';
import AdminLayout from '../layout/AdminLayout';
import Loader from '../layout/Loader';
import {
  useUpdateProductMutation,
  useGetAdminCategoriesQuery,
  useGetProductDetailsQuery,
} from '../../redux/api/productsApi';
import toast from 'react-hot-toast';
import MetaData from '../layout/MetaData';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [seller, setSeller] = useState('');
  const [categoryId, setCategoryId] = useState();
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const {
    data: categories,
    isLoading: isLoadingProduct,
    error: errorProduct,
  } = useGetAdminCategoriesQuery();

  const [updateProduct, { error, isLoading, isSuccess }] =
    useUpdateProductMutation();

  const {
    data,
    isLoading: isLoadingDetails,
    error: errorDetails,
  } = useGetProductDetailsQuery(params?.id);

  useEffect(() => {
    if (errorProduct) {
      toast?.error(errorProduct?.data?.message);
    }
  }, [errorProduct]);

  useEffect(() => {
    if (errorDetails) {
      toast?.error(errorDetails?.data?.message);
    }
  }, [errorDetails]);

  useEffect(() => {
    if (data?.product) {
      setName(data?.product?.name);
      setDescription(data?.product?.description);
      setSeller(data?.product?.seller);
      setCategoryId(data?.product?.categoryId);
      setPrice(data?.product?.price);
      setStock(data?.product?.stock);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast?.error(error?.data?.message);
    }
    if (isSuccess) {
      toast?.success('Producto actualizado con éxito!');
      navigate('/admin/products');
    }
  }, [isSuccess, error, navigate]);

  if (isLoadingProduct) return <Loader />;

  if (isLoadingDetails) return <Loader />;

  const submitHandler = (e) => {
    e.preventDefault();
    const body = { name, price, description, categoryId, seller, stock };
    updateProduct({ id: params?.id, body });
  };

  return (
    <AdminLayout>
      <MetaData title={'Actualizar producto'} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Actualizar Producto</h2>
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                {' '}
                Nombre{' '}
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description_field" className="form-label">
                Descripción
              </label>
              <textarea
                className="form-control"
                id="description_field"
                rows="8"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="price_field" className="form-label">
                  {' '}
                  Precio{' '}
                </label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>

              <div className="mb-3 col">
                <label htmlFor="stock_field" className="form-label">
                  {' '}
                  Stock{' '}
                </label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  name="stock"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="category_field" className="form-label">
                  {' '}
                  Categoría{' '}
                </label>
                <select
                  className="form-select"
                  id="category_field"
                  name="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {categories?.categories?.map((category) => (
                    <option key={category?.id} value={category?.id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 col">
                <label htmlFor="seller_field" className="form-label">
                  {' '}
                  Vendido Por:{' '}
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  name="seller"
                  value={seller}
                  onChange={(e) => setSeller(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? 'Actualizando...' : 'ACTUALIZAR'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
