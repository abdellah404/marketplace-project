import axioService from "./api";

class AnnoncesService {
  async annonces() {
    const response = await axioService.get("/annonces");
    return response.data ;
  }
  async addAnnonce(annonceFormData) {
    const response = await axioService.post("/annonces",annonceFormData , {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

  
  async getMyAnnonces(user_id) {
    const response = await axioService.get(`/annonces/myannonces/${user_id}`);
    return response.data ;
  }
 
  // update annonce
  async updateAnnonce(formData) {
    const response = await axioService.post(`/annonces/update/${formData.get("id")}`, formData , {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    
    return response.data ;
  }


}

export default new AnnoncesService();
