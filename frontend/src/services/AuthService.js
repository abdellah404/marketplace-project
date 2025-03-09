import axios from "axios";
import axioService from "./api";
import useAuth from "../hooks/useAuth";

class AuthService {

  async login(credentials) {
    const response = await axioService.post("/auth/login", credentials);
    return response.data;
  }
  async register(credentials) {
    const response = await axioService.post("/auth/register", credentials);
    return response.data;
  }

  async updateUser(newUserData) {
    const response = await axioService.put("/auth/update", newUserData);
    return response.data;
  }
}

export default new AuthService();
