import type { AppProps } from "next/app";
import { ReactNode } from "react";
import "@/application/css/app.scss";

import { AnimatePresence } from "motion/react";
import { CommonPageProps } from "@/shared/model/types";
import { usePageTransitionStore } from "@/shared/model/page-transition";
import { usePrevious } from "@/shared/lib/use-previous";
// import { Preloader } from "@/shared/ui/Preloader";
import AppInits from "@/application/AppInits";
import { Header } from "@/widgets/Header";
import { usePageTransition } from "@/shared/lib/page-transitions";
import { Providers } from "@/shared/lib/providers";
import vhMobileFix from "@/shared/lib/dom/vh-mobile-fix";
import { calculateScrollbarWidth } from "@/shared/lib/dom";
import dynamic from "next/dynamic";
import { Preloader } from "@/shared/ui/Preloader";
import { Footer } from "@/widgets/Footer";
import { PageTransitionOverlay } from "@/shared/ui/PageTransitionOverlay";
const LayoutGrid = dynamic(() => import("@/shared/ui/LayoutGrid"), {
  ssr: false,
});

type PageTransitionPresenceProps = {
  children: ReactNode;
};

if (typeof window !== "undefined") {
  document.documentElement.classList.add("js-ready");
  vhMobileFix();
  calculateScrollbarWidth();
}

const PageTransitionPresence = ({ children }: PageTransitionPresenceProps) => {
  usePageTransition();

  return <>{children}</>;
};

const AnimatedPage = ({
  pageProps,
  children,
}: {
  pageProps: CommonPageProps;
  children: ReactNode;
}) => {
  const prevBodyClass = usePrevious(pageProps.bodyClass);
  const mode = usePageTransitionStore((state) => state.mode);

  return (
    <AnimatePresence
      mode={mode}
      initial={false}
      onExitComplete={() => {
        if (prevBodyClass) {
          document.documentElement.classList.remove(
            ...prevBodyClass.split(" "),
          );
        }

        if (pageProps.bodyClass) {
          document.documentElement.classList.add(
            ...pageProps.bodyClass.split(" "),
          );
        }
        window.scrollTo({ top: 0, behavior: "auto" });
        document.dispatchEvent(new Event("new-page-ready"));
      }}>
      {children}
    </AnimatePresence>
  );
};

const App = ({ Component, pageProps, router }: AppProps<CommonPageProps>) => {
  return (
    <Providers>
      <Preloader />
      <AppInits />
      <PageTransitionOverlay />

      <main className="main">
        <Header {...pageProps.header} />

        <AnimatedPage pageProps={pageProps}>
          <PageTransitionPresence key={router.asPath}>
            <Component {...pageProps} />
          </PageTransitionPresence>
        </AnimatedPage>
        <Footer {...pageProps.footer} />
      </main>
      {process.env.NODE_ENV === "development" && <LayoutGrid />}
    </Providers>
  );
};

export default App;
