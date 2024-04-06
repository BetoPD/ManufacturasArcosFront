import React, { useEffect, useState } from 'react';
import { useUpdatePasswordMutation } from '../../redux/api/userApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import UserLayout from '../layout/UserLayout';

export default function UpdatePassword() {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [updatePassword, { isLoading, error, isSuccess }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('La contrasená ha cambiado!');
      navigate('/me/profile');
    }

    if (error) {
      toast.error(error?.data?.message);
    }
  }, [navigate, error, isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      oldPassword,
      newPassword,
    };

    updatePassword(userData);
  };

  return (
    <UserLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
            <h2 className="mb-4">Cambiar Contraseña</h2>
            <div className="mb-3">
              <label htmlFor="old_password_field" className="form-label">
                Contraseña Vieja
              </label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="new_password_field" className="form-label">
                Contraseña Nueva
              </label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn w-100"
              disabled={isLoading}
            >
              {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
