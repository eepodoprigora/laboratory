import { Chess, ChessRawProps } from "@/features/chess";
import { mergeRefs } from "@/shared/lib/merge-refs";
import { ILink } from "@/shared/model/types";
import Button from "@/shared/ui/Button";
import { ButtonGroup } from "@/shared/ui/ButtonGroup";
import Link from "@/shared/ui/Link/Link";
import { Prices, PricesRawProps } from "@/shared/ui/Prices";
import { SectionTop } from "@/shared/ui/SectionTop";

import classNames from "classnames";
import { useRef } from "react";

export type RawProps = {
  preHeader?: string;
  header: string;
  text: string;
  steps?: ChessRawProps[];
  ctaLink?: ILink;
  viewPrices?: ILink;
  prices: PricesRawProps;
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const Recomposition = ({
  preHeader,
  header,
  text,
  steps,
  ctaLink,
  viewPrices,
  prices,
  className,
  ref,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLElement>(null);

  return (
    <div
      {...props}
      className={classNames("recomposition section", className)}
      ref={mergeRefs([ref, rootRef])}>
      <div className="wrapper recomposition__wrapper">
        <SectionTop header={header} text={text} preHeader={preHeader} />
      </div>
      <Prices items={prices?.items} />
      <div className="recomposition__steps">
        {steps?.map((step, i) => (
          <Chess
            key={step.id}
            {...step}
            id={step.id.toString()}
            imageRight={i % 2 === 1}
          />
        ))}
      </div>

      {ctaLink && viewPrices && (
        <ButtonGroup
          button1={
            <Button
              className="recomposition__button"
              text={ctaLink.name}
              href={ctaLink.href}
              tag="a"
              icon="arrow-right"
              variant="secondary"
              isExternal
            />
          }
          button2={
            <Button
              className="recomposition__button"
              href={viewPrices.href}
              tag={Link}
              text={viewPrices.name}
              icon="arrow-right"
              needsContainer={false}
            />
          }
        />
      )}
    </div>
  );
};
