import React, { useEffect, useState } from 'react';
import { useRegisterMutation } from '../../redux/api/authApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [register, { error, isLoading }] = useRegisterMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error, isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const signUpData = {
      name,
      email,
      password,
    };

    register(signUpData);
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
          <h2 className="mb-4">Registrarse</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              Email
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

          <button
            id="register_button"
            type="submit"
            className="btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'REGISTRARSE'}
          </button>
        </form>
      </div>
    </div>
  );
}
