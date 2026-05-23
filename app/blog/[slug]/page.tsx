import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, posts } from "@/lib/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kirillotin.uz";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.date,
      authors: ["Shohruzdev"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const Content = post.content;
  const url = `${SITE_URL}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Shohruzdev",
      url: "https://t.me/Shohruz_Isroilov",
    },
    publisher: {
      "@type": "Organization",
      name: "Кирил ↔ Лотин Конвертор",
      url: SITE_URL,
    },
    mainEntityOfPage: url,
    inLanguage: "uz-Cyrl",
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Бош саҳифа", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Блог", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <nav className="text-xs text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400">
            Бош саҳифа
          </Link>{" "}
          /{" "}
          <Link
            href="/blog"
            className="hover:text-primary-600 dark:hover:text-primary-400"
          >
            Блог
          </Link>
        </nav>

        <article>
          <header className="mb-8">
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("uz-UZ", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>·</span>
              <span>{post.readingMinutes} дақ. ўқиш</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {post.title}
            </h1>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {post.description}
            </p>
          </header>

          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-headings:font-semibold prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-code:text-primary-700 dark:prose-code:text-primary-300 prose-code:bg-primary-50 dark:prose-code:bg-primary-900/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
            <Content />
          </div>
        </article>

        <footer className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
          <Link
            href="/blog"
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            ← Барча мақолалар
          </Link>
        </footer>

        <div className="mt-10 p-6 rounded-xl border border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/20 text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Матнни ёки файлни ҳозироқ ўгиринг
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Бепул, тез ва махфийликни сақловчи онлайн конвертор.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors"
          >
            Конверторга ўтиш
          </Link>
        </div>
      </div>
    </div>
  );
}
