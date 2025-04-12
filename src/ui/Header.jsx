import styled from "styled-components";

import { UserAvatar } from "../features/authentication/UserAvatar";
import { Logout } from "../features/authentication/Logout";
import { DarkModeToggle } from "./DarkModeToggle";
import { Help } from "./Help";

const StyledHeader = styled.header`
    background-color: var(--color-gray-0);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-gray-100);

    display: flex;
    gap: 3.2rem;
    align-items: center;
    justify-content: flex-end;
`;

const ActionsContainer = styled.div`
    display: flex;
    gap: 0.8rem;
`;

export function Header() {
    return (
        <StyledHeader>
            <UserAvatar />
            <ActionsContainer>
                <Help />
                <DarkModeToggle />
                <Logout />
            </ActionsContainer>
        </StyledHeader>
    );
}
