import { useTheme } from '../../hooks/useTheme';

export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div>
            <button onClick={toggleTheme}>Theme : {theme}</button>
        </div>
    );
};
