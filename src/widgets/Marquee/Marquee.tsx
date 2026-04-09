import { IReview, Review } from "@/entities/review";
import { mergeRefs } from "@/shared/lib/merge-refs";

import classNames from "classnames";
import { useRef } from "react";

export type RawProps = {
  items: IReview[];
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const Marquee = ({ items, className, ref, ...props }: Props) => {
  const rootRef = useRef<HTMLElement>(null);

  if (!items.length) {
    return null;
  }

  return (
    <section
      {...props}
      className={classNames("marquee", className)}
      ref={mergeRefs([ref, rootRef])}>
      <div className="marquee__viewport">
        <div className="marquee__track">
          <div className="marquee__group">
            {items.map((item, index) => (
              <Review key={index} {...item} id={item.id.toString()} />
            ))}
          </div>
          <div className="marquee__group" aria-hidden="true">
            {items.map((item, index) => (
              <Review
                key={`duplicate-${index}`}
                {...item}
                id={item.id.toString()}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
