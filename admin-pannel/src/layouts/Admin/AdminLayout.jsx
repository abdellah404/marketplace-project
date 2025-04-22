import { Outlet } from "react-router";
import { AdminNavBar } from "../../../../frontend/src/components/Navigation/AdminNavBar";
const AdminLayout = () => {
  return (
    <>
      <AdminNavBar />
      <Outlet />
    </>
  );
};
export default AdminLayout;
