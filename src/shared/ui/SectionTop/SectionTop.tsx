import classNames from "classnames";
import { TextAnimation } from "../TextAnimation";

export type RawProps = {
  preHeader?: string;
  header: string;
  text: string;
};

type Props = React.HTMLAttributes<HTMLElement> & {
  ref?: React.RefObject<HTMLDivElement | null>;
} & RawProps;

export const SectionTop = ({
  header,
  text,
  preHeader,
  className,
  ...props
}: Props) => {
  return (
    <div {...props} className={classNames("section-top", className)}>
      <div className="section-top__wrapper">
        {preHeader && (
          <TextAnimation
            className="block__preheader"
            text={preHeader}
            split="words"
          />
        )}

        <TextAnimation
          className="block__header"
          text={header}
          split="letters"
        />
        <TextAnimation className="block__descr" text={text} split="words" />
      </div>
    </div>
  );
};
