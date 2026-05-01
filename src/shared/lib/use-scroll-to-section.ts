import { PAGE_TRANSITION_FADE_MS, PAGE_TRANSITION_HOLD_MS } from '@/shared/сonfig/const';
import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";

type RawProps = {
    offset?: number;
};

export const useScrollToSection = ({ offset = 0 }: RawProps = {}) => {
    const pathname = usePathname();

    useEffect(() => {
        if (pathname !== "/") return;

        const hash = window.location.hash.slice(1);
        if (!hash) return;

        const timer = setTimeout(() => {
            const element = document.getElementById(hash);
            if (!element) return;

            const top =
                element.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({ top, behavior: "smooth" });

            window.history.replaceState(null, "", pathname);
        }, PAGE_TRANSITION_FADE_MS + PAGE_TRANSITION_HOLD_MS + 100);

        return () => clearTimeout(timer);
    }, [pathname, offset]);

    const scrollToSection = useCallback(
        (id: string) => {
            const element = document.getElementById(id);
            if (!element) return;

            const top =
                element.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({ top, behavior: "smooth" });
        },
        [offset],
    );

    return { scrollToSection };
};