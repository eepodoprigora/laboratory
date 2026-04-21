import { RefObject, useEffect } from 'react';
import { useHeaderColorStore } from '@/shared/model/header-color';

type AnyRef = RefObject<HTMLElement | null>;

export function useHeaderColorObserver(
    sectionRefs: AnyRef[],
    defaultClass?: string,
    sectionRootMargin: string = '-30px 0px 0px 0px',
    markerRefs: AnyRef[] = [],
    isMobileOrTablet: boolean = false,
) {
    const setClass = useHeaderColorStore((s) => s.setHeaderClass);

    useEffect(() => {
        let rafId: number | null = null;
        let retries = 0;
        let ioSections: IntersectionObserver | null = null;
        let ioMarkersTop: IntersectionObserver | null = null;

        const visibleSections = new Set<HTMLElement>();
        const intersectingMarkersTop = new Set<HTMLElement>();

        const pick = (el?: HTMLElement | null) => {
            if (!el) return defaultClass ?? null;
            const ds = el.dataset as Record<string, string | undefined>;
            return isMobileOrTablet
                ? (ds.headerMobileClass ?? ds.headerClass ?? defaultClass ?? null)
                : (ds.headerClassMask ?? ds.headerClass ?? defaultClass ?? null);
        };

        const cleanup = () => {
            ioSections?.disconnect();
            ioMarkersTop?.disconnect();
            if (rafId) cancelAnimationFrame(rafId);
            setClass(defaultClass ?? null);
        };

        const recompute = (sections: HTMLElement[], markers: (HTMLElement | null)[]) => {
            const idx = sections.findIndex((s) => visibleSections.has(s));
            const current = idx >= 0 ? sections[idx] : null;
            if (!current) {
                setClass(defaultClass ?? null);
                return;
            }
            const topClass = pick(current);
            const marker = markers[idx];
            const bottomClass = pick(marker);
            const next = marker && intersectingMarkersTop.has(marker) ? bottomClass : topClass;
            setClass(next);
        };

        const setup = () => {
            const sections = sectionRefs.map((r) => r.current).filter(Boolean) as HTMLElement[];
            const markers = markerRefs.map((r) => r.current) as (HTMLElement | null)[];

            if (sections.length === 0) {
                if (retries < 15) {
                    retries += 1;
                    rafId = requestAnimationFrame(setup);
                    return;
                }
                setClass(defaultClass ?? null);
                return;
            }

            ioSections = new IntersectionObserver(
                (entries) => {
                    for (const e of entries) {
                        const el = e.target as HTMLElement;
                        if (e.isIntersecting) visibleSections.add(el);
                        else visibleSections.delete(el);
                    }
                    recompute(sections, markers);
                },
                { root: null, rootMargin: sectionRootMargin, threshold: 0 },
            );
            sections.forEach((s) => ioSections!.observe(s));

            const validMarkers = markers.filter(Boolean) as HTMLElement[];
            if (validMarkers.length) {
                ioMarkersTop = new IntersectionObserver(
                    (entries) => {
                        for (const e of entries) {
                            const el = e.target as HTMLElement;
                            if (e.isIntersecting) intersectingMarkersTop.add(el);
                            else intersectingMarkersTop.delete(el);
                        }
                        recompute(sections, markers);
                    },
                    { root: null, rootMargin: '0px 0px -100% 0px', threshold: 0 },
                );
                validMarkers.forEach((m) => ioMarkersTop!.observe(m));
            }

            setClass(defaultClass ?? null);
            recompute(sections, markers);
        };

        setup();
        return cleanup;
    }, [sectionRefs, markerRefs, sectionRootMargin, defaultClass, setClass, isMobileOrTablet]);
}
