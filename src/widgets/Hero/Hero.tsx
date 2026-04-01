import { mergeRefs } from "@/shared/lib/merge-refs";
import { splitTextByDot } from "@/shared/lib/strings";
import { ImageShape } from "@/shared/model/types";
import Button from "@/shared/ui/Button";
import { TextAnimation } from "@/shared/ui/TextAnimation";

import classNames from "classnames";
import Image from "next/image";
import { useRef } from "react";

export type RawProps = {
  image: ImageShape | null;
  text: string;
  button: string;
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const Hero = ({
  image,
  text,
  button,
  className,
  ref,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLElement>(null);

  const items = splitTextByDot(text);

  return (
    <div
      {...props}
      className={classNames("hero", className)}
      ref={mergeRefs([ref, rootRef])}>
      {image && (
        <Image
          src={image?.src}
          fill
          className="hero__image img"
          alt={image?.alt ?? ""}
          title={image?.title}
        />
      )}
      <div className="wrapper">
        <div className="hero__text-block">
          {items.map((item, i) => (
            <TextAnimation
              key={item}
              text={item}
              className="hero__text h5"
              split="letters"
              delay={i * 0.3}
            />
          ))}
        </div>
        <Button className="hero__button" text={button} icon="arrow-right" />
      </div>
    </div>
  );
};
