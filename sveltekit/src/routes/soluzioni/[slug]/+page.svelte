<script lang="ts">
  import { addToCart } from '$lib/cart';
  import type { Product } from '$lib/types';

  let { data } = $props();
  const solution = data.solution;
  const matched: Product[] = data.matched;
</script>

<svelte:head>
  <title>{solution.title} • UNITREE Shop</title>
  <meta name="description" content={solution.seoDescription} />
</svelte:head>

<div class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
  <div class="text-xs text-white/60">Soluzione</div>
  <h1 class="mt-2 text-2xl font-semibold">{solution.title}</h1>
  <p class="mt-3 text-sm text-white/70">{solution.heroCopy}</p>

  <div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {#each solution.bullets.slice(0, 3) as b}
      <div class="rounded-xl border border-white/10 bg-black/15 p-3 text-sm text-white/80">{b}</div>
    {/each}
  </div>
</div>

<div class="mt-8">
  <h2 class="text-xl font-semibold">Componenti suggeriti</h2>
  <p class="mt-2 text-sm text-white/70">Prodotti coerenti con la landing {solution.slug}.</p>

  {#if matched.length === 0}
    <div class="mt-4 text-white/70">Nessun prodotto trovato.</div>
  {:else}
    <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each matched as p (p.id)}
        <div class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
          <div class="aspect-[16/10] w-full overflow-hidden rounded-xl bg-black/20">
            {#if p.images?.[0]}
              <img class="h-full w-full object-cover" src={p.images[0]} alt={p.name} loading="lazy" />
            {/if}
          </div>
          <div class="mt-3 text-sm text-white/60">
            {p.brand} • {p.category}
          </div>
          <div class="mt-2 font-semibold">{p.name}</div>
          <div class="mt-2 text-sm font-bold">
            {p.priceEur > 0 ? new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(p.priceEur) : 'Su richiesta'}
          </div>
          <button
            class="mt-4 w-full rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/20 transition"
            on:click={() => {
              addToCart(p, 1);
              alert('Aggiunto al carrello');
            }}
          >
            Aggiungi al carrello
          </button>
        </div>
      {/each}
    </div>
  {/if}

  <div class="mt-8">
    <a href="/carrello" class="inline-flex items-center rounded-xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold hover:bg-black/30 transition">
      Vai al carrello
    </a>
  </div>
</div>
