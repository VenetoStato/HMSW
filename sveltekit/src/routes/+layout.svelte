<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import { cartCount } from '$lib/cart';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
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

