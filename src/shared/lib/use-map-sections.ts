import { RefObject, useMemo } from 'react';

export function useMapSections<T extends HTMLElement = HTMLElement>(
    items: { ref: RefObject<T | null> }[],
): RefObject<T | null>[] {
    return useMemo(() => items.map((i) => i.ref), [items]);
}
