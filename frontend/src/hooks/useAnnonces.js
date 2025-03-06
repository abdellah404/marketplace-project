import {useDispatch, useSelector} from "react-redux";
import { getAllAnnonces , addNewAnnonce } from "../store/annoncesSlice.js";

const useAnnonces = function () {
    const { annoncesData , error,loading } = useSelector((state) => state.annonces);
    const dispatch = useDispatch();
    const annonces = async () => {
        return dispatch(getAllAnnonces())
            .unwrap();
    }
    const addAnnonce = async (annonceFormData) => {
        return dispatch(addNewAnnonce(annonceFormData))
            .unwrap();
    }

    return {
        annoncesData,
        annonces,
        addAnnonce,
        error,
        loading,
    }
}
export default useAnnonces;
