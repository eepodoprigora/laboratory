import classNames from "classnames";
import { ElementType, ReactNode, useEffect, useRef, useState } from "react";

type RawProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  delay?: number;
  once?: boolean;
  observerOptions?: IntersectionObserverInit;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const Reveal = <T extends ElementType = "div">({
  as,
  children,
  delay = 0,
  once = true,
  observerOptions,
  className,
  ...props
}: RawProps<T>) => {
  const Component = as || "div";
  const elementRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = elementRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        if (entry.isIntersecting) {
          timeoutRef.current = setTimeout(() => {
            setRevealed(true);
          }, delay);

          if (once) {
            observer.unobserve(entry.target);
          }

          return;
        }

        if (!once) {
          setRevealed(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
        ...observerOptions,
      },
    );

    observer.observe(node);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      observer.disconnect();
    };
  }, [delay, once, observerOptions]);

  return (
    <Component
      {...props}
      ref={elementRef as never}
      data-reveal
      className={classNames(className, {
        "is-revealed": revealed,
      })}>
      {children}
    </Component>
  );
};

export default Reveal;
