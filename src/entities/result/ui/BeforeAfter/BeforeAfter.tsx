import classNames from "classnames";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IResult } from "../../model";

export type RawProps = Pick<IResult, "imageBefore" | "imageAfter"> & {
  value?: number;
};

type Props = React.HTMLAttributes<HTMLDivElement> & RawProps;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const BeforeAfter = ({
  imageBefore,
  imageAfter,
  value = 50,
  className,
  ...props
}: Props) => {
  const [position, setPosition] = useState(clamp(value, 0, 100));
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setPosition(clamp(value, 0, 100));
  }, [value]);

  if (!imageBefore || !imageAfter) {
    return null;
  }

  return (
    <div
      {...props}
      className={classNames("before-after-slider", className, {
        "is-active": isActive,
      })}
      style={
        {
          "--before-after-position": `${position}%`,
        } as React.CSSProperties
      }>
      <div className="before-after-slider__viewport">
        <div className="before-after-slider__layer before-after-slider__layer--after">
          <Image
            className="before-after-slider__image"
            src={imageAfter.src}
            alt={imageAfter.alt || "После"}
            fill
            draggable={false}
            sizes="(max-width: 767px) 100vw, 50vw"
          />
          <span className="before-after-slider__label before-after-slider__label--after">
            После
          </span>
        </div>

        <div className="before-after-slider__layer before-after-slider__layer--before">
          <Image
            className="before-after-slider__image"
            src={imageBefore.src}
            alt={imageBefore.alt || "До"}
            fill
            draggable={false}
            sizes="(max-width: 767px) 100vw, 50vw"
          />
          <span className="before-after-slider__label before-after-slider__label--before">
            До
          </span>
        </div>

        <div className="before-after-slider__divider" aria-hidden="true">
          <span className="before-after-slider__handle">
            <span className="before-after-slider__handle-arrow before-after-slider__handle-arrow--left" />
            <span className="before-after-slider__handle-arrow before-after-slider__handle-arrow--right" />
          </span>
        </div>

        <input
          className="before-after-slider__range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          aria-label="Сравнение изображений"
          onChange={(event) => setPosition(Number(event.target.value))}
          onPointerDown={() => setIsActive(true)}
          onPointerUp={() => setIsActive(false)}
          onPointerCancel={() => setIsActive(false)}
          onBlur={() => setIsActive(false)}
        />
      </div>
    </div>
  );
};
