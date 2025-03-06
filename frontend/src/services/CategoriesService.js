import axios from "axios";
import axioService from "./api";

class CategoriesService {
  async categories() {
    const response = await axioService.get("/categories");
    return response.data ;
  }
}

export default new CategoriesService();
