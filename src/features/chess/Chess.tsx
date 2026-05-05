import { mergeRefs } from "@/shared/lib/merge-refs";
import { ILink, ImageShape } from "@/shared/model/types";
import Reveal from "@/shared/ui/Reveal";
import DOMPurify from "isomorphic-dompurify";
import { TextAnimation } from "@/shared/ui/TextAnimation";
import classNames from "classnames";
import Image from "next/image";
import { useRef } from "react";
import { addLeadingZero } from "@/shared/lib/strings";
import Parallaxed from "@/shared/ui/Parallaxed";
import Button from "@/shared/ui/Button";

export type RawProps = {
  id: number | string;
  image: ImageShape | null;
  header: string;
  text?: string;
  ctaLink?: ILink;
  children?: React.ReactNode;
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
    imageRight?: boolean;
    largeContent?: boolean;
    largeBlock?: boolean;
    id: string;
    scrollId?: string;
  };

export const Chess = ({
  image,
  header,
  text,
  children,
  imageRight,
  largeContent,
  largeBlock,
  ctaLink,
  scrollId,
  id,
  className,
  ref,
}: Props) => {
  const rootRef = useRef<HTMLElement>(null);

  return (
    <div
      id={scrollId}
      className={classNames("chess", className, {
        "chess--image-right": imageRight,
        "chess--large-content": largeContent,
        "chess--large-block": largeBlock,
      })}
      ref={mergeRefs([ref, rootRef])}>
      <div className="mobile-only chess__mobile-top">
        <span className="chess__order h3">{addLeadingZero(id)}</span>
        <TextAnimation
          className="chess__header h3"
          text={header}
          split="letters"
        />
      </div>
      {image && (
        <div className="chess__image-wrapper">
          <div className="chess__image-container">
            <Parallaxed scalePower={0.1} className="responsive__item">
              <Image
                src={image.src}
                alt={image.alt ?? ""}
                fill
                title={image.title}
                className="chess__image img"
              />
            </Parallaxed>
          </div>
        </div>
      )}
      <div className="wrapper chess__wrapper-content">
        <div className="chess__content">
          <span className="chess__order h1 desktop-only">
            {addLeadingZero(id)}
          </span>
          <TextAnimation
            className="chess__header h3 desktop-only"
            text={header}
            split="letters"
          />
          {text && (
            <Reveal className="chess__text">
              <div
                className="wysiwyg text-m"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(text),
                }}
              />
            </Reveal>
          )}

          {children && <div className="chess__custom-content">{children}</div>}

          {ctaLink && (
            <Button
              className="chess__button"
              icon="arrow-right"
              href={ctaLink.href}
              tag="a"
              isExternal
              text={ctaLink.name}
            />
          )}
        </div>
      </div>
    </div>
  );
};
