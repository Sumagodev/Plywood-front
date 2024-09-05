import { useMemo } from "react";
import { Navigate } from "react-router-dom";
import { ROLES } from "../utils/Roles.utils";
import { useSelector } from "react-redux";

export const useLoginRedirectPath = () => {
    const role = useSelector((state) => state.auth.role);
    const user = useSelector((state) => state.auth.user);
    const path = useMemo(() => {
        if (role == ROLES.DISTRIBUTOR) {
            console.log("SETTING REDIRECT PATH")
            return "/Distributor/Dashboard";
        }

        return "/";
    }, [role, user]);
    console.log(path, "PATH")
    return path;
};
export default function ProtectedRoute({ children, isAllowed, redirectPath }) {
    console.log(redirectPath, isAllowed, children, "DATA")
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }
    return children
}
export const useLogoutRedirectPath = () => {
    return "/";
};


