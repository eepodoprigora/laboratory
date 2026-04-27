import Image from "next/image";
import classNames from "classnames";
import { IAdvantage } from "../model";
import { addLeadingZero } from "@/shared/lib/strings";
import Parallaxed from "@/shared/ui/Parallaxed";
import { TextAnimation } from "@/shared/ui/TextAnimation";

type Props = IAdvantage &
  React.HTMLAttributes<HTMLElement> & {
    index: number;
  };

export const Advantage = ({
  id,
  image,
  header,
  description,
  index,
  className,
  ...props
}: Props) => {
  return (
    <div {...props} className={classNames("advantage", className)}>
      <div className="advantage__image-container">
        <Parallaxed scalePower={0.1} className="responsive__item">
          <Image
            className="advantage__image img"
            src={image.src}
            fill
            alt={image.alt ?? ""}
            title={image.title}
          />
        </Parallaxed>
      </div>

      <div className="advantage__bottom">
        <div className="advantage__number h5">{addLeadingZero(id)}</div>
        <div className="advantage__content">
          <TextAnimation
            className="advantage__header h5"
            text={header}
            split="letters"
            delay={index * 0.1}
            once
          />
          <TextAnimation
            className="advantage__description text-m"
            text={description}
            split="words"
            delay={index * 0.2}
            once
          />
        </div>
      </div>
    </div>
  );
};
