<script lang="ts">
  import type { Product } from '$lib/types';
  import { cartCount, cartItems, clearCart, removeFromCart, setQty } from '$lib/cart';

  let { data } = $props();
  const products: Product[] = data.products;

  let productsById = $derived(Object.fromEntries(products.map((p) => [p.id, p] as const)));

  let lines = $derived(
    $cartItems
      .map((it) => {
        const p = productsById[it.productId];
        if (!p) return null;
        return { product: p, qty: it.qty };
      })
      .filter(Boolean)
  );

  let subtotal = $derived(lines.reduce((sum, l) => sum + l.product.priceEur * l.qty, 0));

  function formatPrice(v: number) {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(v);
  }

  async function submitOrder() {
    const body = {
      customer: { name: '—', email: '—', phone: '' },
      items: lines.map((l) => ({ productId: l.product.id, qty: l.qty }))
    };
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      alert('Errore invio ordine');
      return;
    }
    clearCart();
    alert('Richiesta inviata');
  }
</script>

<svelte:head>
  <title>Carrello • UNITREE Shop</title>
  <meta
    name="description"
    content="Rivedi i prodotti nel carrello e invia la richiesta." 
  />
</svelte:head>

<h1 class="text-2xl font-semibold">Carrello</h1>
<p class="mt-2 text-sm text-white/70">Articoli: {$cartCount}</p>

{#if lines.length === 0}
  <div class="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 text-white/80">
    Carrello vuoto.
  </div>
{:else}
  <div class="mt-6 grid gap-6 lg:grid-cols-3">
    <div class="lg:col-span-2 space-y-3">
      {#each lines as l (l.product.id)}
        <div class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
          <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <div class="text-sm text-white/60">{l.product.brand} • {l.product.category}</div>
              <div class="mt-1 font-semibold">{l.product.name}</div>
              <div class="mt-2 text-sm font-bold">
                {l.product.priceEur > 0 ? formatPrice(l.product.priceEur) : 'Su richiesta'}
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <div>
                <label class="block text-xs text-white/60">Quantità</label>
                <input
                  type="number"
                  min="1"
                  class="mt-1 w-24 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  value={l.qty}
                  on:input={(e) => setQty(l.product.id, Number((e.target as HTMLInputElement).value))}
                />
              </div>
              <div class="text-sm font-bold">{formatPrice(l.product.priceEur * l.qty)}</div>
              <button class="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm font-semibold hover:bg-black/30" on:click={() => removeFromCart(l.product.id)}>
                Rimuovi
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <div class="lg:col-span-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
      <div class="text-lg font-semibold">Totale</div>
      <div class="mt-2 flex items-center justify-between">
        <span class="text-white/70">Subtotale</span>
        <span class="font-bold">{formatPrice(subtotal)}</span>
      </div>

      <div class="mt-5 space-y-3">
        <button class="w-full rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/20 transition" on:click={submitOrder}>
          Invia richiesta (demo)
        </button>
        <a href="/richiesta-preventivo" class="block w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-center font-semibold hover:bg-black/30">
          Vai a Richiesta preventivo + allegati
        </a>
      </div>
    </div>
  </div>
{/if}

