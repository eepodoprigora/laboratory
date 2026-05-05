import classNames from "classnames";
import React, { ReactNode } from "react";

export type RawProps = {
  button1?: ReactNode;
  button2?: ReactNode;
};

type Props = React.HTMLAttributes<HTMLDivElement> & RawProps;

export const ButtonGroup = ({
  button1,
  button2,
  className,
  ...props
}: Props) => {
  return (
    <div>
      <div {...props} className={classNames(className, "group__buttons")}>
        {button1 && <div className="group__button">{button1}</div>}
        {button2 && <div className="group__button">{button2}</div>}
      </div>
    </div>
  );
};
