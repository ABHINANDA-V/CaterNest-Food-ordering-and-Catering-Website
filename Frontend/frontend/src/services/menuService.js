import API from "./api"


// Get all food items
export const getFoodItems = () => {
  return API.get("menu/foods/");
};

export const createCategory = (formData) => {
  return API.post("menu/admin/categories/create/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Get categories 
export const getCategories = () => {
  return API.get("menu/categories/");
};


// create food item
export const createFoodItem = (formData) => {
  return API.post("menu/admin/foods/create/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateFoodItem = (id, formData) => {
  return API.patch(`menu/admin/foods/${id}/update/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// delete food item
export const deleteFoodItem = (id) => {
  return API.delete(`menu/admin/foods/delete/${id}/`);
};