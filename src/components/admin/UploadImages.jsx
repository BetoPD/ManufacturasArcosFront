import React, { useEffect, useRef, useState } from 'react';
import {
  useDeleteProductImageMutation,
  useGetProductDetailsQuery,
  useUploadProductImagesMutation,
} from '../../redux/api/productsApi';
import AdminLayout from '../layout/AdminLayout';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';

export default function UploadImages() {
  const fileInputRef = useRef(null);
  const params = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadProductImages, { error, isLoading, isSuccess }] =
    useUploadProductImagesMutation();
  const [
    deleteProductImage,
    {
      error: deleteError,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteProductImageMutation();
  const { data } = useGetProductDetailsQuery(params?.id);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success('Imágenes acutalizadas con éxito!!');
      navigate('/admin/products');
    }
  }, [error, isSuccess, navigate]);

  useEffect(() => {
    if (data?.product) {
      setUploadedImages(data?.images);
    }
  }, [data]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isDeleteSuccess) {
      toast.success('Imagen eliminada!');
    }
  }, [deleteError, isDeleteSuccess]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prev) => [...prev, reader.result]);
          setImages((prev) => [...prev, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImagePreviewDelete = (image) => {
    setImagesPreview((prev) => prev.filter((img) => img !== image));
    setImages((prev) => prev.filter((img) => img !== image));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    uploadProductImages({ id: params?.id, body: { images } });
  };

  const deleteImage = (imageId) => {
    deleteProductImage({ id: params?.id, body: { imageId } });
  };

  return (
    <AdminLayout>
      <MetaData title={'Subir fotos'} />
      <div className="row wrapper">
        <div className="col-10 col-lg-8 mt-5 mt-lg-0">
          <form
            className="shadow rounded bg-body"
            enctype="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h2 className="mb-4">Subir fotos del producto</h2>

            <div className="mb-3">
              <label htmlFor="customFile" className="form-label">
                Escoger Imágenes
              </label>

              <div className="custom-file">
                <input
                  ref={fileInputRef}
                  type="file"
                  name="product_images"
                  className="form-control"
                  id="customFile"
                  multiple
                  onChange={onChange}
                  onClick={handleResetFileInput}
                />
              </div>
              {imagesPreview?.length > 0 && (
                <div className="new-images my-4">
                  <p className="text-warning">Imágenes Nuevas:</p>
                  <div className="row mt-4">
                    {imagesPreview?.map((image) => (
                      <div className="col-md-3 mt-2">
                        <div className="card">
                          <img
                            src={image}
                            alt="Card"
                            className="card-img-top p-2"
                            style={{ width: '100%', height: '80px' }}
                          />
                          <button
                            style={{
                              'background-color': '#dc3545',
                              'border-color': '#dc3545',
                            }}
                            type="button"
                            className="btn btn-block btn-danger cross-button mt-1 py-0"
                            onClick={() => handleImagePreviewDelete(image)}
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {uploadedImages?.length > 0 && (
                <div className="uploaded-images my-4">
                  <p className="text-success">Fotos subidas:</p>
                  <div className="row mt-1">
                    {uploadedImages?.map((image) => (
                      <div className="col-md-3 mt-2">
                        <div className="card">
                          <img
                            src={image?.url}
                            alt="Card"
                            className="card-img-top p-2"
                            style={{ width: '100%', height: '80px' }}
                          />
                          <button
                            style={{
                              'background-color': '#dc3545',
                              'border-color': '#dc3545',
                            }}
                            className="btn btn-block btn-danger cross-button mt-1 py-0"
                            disabled={isLoading || isDeleteLoading}
                            type="button"
                            onClick={() => deleteImage(image?.public_id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading || isDeleteLoading}
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
