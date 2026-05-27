import Link from "next/link";
import { Metadata } from "next";
import { CITY_PAGES, SERVICE_HUBS, SITE_NAME, absoluteUrl, cityFromTargetArea, toPath } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Garage Door Services",
  description: "Browse all garage door repair, replacement, and installation service hubs.",
  alternates: { canonical: "/services" },
  openGraph: { title: `${SITE_NAME} Services`, description: "Main service index", url: absoluteUrl("/services") },
};

export default function ServicesPage() {
  return (
    <main className="pulse-main pulse-section">
      <div className="pulse-wrap">
        <p className="pulse-kicker">Service Directory</p>
        <h1>Choose The Right Garage Door Service Path</h1>
        <p className="pulse-lead">
          Every service hub is structured to help you move quickly: identify the issue type, compare likely fixes,
          and choose the right next call without second guessing.
        </p>

        <section className="pulse-grid pulse-grid-3">
          {SERVICE_HUBS.map((page, index) => (
            <Link className={`pulse-card ${index % 3 === 0 ? "pulse-card-accent" : ""}`} key={page.pageSlug} href={toPath(page.pageSlug)}>
              <h2>{page.pageTitle.replace(/\s*\|.*/, "")}</h2>
              <p>{page.searchIntent}</p>
            </Link>
          ))}
        </section>

        <section className="pulse-detail">
          <h2>How To Select A Service Quickly</h2>
          <ul className="pulse-list-check">
            <li>Use emergency pages when the door is stuck open, off-track, or unsafe to operate.</li>
            <li>Use spring and cable pages when there is sudden weight imbalance or loud snap sounds.</li>
            <li>Use opener pages when remote access, wall switch control, or motor behavior is inconsistent.</li>
            <li>Use replacement pages if repair frequency keeps increasing and reliability is dropping.</li>
          </ul>
        </section>

        <section className="pulse-detail">
          <h2>City Index</h2>
          <p className="pulse-lead">Jump to your location-specific pages for localized intent coverage.</p>
          <div className="pulse-grid pulse-grid-4">
            {CITY_PAGES.map((page) => (
              <Link className="pulse-chip" key={page.pageSlug} href={toPath(page.pageSlug)}>
                {cityFromTargetArea(page.targetArea)}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
