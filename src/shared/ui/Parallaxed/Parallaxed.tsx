import classNames from "classnames";
import { CSSProperties, useRef } from "react";
import { useResizeObserver } from "usehooks-ts";
import { useMounted } from "@/shared/lib/use-mounted";
import ParallaxedJSWrapper from "./ParallaxedJSWrapper";

type RawProps = {
  scalePower?: number;
  movePower?: number;
  direction?: -1 | 1;
  containerRef?: React.RefObject<HTMLElement | null>;
  forceJS?: boolean;
  floatingOnly?: boolean;
};

type Props = React.HTMLAttributes<HTMLElement> & RawProps;

const Parallaxed = ({
  children,
  direction = -1,
  scalePower = 0,
  movePower,
  containerRef,
  forceJS = false,
  floatingOnly = false,
  className,
  ...props
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const size = useResizeObserver({
    ref: ref as React.RefObject<HTMLElement>,
    box: "border-box",
  });

  const isMounted = useMounted();

  const height = size.height || 0;
  const value = height * (movePower ?? scalePower);
  const scale = floatingOnly ? 1 : 1 + scalePower;

  const supportsCSSViewTimeline =
    typeof window !== "undefined"
      ? CSS.supports("animation-timeline", "view()")
      : true;

  const style = isMounted
    ? ({
        "--parallax-scale": `${scale}`,
        "--parallax-y-from": `${value * direction}px`,
        "--parallax-y-to": `${value * -direction}px`,
        animationName: "parallax",
        animationTimingFunction: "linear",
        animationFillMode: "both",
        animationTimeline: "view(y)",
        animationRange:
          "var(--parallax-animation-range-start, cover) var(--parallax-animation-range-offset-start, 0%) var(--parallax-animation-range-end, cover) var(--parallax-animation-range-offset-end, 100%)",
      } as CSSProperties)
    : undefined;

  return (
    <div
      {...props}
      ref={ref}
      className={classNames("parallaxed", className, {
        "parallaxed--floating-only": floatingOnly,
      })}>
      {supportsCSSViewTimeline && !forceJS ? (
        <div className="parallaxed-item" style={style}>
          <div className="parallaxed-item__wrapper">{children}</div>
        </div>
      ) : (
        <ParallaxedJSWrapper
          elRef={ref}
          containerRef={containerRef}
          value={value}
          scale={scale}
          direction={direction}
          floatingOnly={floatingOnly}>
          {children}
        </ParallaxedJSWrapper>
      )}
    </div>
  );
};

export default Parallaxed;
