<script lang="ts">
  import type { PageData } from './$types';
  let { data } = $props();
  const solutions = data.solutions;
</script>

<h1 class="text-2xl font-semibold">Soluzioni</h1>
<p class="mt-2 text-sm text-white/70">Seleziona la landing della tua soluzione.</p>

<div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {#each solutions as s (s.slug)}
    <a href={`/soluzioni/${s.slug}`} class="group block rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 hover:bg-white/10 transition">
      <div class="text-xs text-white/60">Soluzione</div>
      <div class="mt-2 text-lg font-semibold">{s.title}</div>
      <div class="mt-2 text-sm text-white/70">{s.description}</div>
    </a>
  {/each}
</div>
