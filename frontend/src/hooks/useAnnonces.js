import {useDispatch, useSelector} from "react-redux";
import { getAllAnnonces , addNewAnnonce } from "../store/annoncesSlice.js";
import { getAnnoncesById , getAnnonceDetailsById } from "../store/annoncesSlice.js";

const useAnnonces = function () {
    const { annoncesData , AnnonceDetails, AnnoncesCategory , error,loading } = useSelector((state) => state.annonces);
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



    return {
        annoncesData,
        AnnoncesCategory,
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
