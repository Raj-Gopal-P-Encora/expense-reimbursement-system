import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8083",
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    config.headers["userId"] = user.id;
    config.headers["role"] = user.role;
  }
  return config;
});

export default api;