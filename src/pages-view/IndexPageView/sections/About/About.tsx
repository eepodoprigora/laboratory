import { Advantage, IAdvantage } from "@/entities/advantage";
import { mergeRefs } from "@/shared/lib/merge-refs";
import { ImageShape } from "@/shared/model/types";
import { TextAnimation } from "@/shared/ui/TextAnimation";

import classNames from "classnames";
import Image from "next/image";
import { useRef } from "react";

export type RawProps = {
  mainImage: ImageShape | null;
  advantages: IAdvantage[];
  text: string;
  button: string;
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const About = ({
  mainImage,
  advantages,
  button,
  text,
  className,
  ref,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLElement>(null);
  return (
    <div
      {...props}
      className={classNames("about", className)}
      ref={mergeRefs([ref, rootRef])}>
      <div className="wrapper">
        <div className="about__top">
          <TextAnimation
            className="about__top-text h3"
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
        <div className="about__bottom">
          <div
            className="about__advantages"
            style={
              { "--advantages-count": advantages.length } as React.CSSProperties
            }>
            <ul className="list-unstyled about__advantages-list">
              {advantages.map((item, i) => (
                <li key={item.id} className="about__advantages-item">
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
      </div>
    </div>
  );
};
