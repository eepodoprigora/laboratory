import { BeforeAfter, IResult, Story } from "@/entities/result";
import { mergeRefs } from "@/shared/lib/merge-refs";
import classNames from "classnames";
import { useMemo, useRef } from "react";

export type RawProps = {
  slides: IResult[];
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const ResultsSlider = ({ slides, className, ref, ...props }: Props) => {
  const rootRef = useRef<HTMLElement>(null);

  const groupedSlides = useMemo(() => {
    const result: IResult[][] = [];

    for (let i = 0; i < slides.length; i += 2) {
      result.push(slides.slice(i, i + 2));
    }

    return result;
  }, [slides]);

  return (
    <section
      {...props}
      className={classNames("results-slider", className)}
      ref={mergeRefs([ref, rootRef])}>
      <div className="wrapper results-slider__wrapper">
        <div className="results-slider__track">
          {groupedSlides.map((group, index) => (
            <div key={index} className="results-slider__slide">
              {group.map((item) => (
                <article key={item.id} className="results-slider__story">
                  <BeforeAfter
                    className="results-slider__before-after"
                    imageBefore={item.imageBefore}
                    imageAfter={item.imageAfter}
                  />
                  <Story
                    className="results-slider__story-content"
                    header={item.header}
                    description={item.description}
                    timing={item.timing}
                  />
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
