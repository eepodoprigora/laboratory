import type { CSSProperties } from "react";
import classNames from "classnames";
import { PAGE_TRANSITION_FADE_MS } from "@/shared/сonfig/const";
import { usePageTransitionStore } from "@/shared/model/page-transition";
import { PreloaderSvg } from "../Preloader/PreloaderSvg";

type RawProps = {
  className?: string;
};

export const PageTransitionOverlay = ({ className }: RawProps) => {
  const isTransitioning = usePageTransitionStore(
    (state) => state.isTransitioning,
  );

  return (
    <div
      className={classNames("page-transition-overlay", className, {
        "page-transition-overlay--transitioning": isTransitioning,
      })}
      style={
        {
          "--fade-duration": `${PAGE_TRANSITION_FADE_MS}ms`,
        } as CSSProperties
      }>
      <PreloaderSvg />
    </div>
  );
};
