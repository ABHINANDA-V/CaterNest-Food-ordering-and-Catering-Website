import API from "./api";

// get all orders (admin)
export const getAdminOrders = () => {
  return API.get("orders/admin/orders/");
};

// update order status
export const updateOrderStatus = (id, data) => {
  return API.patch(`orders/admin/orders/${id}/update/`, data);
};