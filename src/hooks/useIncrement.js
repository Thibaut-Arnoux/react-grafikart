import { useState } from 'react';

export const useIncrement = ({ base = 0, min = -Infinity, max = Infinity }) => {
    const [state, setState] = useState(base);

    const increment = () => setState((value) => (value < max ? value + 1 : value));

    const decrement = () => setState((value) => (value > min ? value - 1 : value));

    return { count: state, increment, decrement };
};
