import { Outlet } from "react-router";
import { Navigation } from "../../components/Navigation/Navigation";

const UserLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default UserLayout;
