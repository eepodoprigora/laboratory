import { LazyMotion } from "motion/react";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <LazyMotion
      features={() => import("./motion-features").then((m) => m.default)}
      strict>
      {children}
    </LazyMotion>
  );
};

export default Providers;
