import classNames from "classnames";
import { TextAnimation } from "../TextAnimation";

export type RawProps = {
  header: string;
  text: string;
};

type Props = React.HTMLAttributes<HTMLElement> & {
  ref?: React.RefObject<HTMLDivElement | null>;
} & RawProps;

export const SectionTop = ({ header, text, className, ...props }: Props) => {
  return (
    <div {...props} className={classNames("section-top", className)}>
      <div className="wrapper section-top__wrapper">
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
