import { IResult } from "@/entities/result";
import { IReview } from "@/entities/review";
import { mergeRefs } from "@/shared/lib/merge-refs";
import Button from "@/shared/ui/Button";
// import Button from "@/shared/ui/Button";
import { SectionTop } from "@/shared/ui/SectionTop";
import { Marquee } from "@/widgets/Marquee";
import { ResultsSlider } from "@/widgets/ResultsSlider";

import classNames from "classnames";
import { useRef } from "react";

export type RawProps = {
  preHeader?: string;
  header: string;
  text: string;
  button1?: string;
  button2?: string;
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
      <div className="reviews__buttons">
        <Button className="reviews__button" text={button1} icon="arrow-right" />
        <Button
          className="reviews__button"
          variant="secondary"
          text={button2}
          icon="arrow-right"
        />
      </div>
    </div>
  );
};
