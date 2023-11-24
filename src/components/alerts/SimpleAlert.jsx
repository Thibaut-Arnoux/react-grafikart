import { useToggle } from '../../hooks/useToggle';

/**
 * @param {"danger" | "info" | "warning"} type
 */
export const SimpleAlert = ({ type = 'info', children }) => {
    const [show, toggle] = useToggle(true);

    if (!show) return null;

    return (
        <div className={`alert alert-${type}`} role="alert">
            {children}
            <button onClick={toggle}>Fermer</button>
        </div>
    );
};
