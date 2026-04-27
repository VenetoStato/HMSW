<script lang="ts">
  import { cartItems, clearCart } from '$lib/cart';

  let companyName = '';
  let vat = '';
  let contactName = '';
  let email = '';
  let phone = '';
  let objective = '';
  let details = '';

  let files: File[] = [];
  let status: 'idle' | 'sending' | 'sent' | 'error' = 'idle';
  let errorMessage = '';

  async function onSubmit(e: Event) {
    e.preventDefault();
    const items = $cartItems.map((it) => ({ productId: it.productId, qty: it.qty }));
    if (!items.length) {
      alert('Carrello vuoto');
      return;
    }
    if (!contactName.trim() || !email.trim()) {
      alert('Nome e email sono obbligatori');
      return;
    }

    const fd = new FormData();
    fd.set('companyName', companyName);
    fd.set('vat', vat);
    fd.set('contactName', contactName);
    fd.set('email', email);
    fd.set('phone', phone);
    fd.set('objective', objective);
    fd.set('details', details);
    fd.set('items', JSON.stringify(items));

    for (const f of files) {
      fd.append('files', f);
    }

    status = 'sending';
    errorMessage = '';

    const res = await fetch('/api/quote-request', {
      method: 'POST',
      body: fd
    });

    if (!res.ok) {
      status = 'error';
      errorMessage = await res.text().catch(() => 'Upload error');
      return;
    }

    status = 'sent';
    clearCart();
  }

  function onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    files = Array.from(input.files ?? []);
  }
</script>

<svelte:head>
  <title>Richiesta preventivo • UNITREE Shop</title>
</svelte:head>

<h1 class="text-2xl font-semibold">Richiesta preventivo</h1>
<p class="mt-2 text-sm text-white/70">Compila i moduli e aggiungi allegati.</p>

<form class="mt-6 space-y-4" on:submit={onSubmit}>
  <div class="grid gap-4 md:grid-cols-2">
    <label class="block">
      <div class="text-sm text-white/70">Azienda (opzionale)</div>
      <input class="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" bind:value={companyName} />
    </label>
    <label class="block">
      <div class="text-sm text-white/70">Partita IVA (opzionale)</div>
      <input class="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" bind:value={vat} />
    </label>
  </div>

  <div class="grid gap-4 md:grid-cols-2">
    <label class="block">
      <div class="text-sm text-white/70">Nome *</div>
      <input required class="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" bind:value={contactName} />
    </label>
    <label class="block">
      <div class="text-sm text-white/70">Email *</div>
      <input required type="email" class="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" bind:value={email} />
    </label>
  </div>

  <div class="grid gap-4 md:grid-cols-2">
    <label class="block">
      <div class="text-sm text-white/70">Telefono (opzionale)</div>
      <input class="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" bind:value={phone} />
    </label>
    <label class="block">
      <div class="text-sm text-white/70">Obiettivo progetto (opzionale)</div>
      <input class="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" bind:value={objective} />
    </label>
  </div>

  <label class="block">
    <div class="text-sm text-white/70">Dettagli & vincoli (opzionale)</div>
    <textarea class="mt-1 min-h-28 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" bind:value={details} />
  </label>

  <div class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
    <div class="text-sm text-white/70">Allega allegati (PDF/immagini) </div>
    <input class="mt-2 w-full" type="file" multiple on:change={onFileChange} />
    {#if files.length}
      <div class="mt-2 text-xs text-white/60">{files.length} file selezionati</div>
    {/if}
  </div>

  <div class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
    <div class="text-sm text-white/70">Riepilogo selezione</div>
    <div class="mt-2 text-sm">
      {#each $cartItems as it (it.productId)}
        <div class="text-white/80">{it.productId} × {it.qty}</div>
      {/each}
    </div>
  </div>

  {#if status === 'error'}
    <div class="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{errorMessage}</div>
  {/if}

  <button disabled={status==='sending'} class="w-full rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/20 disabled:opacity-60">
    {status === 'sending' ? 'Invio...' : status === 'sent' ? 'Inviato ✅' : 'Invia richiesta'}
  </button>
</form>
