import Link from "next/link";
import { Metadata } from "next";
import { BLOG_POSTS, SITE_NAME, absoluteUrl, toPath } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Garage Door Blog",
  description: "Read garage door repair and maintenance guides for homes and businesses.",
  alternates: { canonical: "/blog" },
  openGraph: { title: `${SITE_NAME} Blog`, description: "Guides and tips", url: absoluteUrl("/blog") },
};

export default function BlogIndexPage() {
  function toBlogPath(slug: string) {
    const segment = slug.replace(/^\/+/, "").replace(/^blog\//, "");
    return `/blog/${segment}`;
  }

  return (
    <main className="pulse-main pulse-section">
      <div className="pulse-wrap">
        <p className="pulse-kicker">Knowledge Center</p>
        <h1>Garage Door Guides For Smarter Service Decisions</h1>
        <p className="pulse-lead">
          These articles are built to help you diagnose symptoms, understand repair options, and avoid risky actions
          before a technician visit.
        </p>

        <div className="pulse-grid pulse-grid-2">
          {BLOG_POSTS.map((post, index) => (
            <Link key={post.pageSlug} href={toBlogPath(toPath(post.pageSlug))} className={`pulse-card ${index % 2 === 0 ? "pulse-card-accent" : ""}`}>
              <h2>{post.pageTitle}</h2>
              <p>{post.primaryKeyword}</p>
            </Link>
          ))}
        </div>

        <section className="pulse-detail">
          <h2>What You Will Learn</h2>
          <ul className="pulse-list-check">
            <li>How to spot early warning signs before full garage door failure.</li>
            <li>What details to collect before requesting a quote.</li>
            <li>How to compare repair vs replacement with practical criteria.</li>
            <li>When immediate call support is the safest move.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
