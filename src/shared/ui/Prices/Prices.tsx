import React from "react";
import classNames from "classnames";
import { IPrice } from "@/shared/ui/Price";

type PricesVariant = "primary" | "secondary";

export type RawProps = {
  items: IPrice[];
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    variant?: PricesVariant;
  };

export const Prices = ({
  items,
  variant = "primary",
  className,
  ...props
}: Props) => {
  return (
    <div
      className={classNames(
        "prices",
        {
          "prices--primary": variant === "primary",
          "prices--secondary": variant === "secondary",
        },
        className,
      )}
      {...props}>
      {items.map((item) => (
        <div className="prices__block" key={`${item.text}-${item.price}`}>
          <div className="prices__text text-m">{item.text}</div>
          <div className="prices__price h4">{item.price}</div>
        </div>
      ))}
    </div>
  );
};
