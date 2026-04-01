import { useEffect } from "react";
import { lockBodyScroll, unlockBodyScroll } from "@/shared/lib/dom";
import { useAppReadyStore } from "@/shared/model/app-ready";
import { useScrollLockedStore } from "@/shared/model/scroll-lock";

const AppInits = () => {
  const scrollLocked = useScrollLockedStore((state) => state.scrollLocked);
  const setScrollLocked = useScrollLockedStore(
    (state) => state.setScrollLocked,
  );
  const appReady = useAppReadyStore((state) => state.appReady);

  useEffect(() => {
    setScrollLocked(!appReady);
  }, [appReady]);

  useEffect(() => {
    if (scrollLocked) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }
  }, [scrollLocked]);

  return null;
};

export default AppInits;
