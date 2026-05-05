import { IPrice, Price } from "@/shared/ui/Price";
import classNames from "classnames";
import Reveal from "@/shared/ui/Reveal";

export type RawProps = {
  items?: IPrice[];
  memo?: string[];
};

type Props = React.HTMLAttributes<HTMLDivElement> & RawProps;

const PRICE_GROUPS = [
  {
    type: "group",
    title: "Групповые занятия",
  },
  {
    type: "single",
    title: "Персональные занятия",
  },
  {
    type: "once",
    title: "Разовое посещение",
  },
  {
    type: "subscription",
    title: "Абонементы*",
  },
] as const;

export const PriceGroups = ({ items, memo, className, ...props }: Props) => {
  const groupedItems = (items ?? []).reduce<
    Record<NonNullable<IPrice["type"]>, IPrice[]>
  >(
    (acc, item) => {
      if (!item.type) return acc;

      acc[item.type].push(item);
      return acc;
    },
    {
      group: [],
      single: [],
      subscription: [],
      once: [],
    },
  );
  if (!groupedItems && (!memo || memo.length === 0)) {
    return null;
  }

  return (
    <div {...props} className={classNames("price-groups", className)}>
      {groupedItems && (
        <div className="price-groups__list">
          {PRICE_GROUPS.map(({ type, title }) => {
            const groupItems = groupedItems[type];

            if (!groupItems.length) {
              return null;
            }

            return (
              <div key={type} className="price-groups__group">
                <h3 className="price-groups__title h5"> {title} </h3>

                <ul className="list-unstyled price-groups__items">
                  {groupItems.map((item, i) => (
                    <li key={`${type}-${i}`} className="price-groups__item">
                      <Reveal>
                        <Price {...item} />
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {memo && memo.length > 0 && (
        <div className="price-groups__memo">
          {memo.map((item, i) => (
            <p className="text-m price-groups__memo-item" key={i}>
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
