import { NavLink } from "react-router-dom";
import { RiHomeSmile2Line } from "react-icons/ri";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { MdOutlineBungalow } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

import styled from "styled-components";

const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
    &:link,
    &:visited {
        display: flex;
        align-items: center;
        gap: 1.2rem;

        color: var(--color-gray-600);
        font-size: 1.6rem;
        font-weight: 500;
        padding: 1.2rem 2.4rem;
        transition: all 0.3s;
    }

    /* This works because react-router places the active class on the active NavLink */
    &:hover,
    &:active,
    &.active:link,
    &.active:visited {
        color: var(--color-gray-800);
        background-color: var(--color-gray-50);
        border-radius: var(--border-radius-sm);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-gray-400);
        transition: all 0.3s;
    }

    &:hover svg,
    &:active svg,
    &.active:link svg,
    &.active:visited svg {
        color: var(--color-brand-600);
    }
`;

export function MainNav() {
    return (
        <nav>
            <NavList>
                <li>
                    <StyledNavLink to="/dashboard">
                        <RiHomeSmile2Line />
                        <span>Home</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/bookings">
                        <RiCalendarScheduleLine />
                        <span>Bookings</span>
                    </StyledNavLink>
                </li>{" "}
                <li>
                    <StyledNavLink to="/bungalows">
                        <MdOutlineBungalow />
                        <span>Bungalows</span>
                    </StyledNavLink>
                </li>{" "}
                <li>
                    <StyledNavLink to="/users">
                        <LuUsersRound />
                        <span>Users</span>
                    </StyledNavLink>
                </li>{" "}
                <li>
                    <StyledNavLink to="/settings">
                        <IoSettingsOutline />
                        <span>Settings</span>
                    </StyledNavLink>
                </li>
            </NavList>
        </nav>
    );
}
