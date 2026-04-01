import classNames from "classnames";
import { MotionValue, m, useScroll, useTransform } from "motion/react";
import { RefObject } from "react";
import { useMounted } from "@/shared/lib/use-mounted";

type RawProps = {
  children: React.ReactNode;
  elRef: RefObject<HTMLElement | null>;
  containerRef?: RefObject<HTMLElement | null>;
  value: number;
  direction: 1 | -1;
  scale: number;
  floatingOnly?: boolean;
};

const useParallax = (
  scrollProgress: MotionValue<number>,
  distance: number,
  direction: 1 | -1,
) => {
  return useTransform(
    scrollProgress,
    [0, 1],
    [distance * direction, -distance * direction],
  );
};

const ParallaxedJSWrapper = ({
  value,
  children,
  elRef,
  containerRef,
  scale,
  direction,
  floatingOnly = false,
}: RawProps) => {
  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: elRef,
    offset: ["start end", "end start"],
    axis: "y",
  });

  const y = useParallax(scrollYProgress, value, direction);
  const isMounted = useMounted();

  return (
    <m.div
      className={classNames(
        "parallaxed-item",
        isMounted && "parallaxed-item--js",
        floatingOnly && "parallaxed-item--floating-only",
      )}
      style={isMounted ? ({ y } as unknown as React.CSSProperties) : undefined}>
      <div
        className="parallaxed-item__wrapper"
        style={
          isMounted && !floatingOnly
            ? ({ "--scale": scale } as React.CSSProperties)
            : undefined
        }>
        {children}
      </div>
    </m.div>
  );
};

export default ParallaxedJSWrapper;
