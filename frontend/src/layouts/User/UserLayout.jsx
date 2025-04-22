import { Navigate, Outlet } from "react-router";
import { Navigation } from "../../components/Navigation/NavBar";
import useAuth from "../../hooks/useAuth";

const UserLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default UserLayout;
