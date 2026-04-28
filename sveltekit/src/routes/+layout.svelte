<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import { cartCount } from '$lib/cart';

  let { children } = $props();

  const siteName = 'UNITREE Shop';
  const siteDescription =
    'Shop online per robot Unitree e accessori: prezzi esposti, carrello e richiesta preventivo.';
</script>

<svelte:head>
  <title>{siteName}</title>

  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content={siteDescription} />

  <meta property="og:site_name" content={siteName} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={siteName} />
  <meta property="og:description" content={siteDescription} />

  <link rel="icon" href={favicon} />
</svelte:head>

<header class="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur">
  <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
    <a href="/" class="font-semibold text-sm sm:text-base">UNITREE Shop</a>

    <nav class="hidden items-center gap-4 text-sm md:flex">
      <a class="opacity-90 hover:opacity-100" href="/soluzioni">Soluzioni</a>
      <a class="opacity-90 hover:opacity-100" href="/shop">Shop</a>
      <a class="opacity-90 hover:opacity-100" href="/carrello">Carrello ({$cartCount})</a>
      <a class="opacity-90 hover:opacity-100" href="/admin">Admin</a>
    </nav>
  </div>
</header>

<main class="mx-auto w-full max-w-6xl px-4 py-6">{@render children()}</main>

