import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/catalog';
import { getLocaleServer } from '@/lib/localeServer';
import { t, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | UNITREE Shop`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const locale: Locale = getLocaleServer();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <Link href="/blog" className="underline hover:no-underline">
            {t(locale, 'blogBreadcrumb')}
          </Link>
          {post.solutionSlug ? (
            <>
              <span aria-hidden>•</span>
              <Link href={`/soluzioni/${post.solutionSlug}`} className="underline hover:no-underline">
                {t(locale, 'solutionBreadcrumb')}: {post.solutionSlug}
              </Link>
            </>
          ) : null}
        </div>
        <h1 className="mt-3 text-3xl font-bold">{post.title}</h1>
        <p className="mt-3 text-sm text-gray-600">{post.excerpt}</p>
      </div>

      <article className="prose max-w-none">
        {post.paragraphs.map((t, idx) => (
          <p key={idx}>{t}</p>
        ))}
      </article>

      <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">{t(locale, 'wantGoShopTitle')}</h2>
        <p className="mt-2 text-sm text-gray-600">{t(locale, 'wantGoShopBody')}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-900"
          >
            {t(locale, 'goShopCTA')}
          </Link>
          {post.solutionSlug ? (
            <Link
              href={`/soluzioni/${post.solutionSlug}`}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
            >
              {t(locale, 'viewSolutionCTA')}
            </Link>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}
