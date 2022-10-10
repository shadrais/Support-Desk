import axios from "axios";

const API_URL =
  "https://3000-shadrais-supportdesk-p1zndkfksd9.ws-us70.gitpod.io/api/users/";

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log(response.data);
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log(response.data);
  return response.data;
};

const authApi = {
  register,
  logout,
  login,
};

export default authApi;
