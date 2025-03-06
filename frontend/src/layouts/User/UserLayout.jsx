import { Outlet } from "react-router";
import { Navigation } from "../../pages/Navigation/Navigation";


const UserLayout = () => {
    return (
      <>
        <Navigation/>
        <Outlet/>
      </>
    );
  };

  export default UserLayout;
  