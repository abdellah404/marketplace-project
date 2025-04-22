import HomePage from "../../pages/HomePage/HomePage";
import { Navigation } from "../../components/Navigation/NavBar";
import { Outlet } from "react-router";
const GuestLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};
export default GuestLayout;
