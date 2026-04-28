<script lang="ts">
  import type { PageData } from './$types';

  let { data } = $props() as { data: PageData };
</script>

<svelte:head>
  <title>Home • UNITREE Shop</title>
  <meta
    name="description"
    content="Scopri i robot Unitree e gli accessori: prezzi esposti, carrello e richiesta preventivo." 
  />
</svelte:head>

<h1 class="text-3xl font-semibold">UNITREE Shop</h1>
<p class="mt-2 text-sm text-white/70">
  Robot Unitree e accessori con prezzi esposti. Aggiungi al carrello e invia la richiesta.
</p>

<div class="mt-6 flex flex-wrap gap-3">
  <a
    href="/shop"
    class="rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/20 transition"
  >
    Vai allo Shop
  </a>
  <a
    href="/soluzioni"
    class="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold hover:bg-black/30"
  >
    Vedi Soluzioni
  </a>
</div>
