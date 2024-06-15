import React from 'react';
import SideMenu from './SideMenu';

export default function UserLayout({ children }) {
  const menuItems = [
    {
      name: 'Perfil',
      url: '/me/profile',
      icon: 'fas fa-user',
    },
    {
      name: 'Actualizar perfil',
      url: '/me/update_profile',
      icon: 'fas fa-user',
    },
    {
      name: 'Subir imagen',
      url: '/me/upload_avatar',
      icon: 'fas fa-user-circle',
    },
    {
      name: 'Actualizar Contraseña',
      url: '/me/update_password',
      icon: 'fas fa-lock',
    },
  ];
  return (
    <div>
      <div className="mt-2 mb-4 py-4">
        <h2 className="text-center fw-bolder">Configuración de Usuario</h2>
      </div>

      <div className="container">
        <div className="row justify-content-around">
          <div className="col-12 col-lg-3">
            <SideMenu menuItems={menuItems} />
          </div>
          <div className="col-12 col-lg-8 user-dashboard">{children}</div>
        </div>
      </div>
    </div>
  );
}
