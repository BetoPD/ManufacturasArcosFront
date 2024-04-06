import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SideMenu() {
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

  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleClick = (url) => {
    setActiveMenuItem(url);
  };

  return (
    <div className="list-group mt-5 pl-4">
      {menuItems.map((menuItem, index) => (
        <Link
          key={index}
          to={menuItem.url}
          className={`fw-bold list-group-item list-group-item-action ${
            activeMenuItem.includes(menuItem.url) ? 'active' : ''
          }`}
          onClick={() => handleClick(menuItem.url)}
          aria-current={
            activeMenuItem.includes(menuItem.url) ? 'true' : 'false'
          }
        >
          <i className={`${menuItem.icon} fa-fw pe-2`}></i>
          {menuItem.name}
        </Link>
      ))}
    </div>
  );
}
