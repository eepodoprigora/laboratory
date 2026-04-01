import { ImageShape } from "@/shared/model/types";
import classNames from "classnames";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const ImgComparisonSlider = dynamic(
  async () => {
    await import("img-comparison-slider");

    return function ImgComparisonSliderComponent(
      props: React.HTMLAttributes<HTMLElement> & {
        value?: number;
      },
    ) {
      return React.createElement("img-comparison-slider", props);
    };
  },
  { ssr: false },
);

export type RawProps = {
  imageBefore: ImageShape | null;
  imageAfter: ImageShape | null;
  value?: number;
};

type Props = React.HTMLAttributes<HTMLDivElement> & RawProps;

export const BeforeAfter = ({
  imageBefore,
  imageAfter,
  value = 50,
  className,
  ...props
}: Props) => {
  if (!imageBefore || !imageAfter) {
    return null;
  }

  return (
    <div {...props} className={classNames("before-after-slider", className)}>
      <ImgComparisonSlider className="before-after-slider__inner" value={value}>
        <div slot="first" className="before-after-slider__item">
          <Image
            className="before-after-slider__image"
            src={imageBefore.src}
            alt={imageBefore.alt || "До"}
            fill
          />
          <span className="before-after-slider__label before-after-slider__label--before">
            До
          </span>
        </div>

        <div slot="second" className="before-after-slider__item">
          <Image
            className="before-after-slider__image"
            src={imageAfter.src}
            alt={imageAfter.alt || "После"}
            fill
          />
          <span className="before-after-slider__label before-after-slider__label--after">
            После
          </span>
        </div>
      </ImgComparisonSlider>
    </div>
  );
};
