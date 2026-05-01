import { LinkProps, default as NextLink } from "next/link";
import { usePageTransitionStore } from "@/shared/model/page-transition";

type Props = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  Partial<LinkProps> & {
    href: string;
    isExternal?: boolean;
    ref?: React.Ref<HTMLAnchorElement>;
    isLogo?: boolean;
  };

const Link = ({
  ref,
  children,
  href,
  isExternal = false,
  isLogo = false,
  ...props
}: Props) => {
  const isPageTransitioning = usePageTransitionStore(
    (state) => state.isLeaving || state.isHolding || state.isEntering,
  );

  const style: React.CSSProperties = {
    ...props.style,
    pointerEvents: isPageTransitioning ? "none" : undefined,
  };

  if (isExternal) {
    return (
      <a
        {...props}
        ref={ref}
        href={href}
        style={style}
        target={props.target ?? "_blank"}
        rel={props.rel ?? "noopener noreferrer"}>
        <span className="link__container">{children}</span>
      </a>
    );
  }

  return (
    <NextLink
      {...props}
      ref={ref}
      href={href}
      scroll={props.scroll ?? false}
      style={style}>
      {isLogo && children}
      {!isLogo && <span className="link__container">{children}</span>}
    </NextLink>
  );
};

export default Link;
