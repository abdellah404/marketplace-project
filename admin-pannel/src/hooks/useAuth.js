import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser, registerUser , updateUser } from "../store/authSlice.js";

const useAuth = function () {
  const { user, error, loading, token, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  
  const login = async (credentiels) => {
    return dispatch(loginUser(credentiels)).unwrap();

  };

  const register_new_user = async (data) => {
    return dispatch(registerUser(data)).unwrap();
  };
  const getUser = async () => {
    return dispatch(fetchUser()).unwrap();
  };

  const logout = async function () {
    return dispatch(logoutUser()).unwrap();
  };

  // update user
  const updateAuthUser = async (updatedDetails) => {
    return dispatch(updateUser(updatedDetails)).unwrap();
  };

  return {
    user,
    login,
    error,
    loading,
    token,
    register_new_user,
    getUser,
    logout,
    isAuthenticated,
    updateAuthUser
  };
};
export default useAuth;
