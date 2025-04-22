import { Outlet } from "react-router";
import { AdminNavBar } from "../../components/Navigation/AdminNavBar";
const AdminLayout = () => {
  return (
    <>
      <AdminNavBar />
      <Outlet />
    </>
  );
};
export default AdminLayout;
