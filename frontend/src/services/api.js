import axios from "axios";

const axioService = axios.create({
  baseURL: "http://localhost:8000/api",
});

export default axioService;