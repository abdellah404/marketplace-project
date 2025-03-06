import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../store/categoriesSlice.js";
const useCategories = function () {
  const { categoriesData, error, loading } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const categories = async () => {
    return dispatch(getAllCategories()).unwrap();
  };

  return {
    categoriesData,
    categories,
    error,
    loading,
  };
};
export default useCategories;
