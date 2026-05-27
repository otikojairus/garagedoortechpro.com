import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, PHONE_DISPLAY, SITE_NAME, absoluteUrl, toPath } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400;

function getBlogPost(slug: string) {
  return (
    BLOG_POSTS.find((post) => {
      const segment = post.pageSlug.replace(/^\/+/, "").replace(/^blog\//, "");
      return segment === slug;
    }) ?? null
  );
}

function keywordList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildBodyCopy(post: { pageTitle: string; primaryKeyword: string; targetArea: string; searchIntent: string }) {
  const place = post.targetArea.includes(",") ? post.targetArea : "Canada";
  return {
    intro:
      `For ${post.primaryKeyword}, context matters. Property type, door age, opener model, and weather exposure all affect the safest next step. In ${place}, many service calls begin with minor warning signs that were easy to miss at first.`,
    diagnosis:
      `A good diagnosis separates symptom from root cause. The visible issue might be a slow door, loud movement, or failed remote access, but the real trigger is often spring fatigue, alignment drift, worn rollers, or opener load imbalance.`,
    planning:
      `Before booking work, compare urgency, reliability, and cost horizon. If failure risk is high, same-day repair is usually best. If reliability has declined over time, a planned replacement path can reduce repeat callouts and long-term downtime.`,
    prevention:
      `Preventive checks make a measurable difference: inspect door balance, listen for new noise patterns, keep tracks clear, and test safety sensors regularly. Small checks lower emergency risk and improve day-to-day operation.`,
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.pageSlug.replace(/^\/+/, "").replace(/^blog\//, "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Page Not Found" };

  return {
    title: post.pageTitle,
    description: `Read our guide on ${post.primaryKeyword}, warning signs, and safe next steps.`,
    alternates: { canonical: `/blog/${post.pageSlug.replace(/^\/+/, "").replace(/^blog\//, "")}` },
    keywords: [post.primaryKeyword],
    openGraph: {
      title: `${post.pageTitle} | ${SITE_NAME}`,
      description: `Guide for ${post.primaryKeyword}.`,
      url: absoluteUrl(`/blog/${post.pageSlug.replace(/^\/+/, "").replace(/^blog\//, "")}`),
      type: "article",
      siteName: SITE_NAME,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedKeywords = keywordList(post.secondaryKeywords);
  const body = buildBodyCopy(post);

  return (
    <main className="pulse-main pulse-section">
      <article className="pulse-wrap">
        <p className="pulse-kicker">Blog Post</p>
        <h1>{post.pageTitle}</h1>
        <p className="pulse-lead">
          This guide explains {post.primaryKeyword} in plain language so you can quickly understand what is normal,
          what is risky, and what to do next.
        </p>

        <section className="pulse-detail">
          <h2>Why This Topic Matters</h2>
          <p>
            Garage door issues can escalate fast when warning signs are ignored. The safest approach is to recognize
            common symptoms early, avoid risky DIY steps, and get qualified support when needed.
          </p>
          <p>
            If you are unsure whether your situation is urgent, treat it as urgent first. Keep people away from the
            suspected area and call for guidance.
          </p>
          <p>{body.intro}</p>
        </section>

        <section className="pulse-detail">
          <h2>What To Check First</h2>
          <ul>
            <li>Notice unusual sounds, jerky movement, or gaps when the door closes.</li>
            <li>Avoid forcing the door if cables, springs, or tracks look damaged.</li>
            <li>Move vehicles and people away from the door path before troubleshooting.</li>
            <li>Document what happened so the technician can diagnose faster.</li>
          </ul>
          <p>{body.diagnosis}</p>
          <p>{body.planning}</p>
          <p>{body.prevention}</p>
        </section>

        {relatedKeywords.length > 0 && (
          <section className="pulse-detail">
            <h2>Related Search Topics</h2>
            <div className="pulse-grid pulse-grid-3">
              {relatedKeywords.map((keyword) => (
                <article key={keyword} className="pulse-card">
                  <h3>{keyword}</h3>
                  <p>Helpful when comparing symptoms, causes, and service options.</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="pulse-actions">
          <a className="pulse-call" href={`tel:${PHONE_DISPLAY.replace(/[^0-9]/g, "")}`}>
            Call {PHONE_DISPLAY}
          </a>
          <Link className="pulse-btn" href="/blog">
            Back To Blog
          </Link>
        </section>
      </article>
    </main>
  );
}
