"use client";

import { useEffect, useState } from "react";

const LayoutGrid = () => {
  const key = "k";
  const lineWidth = 1;

  const baseColor = [231, 64, 31];
  const columnColor = `rgba(${baseColor.join(",")}, 0.04)`;
  const gapColor = `rgba(${baseColor.join(",")}, 0.13)`;

  const WRAPPER_MAX_WIDTH =
    typeof window !== "undefined"
      ? parseFloat(
          window
            .getComputedStyle(document.documentElement)
            .getPropertyValue("--wrapper-max-width"),
        )
      : 0;
  const [hidden, setHidden] = useState(true);
  const [columnWidth, setColumnWidth] = useState(0);
  const [gapWidth, setGapWidth] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    function onResize() {
      const docStyles = window.getComputedStyle(document.documentElement);
      const offsetX = docStyles.getPropertyValue("--offset-x")
        ? parseFloat(docStyles.getPropertyValue("--offset-x"))
        : 0;
      const gapWidth = parseFloat(docStyles.getPropertyValue("--grid-gap"));
      const gridColumns = parseFloat(
        docStyles.getPropertyValue("--grid-columns"),
      );
      const scrollbarWidth = docStyles.getPropertyValue("--scrollbar-width")
        ? parseFloat(docStyles.getPropertyValue("--scrollbar-width"))
        : 0;

      const columnWidth = Math.min(
        Math.min(
          WRAPPER_MAX_WIDTH,
          window.innerWidth - scrollbarWidth - offsetX * 2,
        ) /
          gridColumns -
          gapWidth * ((gridColumns - 1) / gridColumns),
      );

      setOffsetX(offsetX);
      setGapWidth(gapWidth);
      setColumnWidth(columnWidth);
    }

    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [WRAPPER_MAX_WIDTH, columnColor, gapColor]);

  useEffect(() => {
    function onKeydown(event: KeyboardEvent) {
      if (event.key === key || event.key === key.toUpperCase()) {
        setHidden(!hidden);
      }
    }

    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [hidden]);

  return (
    <div
      hidden={hidden}
      style={{
        pointerEvents: "none",
        position: "fixed",
        zIndex: 99999999,
        top: 0,
        left: "50%",
        transform: "translate(-50%, 0)",
        width: "100%",
        maxWidth: WRAPPER_MAX_WIDTH,
        height: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `repeating-linear-gradient(to right, ${columnColor}, ${columnColor} ${
          columnWidth - (gapWidth === 0 ? lineWidth : 0)
        }px, ${gapColor} ${columnWidth - (gapWidth === 0 ? lineWidth : 0)}px, ${gapColor} ${
          columnWidth + gapWidth
        }px)`,
        backgroundSize: `calc(100% - ${offsetX * 2}px) 100%`,
      }}></div>
  );
};

export default LayoutGrid;
