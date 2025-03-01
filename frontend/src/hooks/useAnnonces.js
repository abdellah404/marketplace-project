import {useDispatch, useSelector} from "react-redux";
import { getAllAnnonces } from "../store/annoncesSlice.js";

const useAnnonces = function () {
    const { annoncesData , error,loading } = useSelector((state) => state.annonces);
    const dispatch = useDispatch();
    const annonces = async () => {
        return dispatch(getAllAnnonces())
            .unwrap();
    }

    return {
        annoncesData,
        annonces,
        error,
        loading,
    }
}
export default useAnnonces;
