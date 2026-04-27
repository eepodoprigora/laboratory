import classNames from "classnames";

import { IResult } from "../../model";
import { TextAnimation } from "@/shared/ui/TextAnimation/TextAnimation";
import Reveal from "@/shared/ui/Reveal";
import DOMPurify from "isomorphic-dompurify";

export type RawProps = Pick<IResult, "header" | "description" | "timing">;

type Props = RawProps &
  React.HTMLAttributes<HTMLElement> & {
    isActive?: boolean;
  };

export const Story = ({
  header,
  description,
  timing,
  isActive = false,
  className,
  ...props
}: Props) => {
  return (
    <div
      {...props}
      className={classNames("story", className, {
        "is-active": isActive,
      })}>
      <div className="story__wrapper">
        <TextAnimation className="story__header h5" text={header} />
        <Reveal>
          <div
            className="wysiwyg text-m"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          />
          <p className="story__timing text-m">Результат за {timing}</p>
        </Reveal>
      </div>
    </div>
  );
};
