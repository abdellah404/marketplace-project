import HomePage from "../../pages/HomePage/HomePage";
import { Navigation } from "../../components/Navigation/NavBar";
import { Outlet } from "react-router";
import Footer from "../../components/Footer/Footer";
const GuestLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer/>
    </>
  );
};
export default GuestLayout;
