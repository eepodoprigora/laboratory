import { useCallback } from "react";

type RawProps = {
    offset?: number;
};

type ScrollToSection = (id: string) => void;

export const useScrollToSection = ({
    offset = 0,
}: RawProps = {}): {
    scrollToSection: ScrollToSection;
} => {
    const scrollToSection = useCallback(
        (id: string) => {
            const element = document.getElementById(id);

            if (!element) {
                return;
            }

            const top = element.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top,
                behavior: "smooth",
            });
        },
        [offset],
    );

    return { scrollToSection };
};