import { FOOTER_LINKS, SITE } from "../../config/site.js";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <span className="footer__copy">
          © {new Date().getFullYear()} {SITE.name}
        </span>

        <nav className="footer__links" aria-label="Footer">
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} className="footer__link" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
