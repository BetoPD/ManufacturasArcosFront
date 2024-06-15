import React from 'react';
import SideMenu from './SideMenu';

export default function AdminLayout({ children }) {
  const menuItems = [
    {
      name: 'Panel de control',
      url: '/admin/dashboard',
      icon: 'fas fa-tachometer-alt',
    },
    {
      name: 'Nuevo Producto',
      url: '/admin/product/new',
      icon: 'fas fa-plus',
    },
    {
      name: 'Productos',
      url: '/admin/products',
      icon: 'fab fa-product-hunt',
    },
    {
      name: 'Órdenes',
      url: '/admin/orders',
      icon: 'fas fa-receipt',
    },
    {
      name: 'Usuarios',
      url: '/admin/users',
      icon: 'fas fa-user',
    },
    {
      name: 'Reseñas',
      url: '/admin/reviews',
      icon: 'fas fa-star',
    },
  ];
  return (
    <div>
      <div className="mt-2 mb-4 py-4">
        <h2 className="text-center fw-bolder">Panel de control</h2>
      </div>

      <div className="row justify-content-around">
        <div className="col-12 col-lg-3">
          <SideMenu menuItems={menuItems} />
        </div>
        <div className="col-12 col-lg-8 user-dashboard">{children}</div>
      </div>
    </div>
  );
}
