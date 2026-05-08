import API from "./api";

// user create booking
export const createBooking = (data) => {
  return API.post("catering/create/", data);
};

// user get my bookings
export const getMyBookings = () => {
  return API.get("catering/my-bookings/");
};

// admin get all bookings
export const getAdminBookings = () => {
  return API.get("catering/admin/bookings/");
};

// admin update status
export const updateBookingStatus = (id, data) => {
  return API.patch(`catering/admin/bookings/${id}/update/`, data);
};

// get packages
export const getPackages = () => {
  return API.get("catering/packages/");
};

// create
export const createPackage = (data) => {
  return API.post("catering/admin/packages/", data);
};

// update
export const updatePackage = (id, data) => {
  return API.patch(`catering/admin/packages/${id}/update/`, data);
};

// delete
export const deletePackage = (id) => {
  return API.delete(`catering/admin/packages/${id}/delete/`);
};