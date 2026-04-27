import { mergeRefs } from "@/shared/lib/merge-refs";
import { ImageShape } from "@/shared/model/types";
import Reveal from "@/shared/ui/Reveal";
import DOMPurify from "isomorphic-dompurify";
import { TextAnimation } from "@/shared/ui/TextAnimation";
import classNames from "classnames";
import Image from "next/image";
import { useRef } from "react";
import { addLeadingZero } from "@/shared/lib/strings";
import Parallaxed from "@/shared/ui/Parallaxed";
import { useMediaQuery } from "usehooks-ts";
import { useMounted } from "@/shared/lib/use-mounted";

export type RawProps = {
  id: number | string;
  image: ImageShape | null;
  header: string;
  text: string;
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
    imageRight?: boolean;
  };

export const Chess = ({
  image,
  header,
  text,
  imageRight,
  className,
  ref,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery(
    "(max-width: 767px), (max-width: 900px) and (orientation: landscape)",
  );

  const mounted = useMounted();

  return (
    <div
      {...props}
      className={classNames("chess", className, {
        "chess_image-right": imageRight,
      })}
      ref={mergeRefs([ref, rootRef])}>
      <div className="wrapper chess__wrapper">
        <div className="mobile-only chess__mobile-top">
          <span className="chess__order h3">{addLeadingZero(props.id)}</span>
          <TextAnimation
            className="chess__header h3"
            text={header}
            split="letters"
          />
        </div>
        {image && (
          <div className="chess__image-wrapper">
            <div className="chess__image-container">
              <Parallaxed
                floatingOnly={!isMobile && mounted}
                movePower={0.12}
                direction={1}
                scalePower={!isMobile && mounted ? 0.1 : 0}
                className={classNames({
                  responsive__item: isMobile && mounted,
                })}>
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
        <div className="chess__content">
          <span className="chess__order h1 desktop-only">
            {addLeadingZero(props.id)}
          </span>
          <TextAnimation
            className="chess__header h3 desktop-only"
            text={header}
            split="letters"
          />

          <Reveal>
            <div
              className="wysiwyg text-m"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(text),
              }}
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
};
