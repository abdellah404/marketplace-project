import axios from "axios";
import axioService from "./api";

class AuthService {

  async login(credentials) {
    const response = await axioService.post("/login", credentials);
    return response.data;
  }
  async register(credentials) {
    const response = await axioService.post("/register", credentials);
    return response.data;
  }
}

export default new AuthService();
