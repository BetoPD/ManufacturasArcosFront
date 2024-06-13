export const getPriceQueryParams = (searchParams, key, value) => {
  const hasValueInParams = searchParams.has(key);

  if (value && hasValueInParams) {
    searchParams.set(key, value);
  } else if (value) {
    searchParams.append(key, value);
  } else if (hasValueInParams) {
    searchParams.delete(key);
  }

  return searchParams;
};

export const calculateOrderCost = (cartItems) => {
  const totalAmount = cartItems?.reduce(
    (acc, item) => acc + item?.price * item?.quantity,
    0
  );
  const subtotalAmount = totalAmount / 1.16;
  const ivaAmount = (totalAmount * 0.16) / 1.16;
  const shippingAmount = totalAmount >= 1000 ? 0 : 200;

  return {
    totalAmount,
    subtotalAmount,
    shippingAmount,
    ivaAmount,
  };
};
