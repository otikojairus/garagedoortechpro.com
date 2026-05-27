import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PHONE_DISPLAY, SEO_PAGES, SITE_NAME, absoluteUrl, bySlug, cityFromTargetArea, relatedPages, toPath } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400;

export async function generateStaticParams() {
  return SEO_PAGES
    .map((page) => page.pageSlug.replace(/^\//, ""))
    .filter((slug) => !slug.includes("/"))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = bySlug(slug);
  if (!page) return { title: "Page Not Found" };

  return {
    title: page.pageTitle,
    description: `${page.pageTitle}. ${page.ctaStrategy}.`,
    alternates: { canonical: toPath(page.pageSlug) },
    keywords: [page.primaryKeyword],
    openGraph: {
      title: `${page.pageTitle} | ${SITE_NAME}`,
      description: `${page.pageTitle}. ${page.searchIntent}.`,
      url: absoluteUrl(toPath(page.pageSlug)),
      type: "article",
      siteName: SITE_NAME,
    },
  };
}

export default async function DynamicSeoPage({ params }: Props) {
  const { slug } = await params;
  const page = bySlug(slug);
  if (!page) notFound();

  const city = cityFromTargetArea(page.targetArea);
  const related = relatedPages(page, 16);

  return (
    <main className="pulse-main pulse-section">
      <div className="pulse-wrap">
        <p className="pulse-kicker">{page.pageType}</p>
        <h1>{page.pageTitle}</h1>
        <p>
          When something feels off with your garage door, spring system, or opener, fast answers matter. Our approach is built
          around calm guidance, careful troubleshooting, and clear explanations so you know exactly what is happening
          and what your options are before any work moves forward.
        </p>
        <p>
          In {city}, we support homeowners, landlords, and business operators who need dependable service without vague
          promises. You get practical recommendations based on site conditions, timelines that make sense for your
          situation, and a process that prioritizes safety at every stage.
        </p>

        <div className="pulse-actions">
          <a className="pulse-call" href={`tel:${PHONE_DISPLAY.replace(/[^0-9]/g, "")}`}>
            Call {PHONE_DISPLAY}
          </a>
          <Link className="pulse-btn" href="/services">
            Compare Services
          </Link>
        </div>

        <section className="pulse-detail">
          <h2>How We Handle The Visit</h2>
          <div className="pulse-grid pulse-grid-2">
            <article className="pulse-card">
              <h3>1. Call Intake And Immediate Safety Guidance</h3>
              <p>
                We begin by understanding what you are seeing or hearing, then walk you through immediate
                next steps so the property stays as safe as possible until arrival.
              </p>
            </article>
            <article className="pulse-card">
              <h3>2. On-Site Diagnosis</h3>
              <p>
                The technician validates symptoms, checks springs, tracks, rollers, cables, and opener components, and identifies the likely source
                of the problem before discussing repair options.
              </p>
            </article>
            <article className="pulse-card">
              <h3>3. Repair Or Corrective Work</h3>
              <p>
                Work is completed based on the diagnosed issue and site requirements, with updates provided in plain
                language so there are no surprises mid-service.
              </p>
            </article>
            <article className="pulse-card">
              <h3>4. Verification And Next-Step Plan</h3>
              <p>
                We confirm final system behavior, explain what was completed, and share clear follow-up guidance for
                long-term reliability.
              </p>
            </article>
          </div>
        </section>

        <section className="pulse-detail">
          <h2>What This Page Helps You Understand</h2>
          <ul>
            <li>Situation review and what to do first before technician arrival.</li>
            <li>Repair pathway and how recommendations are explained.</li>
            <li>Timing expectations for urgent and non-urgent requests.</li>
            <li>How follow-up support works after the initial visit.</li>
            <li>How service scope can differ across older and newer garage door setups.</li>
            <li>What to ask during a quote so decisions stay practical and informed.</li>
          </ul>
        </section>

        <section className="pulse-detail">
          <h2>Why People In {city} Use This Service</h2>
          <div className="pulse-grid pulse-grid-3">
            <article className="pulse-card">
              <h3>Clear Communication</h3>
              <p>
                You get straightforward updates instead of technical jargon, so every step from diagnosis to completion
                is easy to follow.
              </p>
            </article>
            <article className="pulse-card">
              <h3>Practical Recommendations</h3>
              <p>
                Advice is based on your property needs, urgency, and budget priorities rather than one-size-fits-all
                suggestions.
              </p>
            </article>
            <article className="pulse-card">
              <h3>Local Context</h3>
              <p>
                Service planning considers local layouts, building types, and usage patterns so outcomes are realistic
                for your specific setting.
              </p>
            </article>
          </div>
        </section>

        {related.length > 0 && (
          <section className="pulse-detail">
            <h2>Related Locations</h2>
            <div className="pulse-grid pulse-grid-4">
              {related.map((item) => (
                <Link key={item.pageSlug} href={toPath(item.pageSlug)} className="pulse-chip">
                  {cityFromTargetArea(item.targetArea)}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
