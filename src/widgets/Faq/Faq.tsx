import { mergeRefs } from "@/shared/lib/merge-refs";
import { ILink, ImageShape } from "@/shared/model/types";
import Parallaxed from "@/shared/ui/Parallaxed";
import Reveal from "@/shared/ui/Reveal";
import { TextAnimation } from "@/shared/ui/TextAnimation";
import DOMPurify from "isomorphic-dompurify";

import classNames from "classnames";
import Image from "next/image";
import { useRef } from "react";
import { Accordion, AccordionItemType } from "@/shared/ui/Accordion";
import Button from "@/shared/ui/Button/Button";

export type RawProps = {
  image?: ImageShape | null;
  header: string;
  description?: string;
  faqItems: AccordionItemType[];
  ctaLink?: ILink;
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const Faq = ({
  image,
  header,
  description,
  faqItems,
  ctaLink,
  className,
  ref,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLElement>(null);

  return (
    <div
      {...props}
      className={classNames("faq section", className)}
      ref={mergeRefs([ref, rootRef])}>
      {image && (
        <div className="faq__image-container">
          <Parallaxed scalePower={0.1} className="responsive__item">
            <Image
              src={image?.src}
              fill
              className="faq__image img"
              alt={image?.alt ?? ""}
              title={image?.title}
            />
          </Parallaxed>
          <div className="faq__text-block">
            <TextAnimation
              className="faq__header h3"
              text={header}
              split="letters"
            />

            {description && (
              <Reveal>
                <div
                  className="wysiwyg text-m"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(description),
                  }}
                />
              </Reveal>
            )}
          </div>
        </div>
      )}
      <div className="faq__wrapper wrapper">
        {!image && (
          <TextAnimation
            className="faq__header faq__header--no-image h3"
            text={header}
            split="letters"
          />
        )}
        <Accordion
          items={faqItems}
          className="faq__accordion faq__accordion--no-image"
        />
        {ctaLink && (
          <Button
            className="faq__cta-button"
            text={ctaLink.name}
            href={ctaLink.href}
            tag="a"
            icon="arrow-right"
            isExternal
          />
        )}
      </div>
    </div>
  );
};
