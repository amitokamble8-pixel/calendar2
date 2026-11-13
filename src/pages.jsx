/* ==================================================================
   pages.jsx — one component per route.
   ================================================================== */
import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  PROFILE, EXPERIENCE, PROJECTS, AWARDS, ARTICLES, VOLUNTEER, SPORTS,
  SKILLS, EDUCATION, TEST_SCORES, GALLERY,
} from "./data";
import {
  Reveal, SectionHead, PageHead, SubHead, MoreLink, Tag, TagList, usePageMeta, Gallery,
  ExperienceCard, ProjectCard, AwardRow, ArticleRow, SkillsPanel,
  EducationCard, ScoreCard,
  GitHubIcon, Arrow, BackArrow, MailIcon, LinkedInIcon, PhoneIcon,
  DownloadIcon, ExternalIcon,
} from "./ui";

const SITE = "Aansh Yadav";

/* ---------------- home ---------------- */

const Hero = () => (
  <section className="hero">
    <div className="hero-inner">
      <p className="hero-eyebrow">{PROFILE.location}</p>

      <h1 className="hero-name">
        <span className="ln-1">{PROFILE.first}</span>
        <span className="ln-2">{PROFILE.last}</span>
      </h1>

      <p className="hero-tag">{PROFILE.tagline}</p>
      <p className="hero-bio">{PROFILE.bio[0]}</p>

      <div className="cta-row">
        <Link className="btn btn-primary" to="/work">Experience <Arrow /></Link>
        {PROFILE.cv && (
          <a className="btn btn-ghost" href={PROFILE.cv} download>Download CV<DownloadIcon /></a>
        )}
        {PROFILE.email && (
          <a className="btn btn-ghost" href={`mailto:${PROFILE.email}`}>Email<MailIcon size={16} /></a>
        )}
      </div>
    </div>
  </section>
);

const ConnectPanel = () => (
  <Reveal>
    <div className="connect">
      <h2 className="connect-title">Let's Connect</h2>
      <p>
        For coding projects, technology competitions, MUN conferences or music performances, or just to talk
        about programming, AI, chess or the tabla — I'd love to hear from you.
      </p>
      <div className="cta-row">
        <Link className="btn btn-primary" to="/contact">Get in Touch <Arrow /></Link>
        <Link className="btn btn-ghost" to="/awards">See Achievements</Link>
      </div>
    </div>
  </Reveal>
);

export function Home() {
  usePageMeta(
    `${SITE} | Aspiring Robotics & Drone Engineer • National Footballer • FRC Rookie All-Star`,
    "Junior at Bergen County Academies — machine learning researcher, cofounder of the BCA Machine Learning Club, and builder of a wearable diagnostic device for Parkinsonian motor symptoms."
  );
  return (
    <>
      <Hero />

      <section className="section">
        <SectionHead title="Awards & Recognitions" eyebrow="Recognised Excellence" />
        <div className="row-list">
          {AWARDS.filter((a) => a.featured).slice(0, 4).map((a, i) => (
            <Reveal key={a.title} delay={i * 60}><AwardRow a={a} /></Reveal>
          ))}
        </div>
        <MoreLink to="/awards">Every Awards & Recognitions</MoreLink>
      </section>

      <section className="section">
        <SectionHead title="Activities" eyebrow="Communication • Discipline • Teamwork" />
        <div className="grid-2">
          {EXPERIENCE.filter((e) => e.featured).slice(0, 2).map((e, i) => (
            <Reveal key={e.slug} delay={i * 90}><ExperienceCard e={e} /></Reveal>
          ))}
        </div>
        <MoreLink to="/work">More about Activities</MoreLink>
      </section>

      <section className="section">
        <SectionHead title="Featured Projects" eyebrow="What I've Created" />
        <div className="grid-2">
          {PROJECTS.filter((p) => p.featured).map((p, i) => (
            <Reveal key={p.name} delay={i * 90}><ProjectCard p={p} /></Reveal>
          ))}
        </div>
        <MoreLink to="/projects">More about Featured Projects</MoreLink>
      </section>

      <section className="section">
        <SectionHead
          title="Skills"
          eyebrow={SKILLS.map((s) => s.group).join(" · ")}
        />
        <Reveal><SkillsPanel groups={SKILLS} /></Reveal>
      </section>

      <section className="section">
        <SectionHead title="Areas of Interest" eyebrow="What I'm Interested In" />
        <div className="row-list">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.title} delay={i * 60}><ArticleRow a={a} /></Reveal>
          ))}
        </div>
        <MoreLink to="/publications">More about Areas of Interest</MoreLink>
      </section>

      <section className="section">
        <SectionHead title="Future Directions" eyebrow="Growth & Goals" />
        <Reveal>
          <div className="vol-panel">
            <div className="vol-stats">
              {VOLUNTEER.stats.map((s) => (
                <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>
              ))}
            </div>
            <div className="vol-orgs">
              {VOLUNTEER.orgs.map((o) => <span key={o.name} className="vol-chip">{o.name}</span>)}
            </div>
          </div>
        </Reveal>
        <MoreLink to="/volunteering">More about Future Directions</MoreLink>
      </section>

      <section className="section"><ConnectPanel /></section>
    </>
  );
}

/* ---------------- about ---------------- */

export function About() {
  usePageMeta(
    `About | ${SITE}`,
    "Background, education, and standardized test scores."
  );
  return (
    <section className="section">
      <PageHead title="About" eyebrow="Aspiring Computer Scientist" />

      <Reveal>
        <div className="about-split">
          <div className="prose">
            {PROFILE.bio.map((para, i) => <p key={i}>{para}</p>)}
          </div>
          {PROFILE.aboutPhoto && (
            <figure className="about-photo">
              <img src={PROFILE.aboutPhoto} alt="" />
            </figure>
          )}
        </div>
      </Reveal>

      <SubHead title="Education" eyebrow="Noida, India" />
      <div className="stack">
        {EDUCATION.map((e, i) => (
          <Reveal key={e.level + e.dates} delay={i * 70}><EducationCard e={e} /></Reveal>
        ))}
      </div>

      <SubHead title="Academic Honours" />
      <div className="stack">
        {TEST_SCORES.map((s, i) => (
          <Reveal key={s.exam} delay={i * 70}><ScoreCard s={s} /></Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- list pages ---------------- */

export function Work() {
  usePageMeta(`Activities | ${SITE}`, "Work experience and professional roles.");
  return (
    <section className="section">
      <PageHead title="Activities" eyebrow="Communication • Discipline • Teamwork" />
      <div className="grid-2">
        {EXPERIENCE.map((e, i) => (
          <Reveal key={e.slug} delay={i * 70}><ExperienceCard e={e} showBullets /></Reveal>
        ))}
      </div>
    </section>
  );
}

export function WorkDetail() {
  const { slug } = useParams();
  const e = EXPERIENCE.find((x) => x.slug === slug);
  usePageMeta(e ? `${e.role} — ${e.org} | ${SITE}` : `Not found | ${SITE}`);
  if (!e) return <Navigate to="/work" replace />;

  return (
    <section className="section">
      <Link className="back-link" to="/work"><BackArrow /> Back to Activities</Link>

      <header className="detail-head">
        <h1>{e.role}</h1>
        <p className="detail-org">{e.org}</p>
        <div className="detail-meta">
          <span>{e.badge}</span>
          <span className="dot-sep">·</span>
          <span>{e.dates}</span>
          <span className="dot-sep">·</span>
          <span>{e.location}</span>
        </div>
      </header>

      <Reveal>
        <div className="detail-panel">
          <h2>Overview</h2>
          <p>{e.desc}</p>

          {e.bullets && (
            <>
              <h2>Key contributions</h2>
              <ul className="bullets">
                {e.bullets.map((b) => <li key={b}><span className="bullet-arrow">→</span>{b}</li>)}
              </ul>
            </>
          )}

          <h2>Areas &amp; skills</h2>
          <div className="tags centered">{e.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>

          <Gallery images={e.images} head={<h2>Photos</h2>} />
        </div>
      </Reveal>
    </section>
  );
}

export function Projects() {
  usePageMeta(`Featured Projects | ${SITE}`, "Research and software projects, from wearable diagnostics to mobile applications.");
  return (
    <section className="section">
      <PageHead title="Featured Projects" eyebrow="What I've Created" />
      <div className="grid-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={i * 70}><ProjectCard p={p} /></Reveal>
        ))}
      </div>
    </section>
  );
}

export function Awards() {
  usePageMeta(`Achievements | ${SITE}`, "Research awards, competition results, and academic honors.");
  return (
    <section className="section">
      <PageHead title="Awards & Recognitions" eyebrow="Recognised Excellence" />
      <div className="row-list">
        {AWARDS.map((a, i) => (
          <Reveal key={a.title} delay={i * 55}><AwardRow a={a} /></Reveal>
        ))}
      </div>
    </section>
  );
}

export function Publications() {
  usePageMeta(`Areas of Interest | ${SITE}`, "Areas of research and technical interest.");
  return (
    <section className="section">
      <PageHead title="Areas of Interest" eyebrow="What I'm Interested In" />
      <div className="row-list">
        {ARTICLES.map((a, i) => (
          <Reveal key={a.title} delay={i * 60}><ArticleRow a={a} /></Reveal>
        ))}
      </div>

      <SubHead title="Skills" eyebrow={SKILLS.map((s) => s.group).join(" · ")} />
      <Reveal><SkillsPanel groups={SKILLS} /></Reveal>
    </section>
  );
}

export function Volunteering() {
  usePageMeta(`Future Directions | ${SITE}`, "Founding a machine learning club, teaching summer band, and community volunteering.");
  return (
    <section className="section">
      <PageHead title="Future Directions" eyebrow="Growth & Goals" />
      <Reveal>
        <div className="vol-panel">
          <div className="vol-stats">
            {VOLUNTEER.stats.map((s) => (
              <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="grid-2 spaced">
        {VOLUNTEER.orgs.map((o, i) => (
          <Reveal key={o.name} delay={i * 80}>
            <article className="card">
              <h3>{o.name}</h3>
              <p className="card-org">{o.role}</p>
              <p className="card-desc">{o.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* Route stays /sports; the content is music, ensembles, and competitions. */
export function Sports() {
  usePageMeta(`Personal Interests | ${SITE}`, "Marching band, saxophone ensemble, concert band, hackathons, and game jams.");
  return (
    <section className="section">
      <PageHead title="Personal Interests" eyebrow="Extracurricular Activities" />
      <div className="grid-2 tight">
        {SPORTS.map((s, i) => (
          <Reveal key={s.name} delay={i * 70}>
            {s.link ? (
              <a className="sport-card" href={s.link} target="_blank" rel="noopener noreferrer">
                <span className="sport-ico">{s.icon}</span>
                <h4>{s.name}</h4>
                <p>{s.desc}</p>
              </a>
            ) : (
              <article className="sport-card">
                <span className="sport-ico">{s.icon}</span>
                <h4>{s.name}</h4>
                <p>{s.desc}</p>
                <Gallery images={s.images} compact />
              </article>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- contact ---------------- */

export function Contact() {
  const ghHandle = PROFILE.socials.github?.split("/").filter(Boolean).pop();
  usePageMeta(`Contact | ${SITE}`, "Get in touch about research collaborations, internships, or opportunities.");
  return (
    <section className="section">
      <PageHead
        title="Get in touch"
        eyebrow="Open to collaboration"
        lead="For research collaborations, internships, or opportunities."
      />
      <Reveal>
        <div className="contact-grid">
          {PROFILE.email && (
            <a className="contact-card" href={`mailto:${PROFILE.email}`}>
              <MailIcon size={22} />
              <div><h4>Email</h4><p>{PROFILE.email}</p></div>
            </a>
          )}
          {PROFILE.phone && (
            <a className="contact-card" href={`tel:${PROFILE.phone.replace(/[^\d+]/g, "")}`}>
              <PhoneIcon size={22} />
              <div><h4>Phone</h4><p>{PROFILE.phone}</p></div>
            </a>
          )}
          {PROFILE.socials.linkedin && (
            <a className="contact-card" href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon size={22} />
              <div><h4>LinkedIn</h4><p>Professional updates</p></div>
            </a>
          )}
          {PROFILE.socials.github && (
            <a className="contact-card" href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon size={22} />
              <div><h4>GitHub</h4><p>@{ghHandle}</p></div>
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- 404 ---------------- */

export function NotFound() {
  usePageMeta(`Page not found | ${SITE}`);
  return (
    <section className="section notfound">
      <h1>404</h1>
      <p>That page doesn't exist. It may have been renamed or moved.</p>
      <div className="cta-row">
        <Link className="btn btn-primary" to="/">Back to home <Arrow /></Link>
      </div>
    </section>
  );
}