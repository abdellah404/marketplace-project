import { Outlet } from "react-router";
import { AdminNavBar } from "../../components/Navigation/AdminNavBar";
import AdminSideBar from "../../components/Navigation/AdminSideBar";
import "./AdminLayout.css"; // Import your CSS file for styling
const AdminLayout = () => {

  return (

    <>
      <AdminNavBar />
      <div className="profile-layout">
          {/* Sidebar */}
          <aside className="profile-sidebar">
          <AdminSideBar/>
          </aside>
    
          {/* Main Content */}
          <main className="profile-content">
          <Outlet/>
          </main>
        </div>
    </>
  );
};

export default AdminLayout;
