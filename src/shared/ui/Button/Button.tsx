import classNames from "classnames";
import React from "react";
import Link, { type LinkProps } from "@/shared/ui/Link";

type BaseProps = {
  tag?: "button" | "a" | typeof Link;
  variant?: "primary" | "secondary" | "primary-light";
  text?: string;
  icon?: "arrow-right" | "arrow-left" | "menu" | "reset";
  iconRepeat?: boolean;
  isActiveTab?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    tag?: "button";
  };

type ButtonAsAnchorProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    tag: "a";
  };

type ButtonAsLinkProps = BaseProps &
  LinkProps & {
    tag: typeof Link;
  };

export type Props =
  | ButtonAsButtonProps
  | ButtonAsAnchorProps
  | ButtonAsLinkProps;

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  (
    {
      variant = "primary",
      tag = "button",
      className,
      text,
      icon,
      children,
      ...props
    },
    ref,
  ) => {
    const componentClassName = classNames(
      "btn",
      {
        "btn--primary": variant === "primary",
        "btn--secondary": variant === "secondary",
        "btn--primary-light": variant === "primary-light",
      },
      className,
    );

    const content = (
      <>
        {(text || children) && (
          <span className="btn__text">{text || children}</span>
        )}
        {icon && (
          <span
            className={classNames("btn__icon", {
              "btn__icon--arrow-right": icon === "arrow-right",
              "btn__icon--arrow-left": icon === "arrow-left",
            })}
          />
        )}
      </>
    );

    if (tag === "a") {
      const anchorProps =
        props as React.AnchorHTMLAttributes<HTMLAnchorElement>;

      return (
        <a
          {...anchorProps}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={componentClassName}>
          {content}
        </a>
      );
    }

    if (tag === Link) {
      const linkProps = props as LinkProps;

      return (
        <Link
          {...linkProps}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={componentClassName}>
          {content}
        </Link>
      );
    }

    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;

    return (
      <button
        {...buttonProps}
        ref={ref as React.Ref<HTMLButtonElement>}
        className={componentClassName}>
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
