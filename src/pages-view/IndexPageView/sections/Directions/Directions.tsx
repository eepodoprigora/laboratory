import { Direction, IDirection } from "@/entities/direction";
import { mergeRefs } from "@/shared/lib/merge-refs";
import { SectionTop } from "@/shared/ui/SectionTop";

import classNames from "classnames";
import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useMediaQuery } from "usehooks-ts";

export type RawProps = {
  header: string;
  text: string;
  items: IDirection[];
};

type Props = React.HTMLAttributes<HTMLElement> & {
  ref?: React.RefObject<HTMLDivElement | null>;
} & RawProps;

export const Directions = ({
  header,
  text,
  items = [],
  className,
  ref,
  ...props
}: Props) => {
  const localRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const isMobile = useMediaQuery(
    "(max-width: 767px), (max-width: 900px) and (orientation: landscape)",
  );

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start start", "end end"],
  });
  const offsetPx = 265;
  const steps = Math.max(items.length - 1, 0);
  const totalShift = offsetPx * steps;
  const endProgress = steps / Math.max(items.length, 1);
  const y = useTransform(scrollYProgress, (p) => {
    if (isMobile) return 0;
    const t = endProgress > 0 ? Math.min(p / endProgress, 1) : 0;
    return -totalShift * t;
  });

  return (
    <div
      {...props}
      className={classNames("directions section", className)}
      ref={mergeRefs([ref, localRef])}>
      <div className="wrapper directions__wrapper">
        <div className="hero__main"></div>
        <SectionTop header={header} text={text} />
        {items.length > 0 && (
          <m.ul
            className="directions__cards list-unstyled"
            ref={listRef}
            style={
              {
                y,
                "--margin-bottom": `${-totalShift}px`,
              } as unknown as React.CSSProperties
            }>
            {items.map((item, index) => (
              <li
                key={item.id}
                className="directions__card"
                style={
                  {
                    "--index": index,
                    "--offset": `${offsetPx}px`,
                  } as React.CSSProperties
                }>
                <Direction {...item} id={item.id.toString()} />
              </li>
            ))}
          </m.ul>
        )}
      </div>
    </div>
  );
};
