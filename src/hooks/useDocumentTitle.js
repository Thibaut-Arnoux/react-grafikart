import { useEffect, useRef } from 'react';

export const useDocumentTitle = (title) => {
    const titleRef = useRef(document.title);

    useEffect(() => {
        const titleCopy = titleRef.current;

        return () => {
            document.title = titleCopy;
        };
    }, []);

    useEffect(() => {
        document.title = title ? title : titleRef.current;
    }, [title]);
};
