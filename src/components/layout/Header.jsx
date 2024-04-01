import React from 'react';
import Search from './Search';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <Link to="/">
            <img src="/images/shopit_logo.png" alt="ShopIT Logo" />
          </Link>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/cart" style={{ 'text-decoration': 'none' }}>
          <span id="cart" className="ms-3">
            {' '}
            Cart{' '}
          </span>
          <span className="ms-1" id="cart_count">
            0
          </span>
        </Link>

        <div className="ms-4 dropdown">
          <button
            className="btn dropdown-toggle text-white"
            type="button"
            id="dropDownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <figure className="avatar avatar-nav">
              <img
                src="../images/default_avatar.jpg"
                alt="User Avatar"
                className="rounded-circle"
              />
            </figure>
            <span>User</span>
          </button>
          <div
            className="dropdown-menu w-100"
            aria-labelledby="dropDownMenuButton"
          >
            <Link className="dropdown-item" to="/admin/dashboard">
              {' '}
              Panel de Control{' '}
            </Link>

            <Link className="dropdown-item" to="/me/orders">
              {' '}
              Órdenes{' '}
            </Link>

            <Link className="dropdown-item" to="/me/profile">
              {' '}
              Perfil{' '}
            </Link>

            <Link className="dropdown-item text-danger" to="/">
              {' '}
              Logout{' '}
            </Link>
          </div>
        </div>

        <Link to="/login" className="btn ms-4" id="login_btn">
          {' '}
          Login{' '}
        </Link>
      </div>
    </nav>
  );
}
