import { LuMoon, LuSun } from "react-icons/lu";
import { ButtonIcon } from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

export function DarkModeToggle() {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {darkMode ? <LuSun /> : <LuMoon />}
        </ButtonIcon>
    );
}
