import { Navigation } from "../pages/Navigation/Navigation";
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
