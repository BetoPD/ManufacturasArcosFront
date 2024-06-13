import './invoice.css';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrderDetailsQuery } from '../../redux/api/orderApi';
import Loader from '../layout/Loader';
import toast from 'react-hot-toast';
import MetaData from '../layout/MetaData';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Invoice() {
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || 'Ocurrió un error');
      navigate('/me/orders');
    }
  }, [error, navigate]);

  const handleDownload = () => {
    const input = document.getElementById('order_invoice');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`recibo_${order?.id}.pdf`);
    });
  };

  if (isLoading) return <Loader />;
  
  return (
    <>
      <MetaData title={'Recibo'} />
      <div className="container invoice-container mt-5">
        <div id="order_invoice" className="p-3">
          <header className="text-center my-4">
            <h1 className="text-success">Manufacturas Arcos</h1>
            <h2 className="text-success">Recibo</h2>
            <p>ID de Orden: {order?.id}</p>
            <p>Fecha: {new Date(order?.created_at).toLocaleDateString()}</p>
            <p>
              Dirección: C. San Francisco 121, San José del Olivar, Olivar de
              los Padres, Álvaro Obregón, 01780 Ciudad de México, CDMX
            </p>
          </header>

          <section className="mb-4">
            <h3 className="text-success">Información del Cliente</h3>
            <p>
              <strong>Nombre:</strong> {order?.name}
            </p>
            <p>
              <strong>Correo Electrónico:</strong> {order?.email}
            </p>
            <p>
              <strong>Dirección:</strong> {order?.address}
            </p>
          </section>

          <section className="mb-4">
            <h3 className="text-success">Artículos de la Orden</h3>
            <table className="table table-bordered">
              <thead className="table-success">
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {order?.products?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.name}</td>
                    <td>{item?.quantity}</td>
                    <td>${item?.price?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h3 className="text-success">Resumen de la Orden</h3>
            <p>
              <strong>Subtotal:</strong> ${(order?.total / 1.16).toFixed(2)}
            </p>
            <p>
              <strong>Envío:</strong> ${order?.shippingAmount?.toFixed(2)}
            </p>
            <p>
              <strong>Impuesto:</strong> ${order?.ivaAmount?.toFixed(2)}
            </p>
            <h2>
              <strong>Total:</strong> ${order?.total?.toFixed(2)}
            </h2>
          </section>
        </div>
      </div>
      <div className="text-center my-4">
        <button className="btn btn-success" onClick={handleDownload}>
          Descargar PDF
        </button>
      </div>
    </>
  );
}
