import { ILink } from "@/shared/model/types";
import Link from "@/shared/ui/Link";

export type RawProps = {
  rights: string;
  menuLinks: ILink[];
};

type Props = React.HTMLAttributes<HTMLElement> & RawProps;

export const Footer = ({ menuLinks, rights }: Props) => {
  return (
    <footer className="footer">
      <div className="wrapper footer__wrapper">
        <p className="footer__rights text-m">{rights}</p>
        <ul className="footer__nav list-unstyled">
          {menuLinks &&
            menuLinks.length > 0 &&
            menuLinks.map((link) => (
              <li key={link.href} className="footer__nav-item">
                <Link href={link.href} className="footer__nav-link link text-m">
                  {link.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </footer>
  );
};
