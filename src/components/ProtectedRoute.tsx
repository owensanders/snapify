import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ProtectedRouteProps } from "../interfaces/props/ProtectedRouteProps";
import { useEffect, useState } from "react";

const ProtectedRoute = ({
  children,
  isGuestRoute = false,
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (typeof isAuthenticated !== "undefined") {
      setIsAuthChecked(true);
    }
  }, [isAuthenticated]);

  if (!isAuthChecked) {
    return null;
  }

  if (isGuestRoute && isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  if (!isAuthenticated && !isGuestRoute) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
