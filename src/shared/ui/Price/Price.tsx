import React from "react";
import classNames from "classnames";

export type IPrice = {
  text: string;
  price: string;
  type?: "group" | "single" | "subscription" | "once";
};

type Props = React.HTMLAttributes<HTMLElement> & IPrice;

export const Price = ({ text, price, className, ...props }: Props) => {
  return (
    <div className={classNames("price", className)} {...props}>
      <div className="price__text text-m">{text}</div>
      <div className="price__value text-m">{price}</div>
    </div>
  );
};
