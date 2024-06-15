import React from 'react';
import AdminLayout from '../layout/AdminLayout';

export default function Dashboard() {
  return (
    <AdminLayout>
      {' '}
      <div className="d-flex justify-content-start align-items-center">
        <div className="mb-3 me-4">
          <label className="form-label d-block">Fecha Inicial</label>
          <input type="date" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label d-block">Fecha Final</label>
          <input type="date" className="form-control" />
        </div>
        <button className="btn fetch-btn ms-4 mt-3 px-5">Pedir</button>
      </div>
      <div className="row pr-4 my-5">
        <div className="col-xl-6 col-sm-12 mb-3">
          <div className="card text-white bg-success o-hidden h-100">
            <div className="card-body">
              <div className="text-center card-font-size">
                Ventas
                <br />
                <b>$0.00</b>
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
                <b>0</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5"></div>
    </AdminLayout>
  );
}
