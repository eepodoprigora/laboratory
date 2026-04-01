import classnames from "classnames";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const DefaultLayout = ({ ref, children, ...props }: Props) => {
  return (
    <div
      {...props}
      ref={ref}
      className={classnames("page js-page", props.className)}>
      {children}
    </div>
  );
};

export default DefaultLayout;
