import { LinkProps, default as NextLink } from "next/link";
import { usePageTransitionStore } from "@/shared/model/page-transition";

type Props = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & {
    ref?: React.Ref<HTMLAnchorElement>;
  };

const Link = ({ ref, children, ...props }: Props) => {
  const isPageTransitioning = usePageTransitionStore(
    (state) => state.isLeaving,
  );

  return (
    <NextLink
      {...props}
      ref={ref}
      scroll={props.scroll || false}
      style={{
        ...props.style,
        pointerEvents: isPageTransitioning ? "none" : undefined,
      }}>
      <span className="link__container"> {children}</span>
    </NextLink>
  );
};

export default Link;
