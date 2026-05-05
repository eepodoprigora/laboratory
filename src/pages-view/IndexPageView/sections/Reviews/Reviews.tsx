import { IResult } from "@/entities/result";
import { IReview } from "@/entities/review";
import { mergeRefs } from "@/shared/lib/merge-refs";
import { ILink } from "@/shared/model/types";
import Button from "@/shared/ui/Button";
import { ButtonGroup } from "@/shared/ui/ButtonGroup";
import { SectionTop } from "@/shared/ui/SectionTop";
import { Marquee } from "@/widgets/Marquee";
import { ResultsSlider } from "@/widgets/ResultsSlider";

import classNames from "classnames";
import { useRef } from "react";

export type RawProps = {
  preHeader?: string;
  header: string;
  text: string;
  button1?: ILink;
  button2?: ILink;
  slides: IResult[];
  reviews: IReview[];
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const Reviews = ({
  preHeader,
  header,
  text,
  button1,
  button2,
  slides,
  reviews,
  className,
  ref,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLElement>(null);

  return (
    <div
      {...props}
      className={classNames("reviews section", className)}
      ref={mergeRefs([ref, rootRef])}>
      <div className="wrapper reviews__wrapper">
        <SectionTop header={header} text={text} preHeader={preHeader} />
      </div>
      <ResultsSlider slides={slides} />
      <Marquee items={reviews} />
      {button1 && button2 && (
        <ButtonGroup
          button1={
            <Button
              className="group__button"
              text={button1.name}
              icon="arrow-right"
              tag="a"
              isExternal
            />
          }
          button2={
            <Button
              className="group__button"
              variant="secondary"
              text={button2.name}
              icon="arrow-right"
              tag="a"
              isExternal
            />
          }
        />
      )}
    </div>
  );
};
