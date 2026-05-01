import { mergeRefs } from "@/shared/lib/merge-refs";
import { splitTextByDot } from "@/shared/lib/strings";
import { useAppReadyStore } from "@/shared/model/app-ready";
import { ILink, ImageShape, VideoShape } from "@/shared/model/types";
import Button from "@/shared/ui/Button";
import { TextAnimation } from "@/shared/ui/TextAnimation";

import classNames from "classnames";
import Image from "next/image";
import { useRef } from "react";

export type RawProps = {
  image?: ImageShape | null;
  video?: VideoShape | null;
  text: string;
  ctaLink?: ILink;
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const Hero = ({
  image,
  text,
  ctaLink,
  className,
  ref,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLElement>(null);
  const items = splitTextByDot(text);
  const appReady = useAppReadyStore((s) => s.appReady);

  return (
    <div
      {...props}
      className={classNames("hero", className)}
      ref={mergeRefs([ref, rootRef])}>
      {image && (
        <div className="hero__image-container">
          <Image
            src={image?.src}
            fill
            className="hero__image img"
            alt={image?.alt ?? ""}
            title={image?.title}
            loading="eager"
          />
        </div>
      )}
      <div className="wrapper hero__wrapper">
        <div className="hero__text-block">
          {items.map((item, i) => (
            <TextAnimation
              key={item}
              text={item}
              className="hero__text h4"
              split="letters"
              delay={i * 0.3}
              active={appReady}
            />
          ))}
        </div>
        {ctaLink && (
          <Button
            className={classNames("hero__button", {
              "hero__button--active": appReady,
            })}
            tag="a"
            text={ctaLink.name}
            href={ctaLink.href}
            icon="arrow-right"
            isExternal
            variant="hero"
          />
        )}
      </div>
    </div>
  );
};
