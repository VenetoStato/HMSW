import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/catalog';

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

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <Link href="/blog" className="underline hover:no-underline">
            Blog
          </Link>
          {post.solutionSlug ? (
            <>
              <span aria-hidden>•</span>
              <Link href={`/soluzioni/${post.solutionSlug}`} className="underline hover:no-underline">
                Soluzione: {post.solutionSlug}
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
        <h2 className="text-lg font-semibold">Vuoi passare allo shop?</h2>
        <p className="mt-2 text-sm text-gray-600">
          Sfoglia i prodotti e costruisci il tuo kit con accessori compatibili.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/shop" className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-900">
            Vai allo shop
          </Link>
          {post.solutionSlug ? (
            <Link
              href={`/soluzioni/${post.solutionSlug}`}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Vedi la soluzione
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
