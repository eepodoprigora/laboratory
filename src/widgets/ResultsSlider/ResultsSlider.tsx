import { BeforeAfter, IResult, Story } from "@/entities/result";
import { mergeRefs } from "@/shared/lib/merge-refs";
import Button from "@/shared/ui/Button";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

export type RawProps = {
  slides: IResult[];
  activeIndex?: number;
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const ResultsSlider = ({
  slides,
  activeIndex = 0,
  className,
  ref,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(activeIndex);

  useEffect(() => {
    setCurrentIndex(activeIndex);
  }, [activeIndex]);

  const lastIndex = slides.length - 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return lastIndex;
      }

      return prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= lastIndex) {
        return 0;
      }

      return prev + 1;
    });
  };

  if (!slides.length) {
    return null;
  }

  return (
    <section
      {...props}
      className={classNames("results-slider", className)}
      ref={mergeRefs([ref, rootRef])}>
      <div className="wrapper results-slider__wrapper">
        <div className="results-slider__slides">
          {slides.map((item, index) => (
            <div
              key={item.id}
              className={classNames("results-slider__slide", {
                "is-active": index === currentIndex,
              })}>
              <article className="results-slider__story">
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
                  isActive={index === currentIndex}
                />
              </article>
            </div>
          ))}
        </div>

        <div className="results-slider__buttons">
          <Button
            icon="arrow-left"
            aria-label="Предыдущий слайд"
            className="btn--slider"
            variant="secondary"
            onClick={handlePrev}
          />
          <Button
            icon="arrow-right"
            aria-label="Следующий слайд"
            className="btn--slider"
            variant="secondary"
            onClick={handleNext}
          />
        </div>
      </div>
    </section>
  );
};
