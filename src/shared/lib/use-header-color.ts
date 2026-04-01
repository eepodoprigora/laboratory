import { RefObject, useEffect } from 'react';
import { useHeaderColorStore } from '@/shared/model/header-color';

type SectionRef = RefObject<HTMLElement | null>;

export function useHeaderColorObserver(
    sectionRefs: SectionRef[],
    defaultClass: string,
    rootMargin: string = '-30px 0px 0px 0px',
) {
    const setHeaderClass = useHeaderColorStore((state) => state.setHeaderClass);

    useEffect(() => {
        const visibleSections = new Set<HTMLElement>();

        const sections = sectionRefs
            .map((ref) => ref.current)
            .filter(Boolean) as HTMLElement[];

        if (!sections.length) {
            setHeaderClass(defaultClass);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const section = entry.target as HTMLElement;

                    if (entry.isIntersecting) {
                        visibleSections.add(section);
                    } else {
                        visibleSections.delete(section);
                    }
                });

                const currentSection =
                    sections.find((section) => visibleSections.has(section)) ?? null;

                const nextClass =
                    currentSection?.dataset.headerClass ?? defaultClass;

                setHeaderClass(nextClass);
            },
            {
                rootMargin,
                threshold: 0,
            },
        );

        sections.forEach((section) => observer.observe(section));
        setHeaderClass(defaultClass);

        return () => {
            observer.disconnect();
            setHeaderClass(defaultClass);
        };
    }, [sectionRefs, defaultClass, rootMargin, setHeaderClass]);
}