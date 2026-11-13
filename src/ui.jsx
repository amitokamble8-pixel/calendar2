/* ==================================================================
   ui.jsx — icons, small primitives, and reusable cards.
   ================================================================== */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ---------------- icons ---------------- */

const Ico = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

export const GitHubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 20c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19 5.8a4.9 4.9 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.7 12.7 0 0 0-6.8 0C5.8 1.9 4.7 2.2 4.7 2.2A4.9 4.9 0 0 0 4.6 5.8 5.2 5.2 0 0 0 3.2 9.4c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V23"/>
  </svg>
);

export const LinkedInIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05A4.2 4.2 0 0 1 16.6 8.7c4 0 4.7 2.5 4.7 5.8V21h-4v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21H9Z"/>
  </svg>
);

export const PhoneIcon = ({ size = 18 }) => (
  <Ico size={size} d={<><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></>} />
);

export const Chevron = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
       strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6, opacity: 0.7 }}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const Arrow = ({ size = 15 }) => (
  <Ico size={size} d={<><path d="M5 12h14M13 6l6 6-6 6"/></>} />
);

export const BackArrow = ({ size = 14 }) => (
  <Ico size={size} d={<><path d="M19 12H5M11 18l-6-6 6-6"/></>} />
);

export const DownloadIcon = ({ size = 15 }) => (
  <Ico size={size} d={<><path d="M12 3v12M7 11l5 5 5-5M4 21h16"/></>} />
);

export const ExternalIcon = ({ size = 13 }) => (
  <Ico size={size} d={<><path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></>} />
);

export const MailIcon = ({ size = 18 }) => (
  <Ico size={size} d={<><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 6.5 9 6.5 9-6.5"/></>} />
);

/* ---------------- primitives ---------------- */

export function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShown(true),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal${shown ? " in" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* Sets <title> and the meta description for each route. */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}

/* Serif title on the left, optional mono eyebrow on the right, hairline below. */
export const SectionHead = ({ title, eyebrow }) => (
  <>
    <div className="sec-head">
      <h2>{title}</h2>
      {eyebrow && <span className="sec-eyebrow">{eyebrow}</span>}
    </div>
    <hr className="sec-rule" />
  </>
);

export const PageHead = ({ title, eyebrow, lead }) => (
  <>
    <header className="page-head">
      <div className="sec-head">
        <h1>{title}</h1>
        {eyebrow && <span className="sec-eyebrow">{eyebrow}</span>}
      </div>
      {lead && <p>{lead}</p>}
    </header>
    <hr className="sec-rule" />
  </>
);

/* Smaller heading used further down a page. */
export const SubHead = ({ title, eyebrow }) => (
  <>
    <div className="sub-head">
      <h2>{title}</h2>
      {eyebrow && <span className="sec-eyebrow">{eyebrow}</span>}
    </div>
    <hr className="sub-rule" />
  </>
);

/* "Every award →" style link that sits below a section. */
export const MoreLink = ({ to, children }) => (
  <Link className="more-link" to={to}>{children} <Arrow /></Link>
);

export const Tag = ({ children }) => <span className="tag">{children}</span>;

export const TagList = ({ items, max = 5, flush = false }) => {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? items : items.slice(0, max);
  const hidden = items.length - max;
  return (
    <div className={`tags${flush ? " flush" : ""}`}>
      {shown.map((t) => <Tag key={t}>{t}</Tag>)}
      {hidden > 0 && (
        <button
          type="button"
          className="tag tag-more"
          onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); setExpanded(!expanded); }}
        >
          {expanded ? "− less" : `+${hidden} more`}
        </button>
      )}
    </div>
  );
};

/* ---------------- images ---------------- */

/* Photo strip: slow auto-scroll that pauses on keyboard focus/touch, with
   captions and a click-to-enlarge lightbox.
   images: [{ src: "/images/x.jpg", alt?: "", caption?: "" }]
   - Files live in  public/images/  and are referenced as "/images/x.jpg"
     (same pattern as PROFILE.aboutPhoto).
   - Auto-scroll only runs when the images overflow the row (the set is
     repeated so it loops seamlessly). It is switched off for visitors who
     prefer reduced motion; they can still scroll by hand.
   - An image whose file is missing is hidden automatically; if none load,
     nothing renders (including `head`).
   - compact: smaller thumbnails, for use inside cards.
   - head: optional heading node, shown only when at least one image loads. */
export function Gallery({ images, compact = false, head = null }) {
  const [broken, setBroken] = useState({});
  const [open, setOpen] = useState(null);
  const [loop, setLoop] = useState(false);
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef(null);
  const items = (images || []).filter((im) => im && im.src && !broken[im.src]);
  const n = items.length;

  /* lightbox keyboard controls */
  useEffect(() => {
    if (open === null) return;
    const onKey = (ev) => {
      if (ev.key === "Escape") setOpen(null);
      if (ev.key === "ArrowRight") setOpen((i) => (i + 1) % n);
      if (ev.key === "ArrowLeft") setOpen((i) => (i - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, n]);

  /* Repeat the set (for a seamless loop) only when it overflows the row. */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const check = () => {
      const dup = el.querySelector("[data-dup='1']");
      const first = el.querySelector(".gallery-item");
      if (!dup || !first) { setLoop(el.scrollWidth > el.clientWidth + 1); return; }
      setLoop(dup.offsetLeft - first.offsetLeft > el.clientWidth);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [n, loop]);

  /* Auto-scroll. Paused while focused, touched, or lightbox is open (not on hover). */
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !loop) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const SPEED = compact ? 28 : 45; // pixels per second
    let raf;
    let last = null;
    let pos = el.scrollLeft;
    const step = (t) => {
      raf = requestAnimationFrame(step);
      if (last === null) last = t;
      const dt = Math.min(t - last, 64) / 1000;
      last = t;
      if (pausedRef.current || open !== null) return;
      const dup = el.querySelector("[data-dup='1']");
      const first = el.querySelector(".gallery-item");
      if (!dup || !first) return;
      const loopW = dup.offsetLeft - first.offsetLeft;
      if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft; // visitor scrolled by hand
      pos += SPEED * dt;
      if (pos >= loopW) pos -= loopW;
      el.scrollLeft = pos;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [loop, compact, open]);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  /* Render nothing until at least one image exists, but keep the <img> tags
     mounted while they load so onError can fire. */
  if (!(images || []).some((im) => im && im.src && !broken[im.src])) return null;

  const pause = () => { clearTimeout(resumeTimer.current); pausedRef.current = true; };
  const resume = () => { clearTimeout(resumeTimer.current); pausedRef.current = false; };
  const resumeLater = () => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { pausedRef.current = false; }, 2500);
  };

  const renderItem = (im, i, isDup) => (
    <figure
      className="gallery-item"
      key={(isDup ? "dup-" : "") + im.src}
      data-dup={isDup && i === 0 ? "1" : undefined}
      aria-hidden={isDup ? "true" : undefined}
    >
      <button
        type="button"
        className="gallery-btn"
        tabIndex={isDup ? -1 : undefined}
        onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); setOpen(i); }}
        aria-label={`Enlarge image${im.caption ? `: ${im.caption}` : ""}`}
      >
        <img
          src={im.src}
          alt={isDup ? "" : im.alt || im.caption || ""}
          onError={() => setBroken((b) => ({ ...b, [im.src]: true }))}
        />
      </button>
      {im.caption && <figcaption>{im.caption}</figcaption>}
    </figure>
  );

  const current = open !== null ? items[open] : null;

  return (
    <>
      {head}
      <div
        ref={trackRef}
        className={`gallery${compact ? " compact" : ""}`}
        onFocus={pause}
        onBlur={resume}
        onTouchStart={pause}
        onTouchEnd={resumeLater}
        onTouchCancel={resumeLater}
      >
        {items.map((im, i) => renderItem(im, i, false))}
        {loop && items.map((im, i) => renderItem(im, i, true))}
      </div>

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <button type="button" className="lightbox-close" aria-label="Close" onClick={() => setOpen(null)}>×</button>
          {n > 1 && (
            <button
              type="button" className="lightbox-nav prev" aria-label="Previous image"
              onClick={(ev) => { ev.stopPropagation(); setOpen((i) => (i - 1 + n) % n); }}
            >‹</button>
          )}
          <figure onClick={(ev) => ev.stopPropagation()}>
            <img src={current.src} alt={current.alt || current.caption || ""} />
            {current.caption && <figcaption>{current.caption}</figcaption>}
          </figure>
          {n > 1 && (
            <button
              type="button" className="lightbox-nav next" aria-label="Next image"
              onClick={(ev) => { ev.stopPropagation(); setOpen((i) => (i + 1) % n); }}
            >›</button>
          )}
        </div>
      )}
    </>
  );
}

/* ---------------- cards ---------------- */

export const ExperienceCard = ({ e, showBullets = false }) => (
  <Link className="card card-link" to={`/work/${e.slug}`}>
    <h3>{e.role}</h3>
    <p className="card-org">{e.org}</p>
    <span className="chip">{e.badge}</span>
    <p className="meta-line">{e.dates} · {e.location}</p>
    <p className="card-desc">{e.desc}</p>
    {showBullets && e.bullets && (
      <ul className="bullets small">
        {e.bullets.map((b) => <li key={b}><span className="bullet-arrow">→</span>{b}</li>)}
      </ul>
    )}
    <TagList items={e.tags} max={4} />
  </Link>
);

export const ProjectCard = ({ p }) => (
  <article className="card">
    <h3>{p.name}</h3>
    <p className="card-org">{p.org}</p>
    <span className="chip">{p.meta}</span>
    <p className="card-desc">{p.desc}</p>
    {p.bullets && (
      <ul className="bullets small">
        {p.bullets.map((b) => <li key={b}><span className="bullet-arrow">→</span>{b}</li>)}
      </ul>
    )}
    {(p.code || p.live) && (
      <div className="card-links">
        {p.code && <a href={p.code} target="_blank" rel="noopener noreferrer">Source <ExternalIcon /></a>}
        {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer">Live <ExternalIcon /></a>}
      </div>
    )}
    <Gallery images={p.images} compact />
    <TagList items={p.tags} max={4} />
  </article>
);

/* Awards render as hairline-separated rows, not cards. */
export const AwardRow = ({ a }) => {
  const inner = (
    <>
      <span className="award-ico">{a.icon}</span>
      <div>
        <h3 className="award-title">
          {a.title}
          {a.meta && <span className="award-meta">{a.meta}</span>}
          {a.link && <span className="ext-mark"><ExternalIcon /></span>}
        </h3>
        {a.detail && <p className="award-desc">{a.detail}</p>}
      </div>
    </>
  );
  return a.link ? (
    <a className="award-row" href={a.link} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <article className="award-row">{inner}</article>
  );
};

export const ArticleRow = ({ a }) => {
  const inner = (
    <div>
      <h3>{a.title}</h3>
      <span className="article-outlet">{a.outlet}</span>
      {a.date && <span className="article-date">{a.date}</span>}
    </div>
  );
  return a.link ? (
    <a className="article-row" href={a.link} target="_blank" rel="noopener noreferrer">
      {inner}<span className="ext-mark"><ExternalIcon size={15} /></span>
    </a>
  ) : (
    <article className="article-row">{inner}</article>
  );
};

/* Single bordered panel, one column per skill group. */
export const SkillsPanel = ({ groups }) => (
  <div className="skills-panel">
    {groups.map((g) => (
      <div className="skill-col" key={g.group}>
        <p className="skill-label">{g.group}</p>
        <ul className="skill-items">
          {g.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    ))}
  </div>
);

export const EducationCard = ({ e }) => (
  <article className="edu-card">
    <div className="edu-top">
      <h3>{e.school}</h3>
      <span className="edu-dates">{e.dates}</span>
    </div>
    <p className="edu-loc">{e.location}</p>
    <p className="edu-level">{e.level} · GPA {e.gpa}</p>
    {e.coursework?.length > 0 && (
      <>
        <p className="edu-label">Relevant coursework</p>
        <TagList items={e.coursework} max={12} flush />
      </>
    )}
  </article>
);

export const ScoreCard = ({ s }) => (
  <article className="score-card">
    <div className="score-head">
      <h3>{s.exam}</h3>
      <span className="edu-dates">{s.date}</span>
    </div>
    <div className="score-grid">
      {s.breakdown.map((b) => (
        <div key={b.label}>
          <span>{b.label}</span>
          <strong>{b.value}</strong>
        </div>
      ))}
    </div>
  </article>
);
