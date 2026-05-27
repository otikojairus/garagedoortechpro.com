import Link from "next/link";
import { BLOG_POSTS, CITY_PAGES, PHONE_DISPLAY, SERVICE_HUBS, SITE_NAME, cityFromTargetArea, toPath } from "@/lib/site-data";

export default function HomePage() {
  return (
    <main className="pulse-main">
      <section className="pulse-hero">
        <div className="pulse-wrap pulse-hero-grid">
          <div className="pulse-hero-copy">
            <p className="pulse-kicker">24/7 Garage Door Specialists Across Canada</p>
            <h1>Fast, Skilled Garage Door Help Without The Runaround</h1>
            <p className="pulse-lead">
              {SITE_NAME} connects homeowners and property managers with repair-first diagnostics, honest recommendations,
              and rapid dispatch pathways for garage door failures, opener issues, and replacement planning.
            </p>
            <div className="pulse-actions">
              <a className="pulse-call" href={`tel:${PHONE_DISPLAY.replace(/[^0-9]/g, "")}`}>
                Call {PHONE_DISPLAY}
              </a>
              <Link className="pulse-btn" href="/services">
                View All Services
              </Link>
            </div>
            <div className="pulse-badge-row">
              <span className="pulse-badge">Same-Day Options</span>
              <span className="pulse-badge">Spring + Opener Experts</span>
              <span className="pulse-badge">Residential & Commercial</span>
            </div>
          </div>

          <aside className="pulse-hero-showcase">
            <div className="pulse-hero-orb pulse-hero-orb-a" />
            <div className="pulse-hero-orb pulse-hero-orb-b" />
            <div className="pulse-hero-panel pulse-hero-panel-main">
              <p className="pulse-kicker">Dispatch Snapshot</p>
              <h3>Live Triage Workflow</h3>
              <ul className="pulse-list-check">
                <li>Issue typed in under 2 minutes</li>
                <li>Safety guidance shared immediately</li>
                <li>Best-fit service route confirmed</li>
              </ul>
            </div>
            <div className="pulse-hero-stat-grid">
              <div className="pulse-hero-stat">
                <strong>196</strong>
                <span>Location pages</span>
              </div>
              <div className="pulse-hero-stat">
                <strong>24/7</strong>
                <span>Emergency pathways</span>
              </div>
              <div className="pulse-hero-stat">
                <strong>4-Step</strong> 
                <span>Structured service flow</span>
              </div>
              <div className="pulse-hero-stat">
                <strong>1 Call</strong>
                <span>To get next action</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="pulse-trust-band">
        <div className="pulse-wrap pulse-trust-wrap">
          <div className="pulse-trust-list">
            <article className="pulse-trust-item">
              <strong>Straight Answers</strong>
              <span>No confusing language during diagnosis.</span>
            </article>
            <article className="pulse-trust-item">
              <strong>Repair-First Mindset</strong>
              <span>Replace only when repair is not practical.</span>
            </article>
            <article className="pulse-trust-item">
              <strong>Safety-Led Steps</strong>
              <span>Immediate guidance before arrival.</span>
            </article>
            <article className="pulse-trust-item">
              <strong>City-Specific Support</strong>
              <span>Localized pages for better relevance.</span>
            </article>
          </div>
        </div>
      </section>

      <section className="pulse-section">
        <div className="pulse-wrap">
          <h2>How Service Flows From Call To Completion</h2>
          <div className="pulse-grid pulse-grid-2 pulse-process">
            <article className="pulse-card pulse-step">
              <h3>Issue Intake</h3>
              <p>We gather symptom details, urgency level, and door/opener context in under a few minutes.</p>
            </article>
            <article className="pulse-card pulse-step">
              <h3>Route Matching</h3>
              <p>You get matched to the right repair, replacement, or install pathway based on risk and timeline.</p>
            </article>
            <article className="pulse-card pulse-step">
              <h3>On-Site Work</h3>
              <p>Technicians diagnose root causes, not surface symptoms, then explain practical options clearly.</p>
            </article>
            <article className="pulse-card pulse-step">
              <h3>Verification + Follow-Up</h3>
              <p>Door balance, travel limits, safety sensors, and opener response are checked before closeout.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="pulse-section">
        <div className="pulse-wrap">
          <h2>Featured Service Hubs</h2>
          <p className="pulse-lead">Start with these high-intent pages when you need fast direction.</p>
          <div className="pulse-grid pulse-grid-3">
            {SERVICE_HUBS.slice(0, 9).map((page, index) => (
              <Link className={`pulse-card ${index % 2 === 0 ? "pulse-card-accent" : ""}`} key={page.pageSlug} href={toPath(page.pageSlug)}>
                <h3>{page.pageTitle.replace(/\s*\|.*/, "")}</h3>
                <p>{page.primaryKeyword}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pulse-section">
        <div className="pulse-wrap">
          <h2>Top City Coverage</h2>
          <p className="pulse-lead">Pick your city to view targeted service availability and intent-specific pages.</p>
          <div className="pulse-grid pulse-grid-4">
            {CITY_PAGES.slice(0, 24).map((page) => (
              <Link className="pulse-chip" key={page.pageSlug} href={toPath(page.pageSlug)}>
                {cityFromTargetArea(page.targetArea)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pulse-section">
        <div className="pulse-wrap">
          <h2>Guides That Help You Decide Faster</h2>
          <div className="pulse-grid pulse-grid-2">
            {BLOG_POSTS.slice(0, 8).map((page) => (
              <Link className="pulse-card" key={page.pageSlug} href={toPath(page.pageSlug)}>
                <h3>{page.pageTitle}</h3>
                <p>Clear, practical guidance before you book service.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
