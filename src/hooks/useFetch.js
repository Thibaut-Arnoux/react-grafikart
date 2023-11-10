import { useEffect, useState } from 'react';

export const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        fetch(url, {
            ...options,
            headers: {
                Accept: 'application/json; charset=UTF-8',
                ...options.headers
            }
        })
            .then((r) => r.json())
            .then((data) => setData(data))
            .catch((err) => setErrors(err))
            .finally(() => setLoading(false));
    }, []);

    return {
        data,
        loading,
        errors
    };
};
