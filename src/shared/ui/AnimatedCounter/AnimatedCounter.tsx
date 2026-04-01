import React, { useMemo } from "react";
import classNames from "classnames";

type RawProps = {
  value: number;
  digits?: number;
  padWithZeros?: boolean;
  className?: string;
  digitClassName?: string;
};

type Props = RawProps & React.HTMLAttributes<HTMLElement>;

const NUMBERS = [...Array(10)].map((_, index) => String(index));

export const AnimatedCounter = ({
  value,
  digits = 2,
  padWithZeros = true,
  className,
  digitClassName,
  ...props
}: Props) => {
  const safeValue = Math.max(0, Math.floor(value));

  const formattedValue = useMemo(() => {
    const raw = String(safeValue);
    return padWithZeros ? raw.padStart(digits, "0") : raw;
  }, [safeValue, padWithZeros, digits]);

  return (
    <span
      {...props}
      className={classNames("animated-counter", className)}
      aria-hidden="true">
      {formattedValue.split("").map((digit, index) => (
        <DigitColumn
          key={index}
          digit={Number(digit)}
          className={digitClassName}
        />
      ))}
    </span>
  );
};

type DigitColumnProps = {
  digit: number;
  className?: string;
};

const DigitColumn = ({ digit, className }: DigitColumnProps) => {
  return (
    <span className="animated-counter__digit-wrap">
      <span
        className="animated-counter__digit-column"
        style={{
          transform: `translateY(-${digit}em)`,
        }}>
        {NUMBERS.map((number) => (
          <span
            key={number}
            className={classNames("animated-counter__digit", className)}>
            {number}
          </span>
        ))}
      </span>
    </span>
  );
};
