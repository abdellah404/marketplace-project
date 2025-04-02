import {useDispatch, useSelector} from "react-redux";

import { get_Favorites , is_Favorated ,  add_Favorite , delete_Favorite } from "../store/favoritesSlice.js";

const useFavorites = function () {

    const { favorites  , error  , isFavorated, loading} = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    const getFavorites = async () => {
        return dispatch(get_Favorites())
            .unwrap();
    }
    const addFavorite = async (annonce_id) => {
        return dispatch(add_Favorite(annonce_id))
            .unwrap();
    }

    const deleteFavorite = async (annonce_id) => {
        return dispatch(delete_Favorite(annonce_id))
            .unwrap();
    }

    const checkFavorited = async (annonce_id) => {
        return dispatch(is_Favorated(annonce_id))
            .unwrap();
    }
 



    return {
        favorites,
        isFavorated,
        checkFavorited,
        addFavorite,
        getFavorites,
        deleteFavorite,
        error,
        loading,
    }
}
export default useFavorites;
