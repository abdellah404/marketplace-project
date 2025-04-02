import axioService from "./api";

class favoritesService {

  async addFavorite(annonce_id) {
    const response = await axioService.post("/favorites/add", annonce_id);    
    return response.data ;
  }

  async getFavorites() {
    const response = await axioService.get(`/favorites`);
    return response.data ;
  }

  async removeFavorite(annonce_id) {
    const response = await axioService.delete(`/favorites/${annonce_id}/remove`);
    return response.data ;
  }

  async isFavorated(annonce_id) {
    const response = await axioService.get(`/favorites/isfavorited/${annonce_id}`);
    return response.data ;
    
  }
 


}

export default new favoritesService();
