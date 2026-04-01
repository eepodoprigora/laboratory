import { Chess, ChessRawProps } from "@/features/chess";
import { mergeRefs } from "@/shared/lib/merge-refs";
import Button from "@/shared/ui/Button";
import { SectionTop } from "@/shared/ui/SectionTop";

import classNames from "classnames";
import { useRef } from "react";

export type RawProps = {
  header: string;
  text: string;
  steps?: ChessRawProps[];
  button?: string;
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const Recomposition = ({
  header,
  text,
  steps,
  button,
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
      <div className="wrapper">
        <SectionTop header={header} text={text} />
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

      <Button
        className="recomposition__button"
        text={button}
        icon="arrow-right"
      />
    </div>
  );
};
