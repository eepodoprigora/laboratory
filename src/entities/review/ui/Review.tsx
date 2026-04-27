import classNames from "classnames";
import { IReview } from "../model";

export type RawProps = IReview;

type Props = RawProps &
  React.HTMLAttributes<HTMLElement> & {
    ref?: React.RefObject<HTMLDivElement | null>;
  };

export const Review = ({ name, text, className, ref, ...props }: Props) => {
  return (
    <div {...props} className={classNames("review", className)} ref={ref}>
      <span className="review__quote h1">“</span>
      <div className="review__name h5">{name}</div>
      <div className="review__text text-m">{text}</div>
    </div>
  );
};
