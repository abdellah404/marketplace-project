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

  async getAnnonces(cat_id) {
    const response = await axioService.get(`/annonces/${cat_id}`);
    return response.data ;
  }

  async getAnnonceDetails(ann_id) {
    const response = await axioService.get(`/annonces/details/${ann_id}`);
    return response.data ;
  }
 


}

export default new AnnoncesService();
