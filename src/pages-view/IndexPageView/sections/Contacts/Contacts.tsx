import { mergeRefs } from "@/shared/lib/merge-refs";
import { IPhone, ISocial } from "@/shared/model/types";
import Link from "@/shared/ui/Link";
import Reveal from "@/shared/ui/Reveal";
import { TextAnimation } from "@/shared/ui/TextAnimation";
import YandexMap from "@/shared/ui/YandexMap";
import classNames from "classnames";
import { useRef } from "react";

export type RawProps = {
  coords: [number, number];
  zoom?: number;
  header: string;
  description?: string;
  address?: string;
  phone?: IPhone;
  workingHours?: string;
  social?: ISocial[];
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const Contacts = ({
  header,
  coords,
  zoom,
  description,
  workingHours,
  phone,
  address,
  social,
  ref,
  className,
  ...props
}: Props) => {
  const rootRef = useRef<HTMLElement>(null);
  return (
    <div
      {...props}
      className={classNames("contacts section", className)}
      ref={mergeRefs([ref, rootRef])}>
      <div className="wrapper">
        <TextAnimation
          className="contacts__top-text block__header"
          text={header}
          split="words"
        />
      </div>
      <div className="contacts__main">
        <div className="contacts__info">
          <div className="wrapper">
            {description && (
              <Reveal>
                <div className="contacts__description text-l">
                  {description}
                </div>
              </Reveal>
            )}
            {workingHours && (
              <Reveal>
                <div className="contacts__working">{workingHours}</div>
              </Reveal>
            )}
            {address && (
              <Reveal>
                <div className="contacts__address">{address}</div>
              </Reveal>
            )}
            {phone && (
              <Reveal>
                <Link
                  isExternal
                  href={`tel:${phone.link}`}
                  className="contacts__phone link">
                  {phone.value}
                </Link>
              </Reveal>
            )}
            {social && social.length && (
              <ul className="contacts__social list-unstyled">
                {social.map((item) => (
                  <li key={item.value}>
                    <Link
                      isExternal
                      href={item.link}
                      className={classNames(
                        "contacts__social-link social-link",
                        `contacts__social-link--${item.type}`,
                      )}>
                      <span className="contacts__social-icon"></span>
                      {item.value}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <YandexMap mapCoords={coords} zoom={zoom} className="contacts__map" />
      </div>
    </div>
  );
};
