import {useDispatch, useSelector} from "react-redux";
import { getAllAnnonces , addNewAnnonce } from "../store/annoncesSlice.js";
import { getAnnoncesById , getAnnonceDetailsById , get_MyAnnonces  , update_Annonce} from "../store/annoncesSlice.js";

const useAnnonces = function () {
    const { annoncesData , myAnnonces, AnnonceDetails,  AnnoncesCategory , error,loading } = useSelector((state) => state.annonces);
    const dispatch = useDispatch();
    const annonces = async () => {
        return dispatch(getAllAnnonces())
            .unwrap();
    }
    const addAnnonce = async (annonceFormData) => {
        return dispatch(addNewAnnonce(annonceFormData))
            .unwrap();
    }

    const getAnnoncesByCatId = async (cat_id) => {
        return dispatch(getAnnoncesById(cat_id))
            .unwrap();
    }
    const getAnnonceDetails = async (ann_id) => {
        return dispatch(getAnnonceDetailsById(ann_id))
            .unwrap();
    }

    const getMyAnnonces = async (user_id) => {
        return dispatch(get_MyAnnonces(user_id))
            .unwrap();
    }

    // update annonce
    const updateAnnonce = async (formData) => {
        return dispatch(update_Annonce(formData))
            .unwrap();
    }
   


    return {
        annoncesData,
        AnnoncesCategory,
        myAnnonces,
        updateAnnonce,
        getMyAnnonces,
        annonces,
        addAnnonce,
        getAnnoncesByCatId,
        getAnnonceDetails,
        AnnonceDetails,
        error,
        loading,
    }
}
export default useAnnonces;
