import Link from 'next/link';
import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Blog UNITREE Shop',
  description: 'Guide e contenuti sulle soluzioni Unitree: quadrupedi, braccia/gripper, umanoidi e accessori.',
};

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="mt-2 text-sm text-gray-600">
          Guide SEO e contenuti pratici per scegliere la soluzione Unitree più adatta al tuo progetto.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <article
            key={p.slug}
            className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-xs text-gray-500">{p.solutionSlug ? `Soluzione: ${p.solutionSlug}` : 'Guida'}</div>
            <h2 className="mt-2 text-lg font-semibold">
              <Link className="hover:underline" href={`/blog/${p.slug}`}>
                {p.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-gray-600">{p.excerpt}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.solutionSlug ? (
                <Link
                  href={`/soluzioni/${p.solutionSlug}`}
                  className="rounded-lg border px-3 py-2 text-xs hover:bg-gray-50"
                >
                  Vai alla soluzione
                </Link>
              ) : null}
              <Link
                href={`/blog/${p.slug}`}
                className="rounded-lg bg-black px-3 py-2 text-xs text-white hover:bg-gray-900"
              >
                Leggi la guida
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
