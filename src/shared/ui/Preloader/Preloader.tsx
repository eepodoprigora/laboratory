import { useEffect, useRef, useState } from "react";
import { useAppReadyStore } from "@/shared/model/app-ready";
import classNames from "classnames";
import { PreloaderSvg } from "./PreloaderSvg";

const PRELOADER_DURATION = 3600;

export const Preloader = () => {
  const setAppReady = useAppReadyStore((s) => s.setAppReady);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [showAnimation, setShowAnimation] = useState(false);
  const [hidePreloader, setHidePreloader] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    const particles = wrapper.querySelectorAll<SVGElement>("[data-particle]");

    particles.forEach((particle, index) => {
      particle.style.setProperty("--index", String(index));
    });

    const showTimer = setTimeout(() => {
      setShowAnimation(true);
    }, 500);

    const hideTimer = setTimeout(() => {
      setHidePreloader(true);
    }, PRELOADER_DURATION - 500);

    const readyTimer = setTimeout(() => {
      setAppReady(true);
    }, PRELOADER_DURATION);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(readyTimer);
    };
  }, [setAppReady]);

  return (
    <div
      className={classNames("preloader", {
        "preloader--active": showAnimation,
        "preloader--hide": hidePreloader,
      })}
      ref={wrapperRef}>
      <PreloaderSvg/>
    </div>
  );
};
