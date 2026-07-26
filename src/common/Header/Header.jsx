import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useScrollHeader } from "../../hooks/useScrollHeader";
import Button from "../Button/Button";
import "./Header.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Header({ onQuoteOpen }) {
  const isScrolled = useScrollHeader(80);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`header${isScrolled ? " scrolled" : ""}`}>
        <div className="header-inner">
          {/* Logo */}
          <Link
            to="/"
            className="header-logo"
            aria-label="Altera Interior - Home"
          >
            <img src="/assets/logo/altera-logo.png" alt="Altera Interior" style={{ height: "45px" }} />
          </Link>

          {/* Desktop Nav */}
          <nav className="header-nav" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <Button
              variant="secondary"
              size="sm"
              onClick={onQuoteOpen}
              id="header-quote-btn"
            >
              Get a Quote
            </Button>

            {/* Hamburger */}
            <button
              className={`hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <nav
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
        <div className="mobile-menu-cta">
          <Button
            variant="primary"
            onClick={() => {
              setMenuOpen(false);
              onQuoteOpen?.();
            }}
            id="mobile-quote-btn"
          >
            Get a Quote
          </Button>
        </div>
      </nav>
    </>
  );
}
