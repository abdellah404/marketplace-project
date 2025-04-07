import axios from "axios";


  const persistedAuth = JSON.parse(localStorage.getItem("persist:auth"));
  const token = persistedAuth ? JSON.parse(persistedAuth.token) : null;

  
  const axioService = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default axioService;