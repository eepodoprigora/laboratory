import classNames from "classnames";
import { ImageShape } from "@/shared/model/types";

export type Props = React.HTMLAttributes<HTMLImageElement> & {
  ref?: React.Ref<HTMLDivElement>;
  image: ImageShape;
  classname?: string;
};

const IconImage = ({ ref, image, className, ...props }: Props) => {
  return (
    <div className={classNames("icon-wrapper", className)} ref={ref}>
      <i
        className={classNames("icon", "icon-image")}
        {...props}
        style={
          {
            ...props.style,
            "--path": `url(${image.src})`,
          } as React.CSSProperties
        }
      />
    </div>
  );
};

export default IconImage;
