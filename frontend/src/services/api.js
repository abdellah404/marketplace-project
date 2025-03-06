import axios from "axios";

const axioService = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    'Content-Type': 'multipart/form-data', // Necessary for file upload
  }
});

export default axioService;