import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
    const [darkMode, setDarkMode] = useLocalStorageState(
        window.matchMedia("(prefers-color-scheme: dark)").matches,
        "darkMode"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.remove("light-mode");
            document.documentElement.classList.add("dark-mode");
        } else {
            document.documentElement.classList.remove("dark-mode");
            document.documentElement.classList.add("light-mode");
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error("useDarkMode must be used within a DarkModeProvider");
    }
    return context;
}

export { DarkModeProvider, useDarkMode };
