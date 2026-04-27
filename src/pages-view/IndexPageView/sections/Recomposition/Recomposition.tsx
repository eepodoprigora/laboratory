import { Chess, ChessRawProps } from "@/features/chess";
import { mergeRefs } from "@/shared/lib/merge-refs";
import { ILink } from "@/shared/model/types";
import Button from "@/shared/ui/Button";
import { SectionTop } from "@/shared/ui/SectionTop";

import classNames from "classnames";
import { useRef } from "react";

export type RawProps = {
  preHeader?: string;
  header: string;
  text: string;
  steps?: ChessRawProps[];
  ctaLink?: ILink;
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
      {ctaLink && (
        <Button
          className="recomposition__button"
          text={ctaLink?.name}
          href={ctaLink.href}
          tag="a"
          icon="arrow-right"
          isExternal
        />
      )}
    </div>
  );
};
