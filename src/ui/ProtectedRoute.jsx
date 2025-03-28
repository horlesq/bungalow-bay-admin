import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Spinner } from "./Spinner";
import { FullPage } from "./FullPage";

export function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const { isLoading, isAuthenticated, isFetching } = useUser();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isAuthenticated && !isLoading && !isFetching) navigate("/login");
    }, [isAuthenticated, isLoading, isFetching, navigate]);

    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    if (isAuthenticated) return children;
}
