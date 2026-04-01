import classNames from "classnames";
// import { TextAnimation } from "@/shared/ui/TextAnimation";
import { IResult } from "../../model/result.interface";

export type RawProps = Pick<IResult, "header" | "description" | "timing">;

type Props = RawProps & React.HTMLAttributes<HTMLElement>;

export const Story = ({ className, ...props }: Props) => {
  return (
    <div {...props} className={classNames("story", className)}>
      <div className="wrapper story__wrapper"></div>
    </div>
  );
};
