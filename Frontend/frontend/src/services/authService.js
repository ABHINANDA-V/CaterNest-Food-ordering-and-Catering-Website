import API from "./api";

// Register
export const registerUser = (data) => {
  return API.post("users/register/", data);
};

// Login
export const loginUser = async (data) => {
  const response = await API.post("users/login/", data);

  // store token
  localStorage.setItem("token", response.data.access);

  // store role
  localStorage.setItem("role", response.data.role);

  localStorage.setItem(
    "user",
    JSON.stringify({
      username: response.data.username,
    }),
  );

  return response;
};
