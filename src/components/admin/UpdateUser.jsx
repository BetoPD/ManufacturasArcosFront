import React, { useEffect, useState } from 'react';
import AdminLayout from '../layout/AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../redux/api/userApi';
import Loader from '../layout/Loader';
import toast from 'react-hot-toast';

export default function UpdateUser() {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const { data, isLoading, error } = useGetUserDetailsQuery(params?.id);
  const user = data?.user || {};

  const [
    updateUser,
    { isLoading: isUpdateLoading, isSuccess, error: updateError },
  ] = useUpdateUserMutation();

  useEffect(() => {
    if (user?.name) {
      setName(user?.name);
    }

    if (user?.email) {
      setEmail(user?.email);
    }

    if (user?.role) {
      setRole(user?.role);
    }
  }, [user?.name, user?.email, user?.role]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
      navigate('/admin/users');
    }
  }, [error, navigate]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError?.data?.message);
    }
    if (isSuccess) {
      toast.success('Usuario acutalizado!');
      navigate('/admin/users');
    }
  }, [isSuccess, updateError, navigate]);

  if (isLoading) return <Loader />;

  const handleUserUpdate = (e) => {
    e.preventDefault();
    const data = { name, email, role };
    updateUser({ id: user?.id, body: data });
  };

  return (
    <AdminLayout>
      <MetaData title={'Actualizar usuario'} />
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow-lg" onSubmit={handleUserUpdate}>
            <h2 className="mb-4">Actualizar Usuario</h2>

            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Nombre
              </label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">
                Coreo
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
              <label htmlFor="role_field" className="form-label">
                Rol
              </label>
              <select
                id="role_field"
                className="form-select"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn update-btn w-100 py-2"
              disabled={isUpdateLoading}
            >
              {isUpdateLoading ? 'Actualizando...' : 'Actualizar'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
