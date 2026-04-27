<script lang="ts">
  import type { Product } from '$lib/types';

  let { data } = $props();
  const products: Product[] = data.products;

  function addQty(p: Product) {
    // lazy import to keep this page smaller
  }
</script>

<h1 class="text-2xl font-semibold">Shop</h1>
<p class="mt-2 text-sm text-white/70">Robot Unitree + accessori con prezzi e carrello.</p>

<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {#each products as p (p.id)}
    <a href={`/prodotti/${p.slug}`} class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.35)] p-4 hover:-translate-y-0.5 transition">
      <div class="aspect-[16/10] w-full overflow-hidden rounded-xl bg-white/5">
        {#if p.images?.[0]}
          <img class="h-full w-full object-cover" src={p.images[0]} alt={p.name} loading="lazy" />
        {/if}
      </div>
      <div class="mt-3">
        <div class="text-xs text-white/60">
          <span class="rounded-full bg-white/5 px-2 py-0.5">{p.brand}</span>
          <span class="ml-2 text-white/40">•</span>
          <span class="ml-2">{p.category}</span>
        </div>
        <div class="mt-2 font-semibold leading-snug">{p.name}</div>
        <div class="mt-2 text-sm font-bold">
          {p.priceEur > 0 ? new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(p.priceEur) : 'Su richiesta'}
        </div>
      </div>
    </a>
  {/each}
</div>
