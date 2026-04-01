import { useEffect, useState } from 'react';

export function useMounted() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted;
}

export function useDelayedMounted(delayMs = 0) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMounted(true);
        }, delayMs);

        return () => {
            clearTimeout(timeout);
        };
    }, [delayMs]);

    return mounted;
}
