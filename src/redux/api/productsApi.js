import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['Product', 'AdminProducts'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: '/products',
        params: {
          page: params?.page,
          keyword: params?.keyword,
          'price[gte]': params?.min,
          'price[lte]': params?.max,
          category: params?.category,
          'rating[gte]': params?.rating,
        },
      }),
      providesTags: ['Product'],
    }),
    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ['Product'],
    }),
    canUserReview: builder.query({
      query: (params) => ({
        url: '/can_review',
        params: {
          id: params?.productId,
        },
      }),
    }),
    getAdminProducts: builder.query({
      query: () => '/admin/products',
      providesTags: ['AdminProducts'],
    }),
    getAdminCategories: builder.query({
      query: () => '/admin/categories',
    }),
    submitReview: builder.mutation({
      query(body) {
        return {
          url: '/reviews',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Product'],
    }),
    createProduct: builder.mutation({
      query(body) {
        return {
          url: '/admin/products',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['AdminProducts', 'Product'],
    }),
    updateProduct: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['AdminProducts', 'Product'],
    }),
    uploadProductImages: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}/upload_images`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Product'],
    }),
    deleteProductImage: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}/delete_image`,
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query(id) {
        return {
          url: `/admin/products/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Product', 'AdminProducts'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useSubmitReviewMutation,
  useCanUserReviewQuery,
  useGetAdminProductsQuery,
  useGetAdminCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImagesMutation,
  useDeleteProductImageMutation,
  useDeleteProductMutation,
} = productApi;
