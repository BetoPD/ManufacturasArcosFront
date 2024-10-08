import React, { useEffect } from 'react';
import Search from './Search';
import { Link, useNavigate } from 'react-router-dom';
import { useGetMeQuery } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import { useLazyLogoutQuery } from '../../redux/api/authApi';

export default function Header() {
  const navigate = useNavigate();

  const { isLoading } = useGetMeQuery();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const admin = user?.role === 'admin';

  const [logout, { isSuccess }] = useLazyLogoutQuery();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess, navigate]);

  const handleClick = () => {
    logout();
  };

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <Link to="/">
            <img
              src="/images/ma_logo.png"
              alt="ShopIT Logo"
              className="logo-ma"
            />
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
            {cartItems?.length}
          </span>
        </Link>
        {user ? (
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
                  src={user?.url || '../images/default_avatar.jpg'}
                  alt="User Avatar"
                  className="rounded-circle"
                />
              </figure>
              <span>{user?.name}</span>
            </button>
            <div
              className="dropdown-menu w-100"
              aria-labelledby="dropDownMenuButton"
            >
              {admin && (
                <Link className="dropdown-item" to="/admin/dashboard">
                  {' '}
                  Panel de Control{' '}
                </Link>
              )}

              <Link className="dropdown-item" to="/me/orders">
                {' '}
                Órdenes{' '}
              </Link>

              <Link className="dropdown-item" to="/me/profile">
                {' '}
                Perfil{' '}
              </Link>

              <Link
                className="dropdown-item text-danger"
                to="/"
                onClick={handleClick}
              >
                {' '}
                Logout{' '}
              </Link>
            </div>
          </div>
        ) : (
          !isLoading && (
            <Link to="/login" className="btn ms-4" id="login_btn">
              {' '}
              Login{' '}
            </Link>
          )
        )}
      </div>
    </nav>
  );
}
