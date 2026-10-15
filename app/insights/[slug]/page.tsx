import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReadingProgress from "@/components/motion/ReadingProgress";
import { Arrow, InsightCard, Photo, SectionHead } from "@/components/ui";
import { getInsight, insights } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getInsight((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: { type: "article", images: [post.image] },
  };
}

export default async function InsightPage({ params }: Props) {
  const post = getInsight((await params).slug);
  if (!post) notFound();

  const more = insights.filter((i) => i.slug !== post.slug).slice(0, 3);

  return (
    <>
      <ReadingProgress />
      <article className="container-x pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <Link href="/insights" className="link-arrow mb-12">
            <Arrow className="rotate-180" /> All insights
          </Link>
          <p className="eyebrow mb-6">
            {post.category} · {post.readTime}
          </p>
          <h1 className="display text-4xl sm:text-6xl" data-anim="heading">
            {post.title}
          </h1>
          <p className="text-muted font-serif mt-8 text-xl leading-relaxed italic sm:text-2xl">{post.excerpt}</p>
        </div>
        <Photo src={post.image} alt="" priority className="mx-auto my-14 aspect-[16/9] max-w-5xl" />
        <div className="text-fg/85 first-letter:font-serif first-letter:text-accent mx-auto max-w-2xl space-y-7 text-lg leading-loose first-letter:float-left first-letter:mt-2 first-letter:mr-4 first-letter:text-8xl first-letter:leading-[0.8] first-letter:italic">
          {post.body.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
          <aside className="bg-surface border-accent mt-12 border-l-2 p-8">
            <h2 className="eyebrow mb-5">Key takeaways</h2>
            <ul className="space-y-3 text-base">
              {post.takeaways.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="text-accent" aria-hidden="true">
                    —
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </article>

      <section className="border-line border-t">
        <div className="container-x section">
          <SectionHead
            eyebrow="Keep reading"
            title={
              <>
                More from <em className="italic">the journal</em>
              </>
            }
          />
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p, i) => (
              <InsightCard key={p.slug} post={p} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
