import { Advantage, IAdvantage } from "@/entities/advantage";
import { mergeRefs } from "@/shared/lib/merge-refs";
import { useMounted } from "@/shared/lib/use-mounted";
import { useSlider } from "@/shared/lib/use-slider";
import { ImageShape } from "@/shared/model/types";
import Button from "@/shared/ui/Button";
import { SectionTop } from "@/shared/ui/SectionTop";
import { TextAnimation } from "@/shared/ui/TextAnimation";
import classNames from "classnames";
import Image from "next/image";
import React, { useRef } from "react";
import { useMediaQuery } from "usehooks-ts";

export type RawProps = {
  preHeader?: string;
  header: string;
  description: string;
  mainImage: ImageShape | null;
  advantages: IAdvantage[];
  text: string;
  button: string;
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLElement | null>;
  };

export const About = ({
  preHeader,
  header,
  description,
  mainImage,
  advantages,
  button,
  text,
  className,
  ref,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLElement>(null);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isSmallTablet = useMediaQuery(
    "(min-width: 768px) and (max-width: 950px)",
  );
  const isTablet = useMediaQuery("(min-width: 951px) and (max-width: 1199px)");

  const isSliderNeeded = isMobile || isSmallTablet || isTablet;

  const visibleSlides = (() => {
    switch (true) {
      case isMobile:
        return 1.1;
      case isSmallTablet:
        return 2.2;
      case isTablet:
        return 3.2;
      default:
        return 0;
    }
  })();

  const mounted = useMounted();

  const {
    viewportRef,
    slideWidth,
    translateX,
    handlers,
    canPrev,
    canNext,
    setPrev,
    setNext,
  } = useSlider({
    gap: 16,
    slideCount: advantages.length,
    visible: visibleSlides,
    initialIndex: 0,
    threshold: 40,
    // wrapperAsideOffset: 0,
    isNeeded: isSliderNeeded,
  });

  return (
    <section
      {...props}
      className={classNames("about section", className, {
        "about--slider": isSliderNeeded && mounted,
      })}
      ref={mergeRefs([ref, rootRef])}>
      <div className="about__top">
        <div className="wrapper">
          <TextAnimation
            className="about__top-text h4"
            text={text}
            split="words"
          />

          {mainImage && (
            <div className="about__main-image-container">
              <Image
                src={mainImage.src}
                alt={mainImage.alt ?? ""}
                fill
                title={mainImage.title}
                className="about__main-image img"
              />
            </div>
          )}
        </div>
      </div>

      <SectionTop preHeader={preHeader} header={header} text={description} />

      <div className="about__bottom">
        <div
          className={classNames("about__advantages", {
            "about__advantages--slider": isSliderNeeded && mounted,
          })}
          style={
            {
              "--advantages-count": advantages.length,
            } as React.CSSProperties
          }>
          <div
            ref={viewportRef}
            className="about__advantages-viewport"
            {...(isSliderNeeded ? handlers : {})}>
            <div
              className="about__advantages-track"
              style={
                isSliderNeeded && mounted
                  ? {
                      transform: `translate3d(${translateX}px, 0, 0)`,
                    }
                  : undefined
              }>
              <ul className="list-unstyled about__advantages-list">
                {advantages.map((item, i) => (
                  <li
                    key={item.id}
                    className="about__advantages-item"
                    style={
                      isSliderNeeded && mounted
                        ? {
                            width: `${slideWidth}px`,
                            minWidth: `${slideWidth}px`,
                            maxWidth: `${slideWidth}px`,
                          }
                        : undefined
                    }>
                    <Advantage
                      {...item}
                      id={item.id.toString()}
                      className="about__advantage"
                      index={i}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {isSliderNeeded && mounted && advantages.length > visibleSlides && (
            <div className="about__slider-buttons slider__buttons">
              <Button
                icon="arrow-left"
                aria-label="Предыдущий слайд"
                className="btn--slider"
                variant="secondary"
                onClick={setPrev}
                disabled={!canPrev}
              />
              <Button
                icon="arrow-right"
                aria-label="Следующий слайд"
                className="btn--slider"
                variant="secondary"
                onClick={setNext}
                disabled={!canNext}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
