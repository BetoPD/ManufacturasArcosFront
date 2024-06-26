import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import AdminLayout from '../layout/AdminLayout';
import MetaData from '../layout/MetaData';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader';
import {
  useDeleteUserMutation,
  useGetAdminUsersQuery,
} from '../../redux/api/userApi';

export default function ListUsers() {
  const { data, isLoading, error } = useGetAdminUsersQuery();
  const [
    deleteUser,
    { isLoading: isDeleteLoading, isSuccess, error: deleteError },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success('Usuario eliminado!');
    }
  }, [isSuccess, deleteError]);

  if (isLoading) return <Loader />;

  const deleteUserHandler = (id) => {
    deleteUser(id);
  };

  const setUsers = () => {
    const users = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Nombre de usuario',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
        },
        {
          label: 'Rol',
          field: 'role',
          sort: 'asc',
        },
        {
          label: 'Acciones',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    data?.users?.forEach((user) =>
      users.rows.push({
        id: user?.id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        actions: (
          <>
            <Link
              to={`/admin/users/${user?.id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-outline-danger ms-2"
              onClick={() => deleteUserHandler(user?.id)}
              disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      })
    );
    return users;
  };

  return (
    <AdminLayout>
      <MetaData title={'Productos en venta'} />
      <div>
        <h1 className="my-5">{data?.users?.length} Usuarios</h1>
        <MDBDataTable
          className="px-3"
          data={setUsers()}
          bordered
          striped
          hover
        />
      </div>
    </AdminLayout>
  );
}
