import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themesSlice";
const useTheme = function () {
  const { isDarkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const setDarkMode = (boolean) => {
    return dispatch(toggleTheme(boolean));
  };

  return {
    isDarkMode,
    setDarkMode,
  };
};
export default useTheme;
