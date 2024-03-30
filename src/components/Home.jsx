import React from 'react';
import MetaData from './layout/MetaData';
import { useGetProductsQuery } from '../redux/api/productsApi';
import ProductItem from './product/ProductItem';

export default function Home() {
  const { data, isLoading } = useGetProductsQuery();
  return (
    <>
      <MetaData title={'Compra MDF!'} />
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-12">
            <h1 id="products_heading" className="text-secondary">
              Productos Recientes
            </h1>
            <section id="products" className="mt-5">
              <div className="row">
                {data?.products?.map((product) => (
                  <ProductItem product={product} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
