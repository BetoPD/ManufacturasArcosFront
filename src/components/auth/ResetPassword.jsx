import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../../redux/api/userApi';
import toast from 'react-hot-toast';
import MetaData from '../layout/MetaData';

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const params = useParams();

  const [resetPassword, { error, isLoading, isSuccess }] =
    useResetPasswordMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (isSuccess) {
      toast.success('La contrasena ha sido cambiada!');
      navigate('/login');
    }

    if (error) {
      toast.error(error?.data?.message);
    }
  }, [isAuthenticated, error, isSuccess, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      return toast.error('Las contraseñas tienen que coincidir!');
    }

    const userData = {
      password,
      confirmPassword,
    };

    resetPassword({ token: params?.token, body: userData });
  };

  return (
    <>
      <MetaData title={'Cambiar contraseña'} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
            <h2 className="mb-4">Contraseña Nueva</h2>

            <div className="mb-3">
              <label htmlFor="password_field" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirm_password_field" className="form-label">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                name="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
