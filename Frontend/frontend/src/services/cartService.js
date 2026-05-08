import API from "./api";

// Add item to cart
export const addToCart = (foodId, quantity = 1) => {
  return API.post(
    "cart/add/",
    {
      food_item: foodId,
      quantity: quantity,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

// Get current user's cart
export const getCart = () => {
  return API.get("cart/");
};

// Update cart item quantity
export const updateCartItem = (cartId, quantity) => {
  return API.put(`cart/update/${cartId}/`, { quantity });
};

// Delete cart item
export const deleteCartItem = (cartId) => {
  return API.delete(`cart/delete/${cartId}/`);
};
