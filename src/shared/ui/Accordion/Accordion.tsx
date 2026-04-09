import React, { useId, useMemo, useState } from "react";
import classNames from "classnames";
import { mergeRefs } from "@/shared/lib/merge-refs";

export type AccordionItemType = {
  id: number | string;
  title: string;
  content: React.ReactNode;
};

export type RawProps = {
  items: AccordionItemType[];
  defaultActiveId?: AccordionItemType["id"] | null;
  allowMultiple?: boolean;
};

type Props = React.HTMLAttributes<HTMLElement> &
  RawProps & {
    ref?: React.RefObject<HTMLElement | null>;
  };

export const Accordion = ({
  items,
  defaultActiveId = null,
  allowMultiple = false,
  className,
  ref,
  ...props
}: Props) => {
  const localId = useId();
  const [activeIds, setActiveIds] = useState<Array<AccordionItemType["id"]>>(
    defaultActiveId !== null ? [defaultActiveId] : [],
  );

  const normalizedItems = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        buttonId: `${localId}-button-${item.id}-${index}`,
        panelId: `${localId}-panel-${item.id}-${index}`,
      })),
    [items, localId],
  );

  const handleToggle = (id: AccordionItemType["id"]) => {
    setActiveIds((prev) => {
      const isActive = prev.includes(id);

      if (allowMultiple) {
        if (isActive) {
          return prev.filter((itemId) => itemId !== id);
        }

        return [...prev, id];
      }

      if (isActive) {
        return [];
      }

      return [id];
    });
  };

  return (
    <div
      {...props}
      className={classNames("accordion", className)}
      ref={mergeRefs([ref])}>
      <div className="accordion__list">
        {normalizedItems.map((item) => {
          const isActive = activeIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={classNames("accordion__item", {
                "accordion__item--active": isActive,
              })}>
              <h3 className="accordion__heading">
                <button
                  id={item.buttonId}
                  type="button"
                  className="accordion__button"
                  aria-expanded={isActive}
                  aria-controls={item.panelId}
                  onClick={() => handleToggle(item.id)}>
                  <span className="accordion__title text-m">{item.title}</span>
                  <span className="accordion__icon text-m" aria-hidden="true" />
                </button>
              </h3>

              <div
                id={item.panelId}
                className="accordion__panel"
                role="region"
                aria-labelledby={item.buttonId}>
                <div className="accordion__content">
                  <div className="accordion__content-inner">{item.content}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
