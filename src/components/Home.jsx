import React, { useEffect } from 'react';
import MetaData from './layout/MetaData';
import { useGetProductsQuery } from '../redux/api/productsApi';
import ProductItem from './product/ProductItem';
import Loader from './layout/Loader';
import toast from 'react-hot-toast';
import CustomPagination from './layout/CustomPagination';
import { useSearchParams } from 'react-router-dom';
import Filters from './layout/Filters';

export default function Home() {
  let [searchParams] = useSearchParams();

  const page = searchParams.get('page') || 1;
  const keyword = searchParams.get('keyword') || '';
  const min = searchParams.get('min');
  const max = searchParams.get('max');
  const category = searchParams.get('category');
  const rating = searchParams.get('ratings');

  const params = { page, keyword };

  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);
  rating !== null && (params.rating = rating);

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  const columnSize = keyword ? 4 : 3;

  if (isLoading) return <Loader />;

  const categories = data?.categories;

  return (
    <>
      <MetaData title={'Compra MDF!'} />
      <div className="row">
        {keyword && (
          <div className="col-6 col-md-3 mt-5">
            <Filters categories={categories} />
          </div>
        )}
        <div className={keyword ? 'col-6 col-md-9' : 'col-6 col-md-12'}>
          <h1 id="products_heading" className="text-secondary">
            {keyword
              ? `${data?.products?.length} productos encontrados con palabra: ${keyword}`
              : 'Productos Recientes'}
          </h1>
          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product) => (
                <ProductItem
                  product={product}
                  columnSize={columnSize}
                  key={product?.id}
                />
              ))}
            </div>
          </section>
          <CustomPagination
            resPerPage={data?.resPerPage}
            filteredProductsCount={data?.filteredProductsCount}
          />
        </div>
      </div>
    </>
  );
}
