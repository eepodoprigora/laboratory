import { clampMin } from "@/shared/lib/strings";
import { RefObject, useEffect, useRef, useState } from "react";

type Params = {
    rootRef: RefObject<HTMLElement | null>;
    slidesRef: RefObject<HTMLElement[]>;
    slidesCount: number;
};

const getClosestSlideIndex = (
    slides: HTMLElement[],
    slidesCount: number,
    progress: number,
) => {
    if (!slidesCount || slides.length !== slidesCount) {
        return 0;
    }

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
        const center = slide.offsetLeft + slide.offsetWidth / 2 + progress;
        const distance = Math.abs(center);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
    });

    return closestIndex;
};

export const useSlider = ({
    rootRef,
    slidesRef,
    slidesCount,
}: Params) => {
    const [progress, setProgress] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [minTranslate, setMinTranslate] = useState(0);
    const [maxTranslate, setMaxTranslate] = useState(0);

    const currentProgressRef = useRef(0);
    const targetProgressRef = useRef(0);
    const touchStartYRef = useRef(0);
    const targetStartRef = useRef(0);

    useEffect(() => {
        const updateSizes = () => {
            const slides = slidesRef.current;

            if (!slidesCount || slides.length !== slidesCount) {
                return;
            }

            const firstSlide = slides[0];
            const lastSlide = slides[slides.length - 1];

            if (!firstSlide || !lastSlide) {
                return;
            }

            const firstCenter = firstSlide.offsetLeft + firstSlide.offsetWidth / 2;
            const lastCenter = lastSlide.offsetLeft + lastSlide.offsetWidth / 2;

            const nextMaxTranslate = -firstCenter;
            const nextMinTranslate = -lastCenter;

            setMaxTranslate(nextMaxTranslate);
            setMinTranslate(nextMinTranslate);

            const nextProgress = clampMin(
                targetProgressRef.current || nextMaxTranslate,
                nextMinTranslate,
                nextMaxTranslate,
            );

            targetProgressRef.current = nextProgress;
            currentProgressRef.current = nextProgress;
            setProgress(nextProgress);
            setCurrentIndex(getClosestSlideIndex(slides, slidesCount, nextProgress));
        };

        updateSizes();
        window.addEventListener("resize", updateSizes);

        return () => {
            window.removeEventListener("resize", updateSizes);
        };
    }, [slidesRef, slidesCount]);

    useEffect(() => {
        let frameId = 0;

        const animate = () => {
            const slides = slidesRef.current;

            currentProgressRef.current +=
                (targetProgressRef.current - currentProgressRef.current) * 0.12;

            if (Math.abs(targetProgressRef.current - currentProgressRef.current) < 0.1) {
                currentProgressRef.current = targetProgressRef.current;
            }

            setProgress(currentProgressRef.current);

            if (slidesCount && slides.length === slidesCount) {
                setCurrentIndex(
                    getClosestSlideIndex(
                        slides,
                        slidesCount,
                        currentProgressRef.current,
                    ),
                );
            }

            frameId = window.requestAnimationFrame(animate);
        };

        frameId = window.requestAnimationFrame(animate);

        return () => {
            window.cancelAnimationFrame(frameId);
        };
    }, [slidesRef, slidesCount]);

    useEffect(() => {
        const root = rootRef.current;

        if (!root) {
            return undefined;
        }

        const updateTarget = (nextProgress: number) => {
            targetProgressRef.current = clampMin(
                nextProgress,
                minTranslate,
                maxTranslate,
            );
        };

        const handleWheel = (event: WheelEvent) => {
            updateTarget(targetProgressRef.current - event.deltaY * 0.9);
        };

        const handleTouchStart = (event: TouchEvent) => {
            const touch = event.touches[0];

            if (!touch) {
                return;
            }

            touchStartYRef.current = touch.clientY;
            targetStartRef.current = targetProgressRef.current;
        };

        const handleTouchMove = (event: TouchEvent) => {
            const touch = event.touches[0];

            if (!touch) {
                return;
            }

            const deltaY = touch.clientY - touchStartYRef.current;

            updateTarget(targetStartRef.current + deltaY * 1.1);

            event.preventDefault();
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        root.addEventListener("touchstart", handleTouchStart, { passive: true });
        root.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            root.removeEventListener("touchstart", handleTouchStart);
            root.removeEventListener("touchmove", handleTouchMove);
        };
    }, [rootRef, minTranslate, maxTranslate]);

    return {
        progress,
        currentIndex,
    };
};