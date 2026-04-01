import { ILink, ImageShape } from "@/shared/model/types";
import Button from "@/shared/ui/Button";
import Link from "@/shared/ui/Link";
import classNames from "classnames";
import Image from "next/image";

type RawProps = {
  logo?: ImageShape | null;
  menuLinks?: ILink[];
  button?: string;
};

type Props = React.HTMLAttributes<HTMLElement> & RawProps;

export const Header = ({ logo, menuLinks, button }: Props) => {
  return (
    <header className={classNames("header")}>
      <div className="wrapper header__wrapper">
        {logo && (
          <a href={"/"} className="header__logo text-xl">
            <Image
              src={logo.src}
              fill
              alt={logo.alt ?? "Лаборатория стройности"}
              title={logo.title}
            />
          </a>
        )}
        {menuLinks && (
          <ul className="list-unstyled header__list">
            {menuLinks.map((item) => (
              <li key={item.href} className="header__list-item">
                <Link className="link" href={item.href}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <Button className="header__button" text={button} icon="arrow-right" />
      </div>
    </header>
  );
};
