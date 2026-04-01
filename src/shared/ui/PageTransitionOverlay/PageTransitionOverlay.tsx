import type { CSSProperties } from "react";
import classNames from "classnames";
import { m } from "motion/react";
import { usePageTransitionStore } from "@/shared/model/page-transition";
import {
  PAGE_TRANSITION_ENTER_MS,
  PAGE_TRANSITION_LEAVE_MS,
} from "@/shared/сonfig/const";

type RawProps = {
  className?: string;
};

const WAVE_FLAT = "M0 28 L0 28 Q50 28 100 28 L100 28 L100 28 L0 28 Z";
const WAVE_SOFT = "M0 28 L0 13 Q50 0 100 13 L100 28 L100 28 L0 28 Z";
const WAVE_STRONG = "M0 28 L0 19 Q50 -18 100 19 L100 28 L100 28 L0 28 Z";

export const PageTransitionOverlay = ({ className }: RawProps) => {
  const isLeaving = usePageTransitionStore((state) => state.isLeaving);
  const isEntering = usePageTransitionStore((state) => state.isEntering);

  const isVisible = isLeaving || isEntering;
  const phase = isLeaving ? "leaving" : isEntering ? "entering" : "idle";

  return (
    <div
      className={classNames("page-transition-overlay", className, {
        "page-transition-overlay--transitioning": isVisible,
        "page-transition-overlay--leaving": isLeaving,
        "page-transition-overlay--entering": isEntering,
      })}
      style={
        {
          "--leave-duration": `${PAGE_TRANSITION_LEAVE_MS}ms`,
          "--enter-duration": `${PAGE_TRANSITION_ENTER_MS}ms`,
        } as CSSProperties
      }>
      <div className="page-transition-overlay__panel">
        <div
          className={classNames("page-transition-overlay__lip", {
            "page-transition-overlay__lip--top": isLeaving,
            "page-transition-overlay__lip--bottom": isEntering,
          })}>
          <svg
            className="page-transition-overlay__svg"
            viewBox="0 0 100 28"
            preserveAspectRatio="none"
            aria-hidden="true">
            <m.path
              key={phase}
              className="page-transition-overlay__path"
              initial={{ d: WAVE_FLAT }}
              animate={
                phase === "idle"
                  ? { d: WAVE_FLAT }
                  : { d: [WAVE_FLAT, WAVE_SOFT, WAVE_STRONG, WAVE_FLAT] }
              }
              transition={{
                duration:
                  phase === "entering"
                    ? PAGE_TRANSITION_ENTER_MS / 1000
                    : PAGE_TRANSITION_LEAVE_MS / 1000,
                times: [0, 0.28, 0.68, 1],
                ease: "easeInOut",
              }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
