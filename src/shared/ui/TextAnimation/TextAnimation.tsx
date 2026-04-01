import React, { ElementType, useMemo, useRef } from "react";
import classNames from "classnames";
import { useInView } from "motion/react";

type SplitMode = "letters" | "words";

type RawProps<T extends ElementType> = {
  as?: T;
  text: string;
  split?: SplitMode;
  className?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
};

type Props<T extends ElementType> = React.HTMLAttributes<HTMLElement> &
  RawProps<T>;

type TextAnimationStyle = React.CSSProperties & {
  "--text-animation-duration"?: string;
  "--text-animation-delay"?: string;
  "--text-animation-stagger"?: string;
  "--text-animation-index"?: number;
};

type Item =
  | {
      type: "space";
      key: string;
      value: string;
    }
  | {
      type: "word";
      key: string;
      value: string;
      index: number;
    }
  | {
      type: "letters";
      key: string;
      letters: {
        key: string;
        value: string;
        index: number;
      }[];
    };

const normalizeText = (text: string) => {
  return text
    .replace(/&nbsp;/g, "\u00A0")
    .replace(/&#160;/g, "\u00A0")
    .replace(/&#8239;/g, "\u202F");
};

const splitText = (text: string) => normalizeText(text).split(/([ \t\r\n]+)/);

const createItems = (text: string, split: SplitMode): Item[] => {
  const tokens = splitText(text);
  let index = 0;

  return tokens.reduce<Item[]>((acc, token, tokenIndex) => {
    if (!token) {
      return acc;
    }

    if (/^[ \t\r\n]+$/.test(token)) {
      acc.push({
        type: "space",
        key: `space-${tokenIndex}`,
        value: token,
      });

      return acc;
    }

    if (split === "words") {
      acc.push({
        type: "word",
        key: `word-${tokenIndex}`,
        value: token,
        index,
      });

      index += 1;

      return acc;
    }

    acc.push({
      type: "letters",
      key: `letters-${tokenIndex}`,
      letters: Array.from(token).map((letter, letterIndex) => {
        const item = {
          key: `letter-${tokenIndex}-${letterIndex}`,
          value: letter,
          index,
        };

        index += 1;

        return item;
      }),
    });

    return acc;
  }, []);
};

export const TextAnimation = <T extends ElementType = "div">({
  as,
  text,
  split = "words",
  className,
  stagger = 0.02,
  delay = 0,
  duration = 0.4,
  once = false,
  amount = 0.4,
  style,
  ...props
}: Props<T>) => {
  const Tag = (as || "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once, amount });

  const items = useMemo(() => createItems(text, split), [text, split]);

  const rootClassName = classNames(
    "text-animation",
    {
      "text-animation-split-letters": split === "letters",
      "text-animation-split-words": split === "words",
      "is-in-view": isInView,
    },
    className,
  );

  const rootStyle: TextAnimationStyle = {
    ...style,
    "--text-animation-duration": `${duration}s`,
    "--text-animation-delay": `${delay}s`,
    "--text-animation-stagger": `${stagger}s`,
  };

  return (
    <Tag {...props} ref={ref} className={rootClassName} style={rootStyle}>
      {items.map((item) => {
        if (item.type === "space") {
          return <React.Fragment key={item.key}>{item.value}</React.Fragment>;
        }

        if (item.type === "word") {
          return (
            <span className="text-animation-wrap" key={item.key}>
              <span
                className="text-animation-item"
                style={
                  {
                    "--text-animation-index": item.index,
                  } as TextAnimationStyle
                }>
                {item.value}
              </span>
            </span>
          );
        }

        return (
          <span className="text-animation-word" key={item.key}>
            {item.letters.map((letter) => (
              <span className="text-animation-wrap" key={letter.key}>
                <span
                  className="text-animation-item"
                  style={
                    {
                      "--text-animation-index": letter.index,
                    } as TextAnimationStyle
                  }>
                  {letter.value}
                </span>
              </span>
            ))}
          </span>
        );
      })}
    </Tag>
  );
};
