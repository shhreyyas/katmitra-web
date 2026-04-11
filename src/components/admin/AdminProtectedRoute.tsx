import { Navigate, Outlet } from "react-router-dom";
import { isAdminAuthenticated } from "@/lib/adminAuth";

const AdminProtectedRoute = () => {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
};

export default AdminProtectedRoute;
