import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SideMenu({ menuItems }) {
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
