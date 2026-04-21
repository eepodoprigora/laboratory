import Image from "next/image";
import classNames from "classnames";
import { IDirection } from "../model";
import Parallaxed from "@/shared/ui/Parallaxed";
import { TextAnimation } from "@/shared/ui/TextAnimation";
import Button from "@/shared/ui/Button";

type Props = IDirection & React.HTMLAttributes<HTMLElement>;

export const Direction = ({
  id,
  image,
  title,
  description,
  button,
  link,
  className,
  ...props
}: Props) => {
  return (
    <div {...props} className={classNames("direction", className)}>
      <div className="wrapper direction__wrapper">
        <div className="direction__content">
          <TextAnimation
            className="direction__header block__header"
            text={title}
            split="letters"
          />
          <TextAnimation
            className="direction__description text-m"
            text={description ?? ""}
            split="words"
          />
          <div className="direction__buttons">
            {/* <Button
              className="direction__button"
              text={button}
              icon="arrow-right"
            /> */}
            <Button
              className="direction__button"
              icon="arrow-right"
              // variant="secondary"
              href={link.href}
              tag="a"
              isExternal>
              {link.name}
            </Button>
          </div>
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
