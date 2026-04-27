<script lang="ts">
  import type { Product } from '$lib/types';
  import { addToCart } from '$lib/cart';

  let { data } = $props();
  const product: Product = data.product;
  let qty = 1;

  function formatPrice(v: number) {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(v);
  }
</script>

<svelte:head>
  <title>{product.name} • UNITREE Shop</title>
</svelte:head>

<div class="grid gap-6 lg:grid-cols-2">
  <div>
    <div class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
      <div class="aspect-[16/10] w-full overflow-hidden rounded-xl bg-black/20">
        {#if product.images?.[0]}
          <img class="h-full w-full object-cover" src={product.images[0]} alt={product.name} />
        {/if}
      </div>
      {#if product.images?.length > 1}
        <div class="mt-4 grid grid-cols-4 gap-2">
          {#each product.images.slice(0, 8) as img, idx (img)}
            <div class="aspect-[1/1] overflow-hidden rounded-lg border border-white/10 bg-black/10">
              <img class="h-full w-full object-cover" src={img} alt={`${product.name} ${idx + 1}`} loading="lazy" />
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <div>
    <div class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
      <div class="text-sm text-white/60">
        <span class="rounded-full bg-white/5 px-2 py-0.5">{product.brand}</span>
        <span class="ml-2 text-white/30">•</span>
        <span class="ml-2">{product.category}</span>
      </div>

      <h1 class="mt-2 text-2xl font-semibold">{product.name}</h1>
      <p class="mt-3 text-sm text-white/70">{product.shortDescription}</p>

      <div class="mt-4 text-lg font-bold">
        {product.priceEur > 0 ? formatPrice(product.priceEur) : 'Su richiesta'}
      </div>

      <div class="mt-6 flex flex-wrap items-center gap-3">
        <label class="text-xs text-white/60">Quantità</label>
        <input type="number" min="1" class="w-20 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" bind:value={qty} />

        <button
          class="rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/20 transition"
          on:click={() => {
            addToCart(product, qty);
            alert('Aggiunto al carrello');
          }}
        >
          Aggiungi al carrello
        </button>
      </div>

      <div class="mt-6">
        <a href="/carrello" class="inline-block rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold hover:bg-black/30 transition">
          Vai al carrello
        </a>
      </div>
    </div>
  </div>
</div>
