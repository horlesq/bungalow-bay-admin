import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
    text-align: center;
`;

const Img = styled.img`
    height: 15rem;
    width: auto;
`;

export function Logo() {
    const { darkMode } = useDarkMode();
    const logoSrc = darkMode ? "/logo-dark.png" : "/logo-light.png";

    return (
        <StyledLogo>
            <Img src={logoSrc} alt="Logo" />
        </StyledLogo>
    );
}
