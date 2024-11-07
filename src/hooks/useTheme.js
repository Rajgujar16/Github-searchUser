import { useState , useEffect } from "react";

const useTheme = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return[theme , toggleTheme]
}

export default useTheme;