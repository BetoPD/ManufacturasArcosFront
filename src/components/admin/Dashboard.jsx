import React, { useEffect, useState } from 'react';
import AdminLayout from '../layout/AdminLayout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SalesChart from '../charts/SalesChart';
import { useLazyGetSalesQuery } from '../../redux/api/orderApi';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

export default function Dashboard() {
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(1)));
  const [endDate, setEndDate] = useState(new Date());
  const [getSales, { data, error, isLoading }] = useLazyGetSalesQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (startDate && endDate && !data) {
      getSales({
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      });
    }
  }, [error, data, startDate, endDate, getSales]);

  const handleSubmit = () => {
    getSales({
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    });
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={'Panel de control'} />
      <div className="d-flex justify-content-start align-items-center">
        <div className="mb-3 me-4">
          <label className="form-label d-block">Fecha Inicial</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label d-block">Fecha Final</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="form-control"
          />
        </div>
        <button className="btn fetch-btn ms-4 mt-3 px-5" onClick={handleSubmit}>
          Pedir
        </button>
      </div>
      <div className="row pr-4 my-5">
        <div className="col-xl-6 col-sm-12 mb-3">
          <div className="card text-white bg-success o-hidden h-100">
            <div className="card-body">
              <div className="text-center card-font-size">
                Ventas
                <br />
                <b>${data?.totalSales?.toFixed(2)}</b>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-sm-12 mb-3">
          <div className="card text-white bg-danger o-hidden h-100">
            <div className="card-body">
              <div className="text-center card-font-size">
                Órdenes
                <br />
                <b>{data?.numOrders}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SalesChart salesData={data?.sales} />
      <div className="mb-5"></div>
    </AdminLayout>
  );
}
