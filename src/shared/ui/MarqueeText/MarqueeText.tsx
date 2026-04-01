import { useMemo, useRef } from "react";
import classNames from "classnames";
import { useMarqueeMotion } from "@/shared/lib/use-marquee-motion";
import { mergeRefs } from "@/shared/lib/merge-refs";
import { useInView } from "motion/react";
import { useAppReadyStore } from "@/shared/model/app-ready";

export type RawProps = {
  text: string;
  speed?: number;
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const MarqueeText = ({
  text,
  speed = 0.9,
  className,
  ref,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRef = useRef<HTMLSpanElement | null>(null);

  const inView = useInView(rootRef, { once: true });
  const appReady = useAppReadyStore((s) => s.appReady);

  useMarqueeMotion({
    trackRef,
    itemRef,
    baseSpeed: speed,
  });

  const items = useMemo(() => Array.from({ length: 3 }), []);

  return (
    <div
      {...props}
      className={classNames("marquee-text", className, {
        "marquee-text--ready": inView && appReady,
      })}
      aria-hidden="true"
      ref={mergeRefs([ref, rootRef])}>
      <div className="marquee-text__viewport">
        <div ref={trackRef} className="marquee-text__track">
          {items.map((_, index) => (
            <span
              key={index}
              ref={index === 0 ? itemRef : undefined}
              className="marquee-text__item">
              <span className="marquee-text__label h1">{text}</span>
              <span className="marquee-text__separator h1">—</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
