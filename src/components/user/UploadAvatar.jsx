import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserLayout from '../layout/UserLayout';
import { useNavigate } from 'react-router-dom';
import { useUploadAvatarMutation } from '../../redux/api/userApi';
import toast from 'react-hot-toast';

export default function UploadAvatar() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [uploadAvatar, { isLoading, error, isSuccess }] =
    useUploadAvatarMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success('Perfil actualizado!');
      navigate('/me/profile');
    }
  }, [error, isSuccess, navigate]);

  const [avatar, setAvatar] = useState('');
  const [previewAvatar, setPreviewAvatar] = useState(
    user?.url || '/images/default_avatar.jpg'
  );

  const handleChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewAvatar(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      avatar,
    };

    uploadAvatar(userData);
  };

  return (
    <UserLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
            <h2 className="mb-4">Sube tu imagen</h2>

            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <figure className="avatar item-rtl">
                    <img
                      src={previewAvatar}
                      className="rounded-circle"
                      alt={previewAvatar}
                    />
                  </figure>
                </div>
                <div className="input-foam">
                  <label className="form-label" htmlFor="customFile">
                    Elige imagen
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    className="form-control"
                    id="customFile"
                    accept="images/*"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? 'Subiendo...' : 'Subir'}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
