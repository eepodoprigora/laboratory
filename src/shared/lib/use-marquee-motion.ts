import { RefObject, useEffect } from "react";

export type RawProps = {
    trackRef: RefObject<HTMLDivElement | null>;
    itemRef: RefObject<HTMLSpanElement | null>;
    baseSpeed?: number;
};

export const useMarqueeMotion = ({
    trackRef,
    itemRef,
    baseSpeed = 0.9,
}: RawProps) => {
    useEffect(() => {
        const track = trackRef.current;
        const item = itemRef.current;

        if (!track || !item) {
            return;
        }

        let frameId = 0;
        let x = 0;
        let speedBoost = 0;
        let lastScrollY = window.scrollY;
        let lastTime = performance.now();

        const clamp = (value: number, min: number, max: number) => {
            return Math.min(Math.max(value, min), max);
        };

        const update = (time: number) => {
            const deltaTime = Math.min((time - lastTime) / 16.666, 2);
            lastTime = time;

            const itemWidth = item.offsetWidth || 1;
            const speed = baseSpeed + speedBoost;

            x -= speed * deltaTime;

            if (x <= -itemWidth) {
                x += itemWidth;
            }

            if (x > 0) {
                x -= itemWidth;
            }

            speedBoost *= 0.94;

            track.style.setProperty("--marquee-offset", `${x}px`);

            frameId = window.requestAnimationFrame(update);
        };

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;

            lastScrollY = currentScrollY;
            speedBoost += delta * 0.08;
            speedBoost = clamp(speedBoost, -8, 8);
        };

        frameId = window.requestAnimationFrame(update);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.cancelAnimationFrame(frameId);
        };
    }, [baseSpeed, itemRef, trackRef]);
};