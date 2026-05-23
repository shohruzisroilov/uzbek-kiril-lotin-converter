import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/lib/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kirillotin.uz";

export const metadata: Metadata = {
  title: "Блог — Кирил Лотин қоидалари, мақолалар ва йўриқномалар",
  description:
    "Ўзбек тилидаги кирил ва лотин ёзуви ҳақида фойдали мақолалар: тарих, қоидалар, апостроф ишлатиш, Х/Ҳ фарқи, Word файлларни ўгириш ва бошқалар.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Блог — Kirillotin.uz",
    description:
      "Ўзбек тилидаги кирил ва лотин ёзуви ҳақида фойдали мақолалар ва йўриқномалар.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function BlogIndexPage() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <header className="mb-10 sm:mb-12">
          <Link
            href="/"
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
          >
            ← Бош саҳифага
          </Link>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Блог
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Кирил ва лотин ёзуви, ўзбек алифбоси қоидалари ҳақида фойдали
            мақолалар.
          </p>
        </header>

        <ul className="space-y-4">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block p-5 sm:p-6 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
              >
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
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
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {post.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
