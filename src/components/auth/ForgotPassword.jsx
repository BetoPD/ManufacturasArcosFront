import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForgotPasswordMutation } from '../../redux/api/userApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [forgotPassword, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (isSuccess) {
      toast.success('Revisa tu correo');
      navigate('/login');
    }

    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error, isAuthenticated, isSuccess, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
    };

    forgotPassword(userData);
  };
  return (
    <>
      <MetaData title={'Contraseña Olvidada'} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
            <h2 className="mb-4">Contraseña Olvidada</h2>
            <div className="mt-3">
              <label htmlFor="email_field" className="form-label">
                Ingrese Correo
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Enviar Correo'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
