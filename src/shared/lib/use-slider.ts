import { useLayoutEffect, useRef, useState } from 'react';

type Props = {
    gap: number;
    slideCount: number;
    visible: number;
    initialIndex?: number;
    threshold?: number;
    isNeeded: boolean;
    wrapperAsideOffset?: number;
};

export const useSlider = ({
    gap,
    slideCount,
    visible,
    initialIndex = 0,
    threshold = 40,
    wrapperAsideOffset = 16,
    isNeeded,
}: Props) => {
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const [viewportWidth, setViewportWidth] = useState(0);
    const [index, setIndex] = useState(initialIndex);
    const startX = useRef(0);

    useLayoutEffect(() => {
        const element = viewportRef.current;

        if (!isNeeded || !element) {
            return;
        }

        setViewportWidth(element.getBoundingClientRect().width);

        const resizeObserver = new ResizeObserver((entries) => {
            const width = entries[0]?.contentRect.width;

            if (typeof width === 'number') {
                setViewportWidth(width);
            }
        });

        resizeObserver.observe(element);

        return () => {
            resizeObserver.disconnect();
        };
    }, [isNeeded]);

    const enabled = isNeeded && slideCount > 0 && visible > 0;
    const totalGaps = enabled ? gap * (visible - 1) : 0;
    const slideWidth = enabled
        ? Math.max(0, (viewportWidth - totalGaps - wrapperAsideOffset * 2) / visible)
        : 0;
    const step = enabled ? slideWidth + gap : 0;
    const maxIndex = enabled ? Math.max(0, slideCount - visible) : 0;

    const clamp = (value: number) => {
        return Math.min(maxIndex, Math.max(0, value));
    };

    const setNext = () => {
        if (!enabled) {
            return;
        }

        setIndex((currentIndex) => clamp(currentIndex + 1));
    };

    const setPrev = () => {
        if (!enabled) {
            return;
        }

        setIndex((currentIndex) => clamp(currentIndex - 1));
    };

    const onTouchStart = (event: React.TouchEvent) => {
        if (!enabled) {
            return;
        }

        startX.current = event.touches[0].clientX;
    };

    const onTouchEnd = (event: React.TouchEvent) => {
        if (!enabled) {
            return;
        }

        const endX = event.changedTouches[0].clientX;
        const deltaX = endX - startX.current;

        if (deltaX <= -threshold) {
            setNext();
            return;
        }

        if (deltaX >= threshold) {
            setPrev();
        }
    };

    const translateX = enabled ? -(index * step) : 0;

    return {
        viewportRef,
        slideWidth,
        translateX,
        handlers: {
            onTouchStart,
            onTouchEnd,
        },
        canPrev: enabled && index > 0,
        canNext: enabled && index < maxIndex,
        setPrev,
        setNext,
    };
};