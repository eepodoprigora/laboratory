import { Chess, ChessRawProps } from "@/features/chess";
import { mergeRefs } from "@/shared/lib/merge-refs";
import { useScrollToSection } from "@/shared/lib/use-scroll-to-section";
import { ILink } from "@/shared/model/types";
import { PriceGroups, PriceGroupsRawProps } from "@/shared/ui/PriceGroups";
import { SectionTop } from "@/shared/ui/SectionTop";

import classNames from "classnames";
import { useEffect, useRef } from "react";

type DetailStep = ChessRawProps & PriceGroupsRawProps;

export type RawProps = {
  preHeader?: string;
  header: string;
  text: string;
  steps?: DetailStep[];
  ctaLink?: ILink;
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const Details = ({
  preHeader,
  header,
  text,
  steps,
  className,
  ref,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLElement>(null);

  const { scrollToSection } = useScrollToSection({ offset: 50 });

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const timer = setTimeout(() => scrollToSection(hash), 100); // ← и сюда
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div
      {...props}
      className={classNames("details section", className)}
      ref={mergeRefs([ref, rootRef])}>
      <div className="wrapper details__wrapper">
        <SectionTop header={header} text={text} preHeader={preHeader} />
      </div>
      <div className="details__steps">
        {steps?.map((step, i) => (
          <Chess
            key={step.id}
            {...step}
            scrollId={step.id.toString()}
            id={(i + 1).toString()}
            imageRight={i % 2 === 1}
            largeContent
            largeBlock={step.id === "massage-prices"}>
            <PriceGroups items={step.items} memo={step.memo} />
          </Chess>
        ))}
      </div>
    </div>
  );
};
