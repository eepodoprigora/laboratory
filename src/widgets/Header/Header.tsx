import { useScrollToSection } from "@/shared/lib/use-scroll-to-section";
import { useHeaderColorStore } from "@/shared/model/header-color";
import { ILink, ImageShape } from "@/shared/model/types";
import Button from "@/shared/ui/Button";
import Link from "@/shared/ui/Link";
import classNames from "classnames";

type RawProps = {
  logo?: ImageShape | null;
  menuLinks?: ILink[];
  ctaLink?: ILink;
};

type Props = React.HTMLAttributes<HTMLElement> & RawProps;

export const Header = ({ logo, menuLinks, ctaLink }: Props) => {
  const headerClass = useHeaderColorStore((s) => s.headerClass);

  const { scrollToSection } = useScrollToSection({
    offset: 50,
  });
  return (
    <header className={classNames("header", headerClass)}>
      <div className="wrapper header__wrapper">
        {logo && (
          <Link href={"/"} className="header__logo text-xl" isLogo>
            <span className="header__logo-image"></span>
          </Link>
        )}
        {menuLinks && (
          <ul className="list-unstyled header__list">
            {menuLinks.map((item) => (
              <li key={item.href} className="header__list-item">
                <button
                  className="link"
                  onClick={() => scrollToSection(item.href)}>
                  <span className="link__container">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {ctaLink && (
          <Button
            className="header__button"
            text={ctaLink?.name}
            tag="a"
            icon="arrow-right"
            href={ctaLink.href}
            variant="header"
            isExternal
          />
        )}
      </div>
    </header>
  );
};
