import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {}
});

export const useTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return {
        isLight: theme === 'light',
        isDark: theme === 'dark',
        theme: theme,
        toggleTheme: toggleTheme
    };
};

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
