import Image from "next/image";
import classNames from "classnames";
import { IDirection } from "../model";
import Parallaxed from "@/shared/ui/Parallaxed";
import { TextAnimation } from "@/shared/ui/TextAnimation";
import Button from "@/shared/ui/Button";
import Reveal from "@/shared/ui/Reveal";
import DOMPurify from "isomorphic-dompurify";
import { ButtonGroup } from "@/shared/ui/ButtonGroup";
import Link from "@/shared/ui/Link";
import { Prices } from "@/shared/ui/Prices";

type Props = IDirection & React.HTMLAttributes<HTMLElement>;

export const Direction = ({
  id,
  image,
  title,
  description,
  ctaLink,
  viewPrices,
  prices,
  className,
  ...props
}: Props) => {
  return (
    <div {...props} className={classNames("direction", className)}>
      <div className="wrapper direction__wrapper">
        <TextAnimation
          className="direction__header direction__header--mobile h3"
          text={title}
          split="letters"
        />
        <div className="direction__content">
          <TextAnimation
            className="direction__header h3"
            text={title}
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

          <Prices items={prices.items} variant="secondary" />
          {ctaLink && viewPrices && (
            <ButtonGroup
              className="direction__buttons"
              button1={
                <Button
                  className="direction__button"
                  icon="arrow-right"
                  href={ctaLink.href}
                  tag="a"
                  isExternal
                  text={ctaLink.name}
                />
              }
              button2={
                <Button
                  className="direction__button"
                  icon="arrow-right"
                  variant="secondary"
                  href={viewPrices.href}
                  tag={Link}
                  text={viewPrices.name}
                  needsContainer={false}
                />
              }
            />
          )}
        </div>
        <div className="direction__image-container">
          <Parallaxed scalePower={0.1} className="responsive__item">
            <Image
              className="direction__image img"
              src={image.src}
              fill
              alt={image.alt ?? ""}
              title={image.title}
            />
          </Parallaxed>
        </div>
      </div>
    </div>
  );
};
