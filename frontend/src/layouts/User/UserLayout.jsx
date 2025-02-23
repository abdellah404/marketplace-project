import { Outlet } from "react-router";


export default UserLayout = () => {
    return (
      <>
        <SearchPage />
        <Highlights />
        <Outlet/>
      </>
    );
  };
  