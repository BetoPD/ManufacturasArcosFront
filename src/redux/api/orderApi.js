import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query(body) {
        return {
          url: '/orders/new',
          method: 'POST',
          body,
        };
      },
    }),
    myOrders: builder.query({
      query: () => `/me/orders/`,
    }),
    orderDetails: builder.query({
      query: (id) => `/orders/${id}`,
    }),
    getSales: builder.query({
      query: (params) => ({
        url: '/admin/get_sales',
        params: {
          startDate: params?.startDate,
          endDate: params?.endDate,
        },
      }),
    }),
    stripeCheckoutSession: builder.mutation({
      query(body) {
        return {
          url: '/payment/checkout_session',
          method: 'POST',
          body,
        };
      },
    }),
    getAdminOrders: builder.query({
      query: () => `/admin/orders`,
    }),
    updateOrder: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/orders/${id}`,
          method: 'PUT',
          body,
        };
      },
    }),
  }),
});

export const {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
  useMyOrdersQuery,
  useOrderDetailsQuery,
  useLazyGetSalesQuery,
  useGetAdminOrdersQuery,
  useUpdateOrderMutation,
} = orderApi;
