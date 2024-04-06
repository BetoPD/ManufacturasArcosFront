import React from 'react';
import UserLayout from '../layout/UserLayout';
import { useSelector } from 'react-redux';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <UserLayout>
      <div className="row justify-content-around mt-5 user-info">
        <div className="col-12 col-md-3">
          <figure className="avatar avatar-profile">
            <img
              className="rounded-circle img-fluid"
              src={user?.url || '../images/default_avatar.jpg'}
              alt={user?.name}
            />
          </figure>
        </div>

        <div className="col-12 col-md-5">
          <h4>Nombre Completo</h4>
          <p>{user?.name}</p>

          <h4>Correo</h4>
          <p>{user?.email}</p>

          <h4>Creada en</h4>
          <p>{user?.created_at.substring(0, 10)}</p>
        </div>
      </div>
    </UserLayout>
  );
}
