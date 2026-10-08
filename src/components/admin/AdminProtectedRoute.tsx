import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAdminSession } from "@/lib/adminAuth";
import { useAdminIdleTimeout } from "@/hooks/useAdminIdleTimeout";

const AdminProtectedRoute = () => {
  const session = useAdminSession();
  const queryClient = useQueryClient();
  const signedIn = session !== null;

  useAdminIdleTimeout(signedIn);

  // Drop cached admin data when the session ends so the next sign-in never sees it.
  useEffect(() => {
    if (!signedIn) queryClient.removeQueries({ queryKey: ["admin"] });
  }, [signedIn, queryClient]);

  if (!signedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
};

export default AdminProtectedRoute;
