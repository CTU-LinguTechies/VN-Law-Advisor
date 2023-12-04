import { useEffect, useState } from 'react';

export default function useDelay({ keyword, delay }: { keyword: string; delay: number }) {
    const [value, setValue] = useState(keyword);
    useEffect(() => {
        const handler = setTimeout(() => {
            setValue(keyword);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [keyword, delay]);
    return value;
}
