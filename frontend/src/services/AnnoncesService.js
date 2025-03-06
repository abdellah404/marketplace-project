import axios from "axios";
import axioService from "./api";

class AnnoncesService {
  async annonces() {
    const response = await axioService.get("/annonces");
    return response.data ;
  }
  async addAnnonce(annonceFormData) {
    const response = await axioService.post("/annonces",annonceFormData);
    return response.data ;
  }
}

export default new AnnoncesService();
