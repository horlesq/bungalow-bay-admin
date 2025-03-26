import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import { Spinner } from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPageSpinner = styled.div`
    height: 100vh;
    background-color: var(--color-gray-100);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const { isLoading, isAuthenticated } = useUser();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isAuthenticated && !isLoading) navigate("/login");
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading)
        return (
            <FullPageSpinner>
                <Spinner />
            </FullPageSpinner>
        );

    return children;
}
