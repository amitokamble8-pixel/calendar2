/* ==================================================================
   layout.jsx — Navbar, Footer, ScrollToTop.
   ================================================================== */
import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { PROFILE, NAV, FOOTER_NAV, FOOTER_PROFILES } from "./data";
import { Chevron, DownloadIcon, ExternalIcon } from "./ui";

/* Jumps to the top whenever the route changes. */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Navbar() {
  const [open, setOpen] = useState(null);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => { setMobile(false); setOpen(null); }, [pathname]);
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const openMenu = (label) => {
    clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 250);
  };

  const isChildActive = (item) => item.children?.some((c) => c.to === pathname);

  return (
    <header className="nav-wrap">

      <nav className="pill">
        {NAV.map((item) =>
          item.children ? (
            <div
              key={item.label}
              className="pill-item"
              onMouseEnter={() => openMenu(item.label)}
              onMouseLeave={closeMenu}
            >
              <button
                className={`pill-link${isChildActive(item) ? " active" : ""}`}
                aria-expanded={open === item.label}
                onClick={() => setOpen(open === item.label ? null : item.label)}
              >
                {item.label}<Chevron />
              </button>
              {open === item.label && (
                <div className="dropdown">
                  {item.children.map((c) => (
                    <Link key={c.label} to={c.to}>{c.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => `pill-link${isActive ? " active" : ""}`}
            >
              {item.label}
            </NavLink>
          )
        )}
        {PROFILE.cv && (
          <>
            <span className="pill-divider" />
            <a className="pill-link cv" href={PROFILE.cv} download><DownloadIcon /> CV</a>
          </>
        )}
      </nav>

      <button className="burger" aria-label="Open menu" aria-expanded={mobile}
              onClick={() => setMobile((v) => !v)}>
        <span /><span /><span />
      </button>

      {mobile && (
        <div className="mobile-menu">
          {NAV.flatMap((i) => (i.children ? i.children : [i])).map((i) => (
            <NavLink key={i.label} to={i.to} end={i.to === "/"}>{i.label}</NavLink>
          ))}
          <NavLink to="/contact">Contact</NavLink>
          {PROFILE.cv && <a href={PROFILE.cv} download>Download CV</a>}
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const profiles = FOOTER_PROFILES.filter((p) => p.href);

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link className="brand footer-brand" to="/">
            {PROFILE.first} <span>{PROFILE.last}</span>
          </Link>
          <p className="footer-tag">{PROFILE.tagline}</p>
          <p className="footer-loc">{PROFILE.location}</p>
        </div>

        <div>
          <h5>Navigation</h5>
          {FOOTER_NAV.map((n) => <Link key={n.label} to={n.to}>{n.label}</Link>)}
        </div>

        {profiles.length > 0 && (
          <div>
            <h5>Profiles</h5>
            {profiles.map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer">
                {p.label} <ExternalIcon />
              </a>
            ))}
          </div>
        )}

        <div>
          <h5>Connect</h5>
          {PROFILE.email && <a href={`mailto:${PROFILE.email}`}>Email</a>}
          {PROFILE.phone && (
            <a href={`tel:${PROFILE.phone.replace(/[^\d+]/g, "")}`}>Phone</a>
          )}
          {PROFILE.socials.linkedin && (
            <a href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <ExternalIcon />
            </a>
          )}
          {PROFILE.socials.github && (
            <a href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer">
              GitHub <ExternalIcon />
            </a>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {PROFILE.fullName}. Built with React &amp; <span className="heart">♥</span></p>
      </div>
    </footer>
  );
}
