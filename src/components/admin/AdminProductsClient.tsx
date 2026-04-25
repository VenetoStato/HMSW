'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Product } from '@/lib/types';

type FormState = {
  id?: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  solutionSlug: string;
  priceEur: string;
  currency: string;
  shortDescription: string;
  description: string;
  features: string;
};

const emptyForm: FormState = {
  id: undefined,
  name: '',
  slug: '',
  brand: 'Unitree',
  category: '',
  solutionSlug: 'robot-per-uso-quotidiano',
  priceEur: '',
  currency: 'EUR',
  shortDescription: '',
  description: '',
  features: '',
};

export default function AdminProductsClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [files, setFiles] = useState<FileList | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    const res = await fetch('/api/admin/products');
    const data = (await res.json()) as Product[];
    setProducts(data);
  }

  useEffect(() => {
    (async () => {
      await refresh();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!files || files.length === 0) {
      setPreviews([]);
      return;
    }

    const arr = Array.from(files);
    const urls = arr.map((f) => URL.createObjectURL(f));
    setPreviews(urls);

    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [files]);

  const editing = !!form.id;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const fd = new FormData();
    if (form.id) fd.append('id', form.id);
    fd.append('name', form.name);
    fd.append('slug', form.slug);
    fd.append('brand', form.brand);
    fd.append('category', form.category);
    fd.append('solutionSlug', form.solutionSlug);
    fd.append('priceEur', form.priceEur);
    fd.append('currency', form.currency);
    fd.append('shortDescription', form.shortDescription);
    fd.append('description', form.description);
    fd.append('features', form.features);

    if (files?.length) {
      for (const f of Array.from(files)) fd.append('images', f);
    }

    const url = editing ? `/api/admin/products/${form.id}` : '/api/admin/products';
    const method = editing ? 'PUT' : 'POST';

    const res = await fetch(url, { method, body: fd });
    const data = await res.json();
    if (!res.ok || !data?.ok) {
      setError(data?.error ?? 'Errore salvando prodotto');
      return;
    }

    setForm(emptyForm);
    setFiles(null);
    await refresh();
  }

  async function onDelete(id: string) {
    if (!confirm('Eliminare prodotto?')) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      alert('Errore delete');
      return;
    }
    await refresh();
  }

  const brandOptions = useMemo(() => ['Unitree', 'Accessori'], []);

  return (
    <main className="py-8">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-2/5">
          <h1 className="text-2xl font-bold">Prodotti</h1>
          <p className="mt-1 text-sm text-gray-600">Aggiungi/modifica prodotti e carica immagini da file.</p>

          <form onSubmit={onSubmit} className="mt-5 space-y-3 rounded-2xl border bg-white p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-gray-600">Brand</label>
                <select
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  value={form.brand}
                  onChange={(e) => setForm((p) => ({ ...p, brand: e.target.value }))}
                >
                  {brandOptions.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600">Categoria</label>
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  value={form.category}
                  onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                  placeholder="es. Droni / Accessori"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600">Nome</label>
              <input
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Nome prodotto"
                required
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-gray-600">Slug</label>
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  value={form.slug}
                  onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                  placeholder="automatico se vuoto"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600">Soluzione</label>
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  value={form.solutionSlug}
                  onChange={(e) => setForm((p) => ({ ...p, solutionSlug: e.target.value }))}
                  placeholder="robot-per-uso-quotidiano"
                  required
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-gray-600">Prezzo (€)</label>
                <input
                  type="number"
                  step="0.01"
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  value={form.priceEur}
                  onChange={(e) => setForm((p) => ({ ...p, priceEur: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600">Valuta</label>
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  value={form.currency}
                  onChange={(e) => setForm((p) => ({ ...p, currency: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600">Short description</label>
              <input
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                value={form.shortDescription}
                onChange={(e) => setForm((p) => ({ ...p, shortDescription: e.target.value }))}
                placeholder="Testo breve per card"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600">Descrizione completa</label>
              <textarea
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="Dettagli prodotto"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600">Features (virgola)</label>
              <input
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                value={form.features}
                onChange={(e) => setForm((p) => ({ ...p, features: e.target.value }))}
                placeholder="Plug & Play, ..."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600">Immagini (seleziona file)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setFiles(e.target.files)}
                className="mt-1 block w-full text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">Se modifichi, le nuove immagini vengono aggiunte.</p>

              {previews.length ? (
                <div className="mt-3">
                  <div className="text-xs font-semibold text-gray-700">Anteprima</div>
                  <div className="mt-2 flex gap-2 overflow-x-auto">
                    {previews.map((src, idx) => (
                      <div key={src + idx} className="relative h-16 w-16 flex-none overflow-hidden rounded-md border bg-gray-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="anteprima immagine" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900"
              >
                {editing ? 'Salva modifiche' : 'Crea prodotto'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm(emptyForm);
                  setFiles(null);
                }}
                className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-3/5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Catalogo</h2>
            {loading ? <span className="text-sm text-gray-500">Carico...</span> : null}
          </div>

          <div className="mt-4 space-y-3">
            {products.map((p) => (
              <div key={p.id} className="rounded-2xl border bg-white p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-sm text-gray-500">{p.brand} • {p.category}</div>
                    <div className="mt-1 font-semibold">{p.name}</div>
                    <div className="mt-1 text-sm font-bold">€ {p.priceEur}</div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setForm({
                          id: p.id,
                          name: p.name,
                          slug: p.slug,
                          brand: p.brand,
                          category: p.category,
                          solutionSlug: p.solutionSlug,
                          priceEur: String(p.priceEur),
                          currency: p.currency,
                          shortDescription: p.shortDescription,
                          description: p.description,
                          features: p.features.join(', '),
                        });
                        setFiles(null);
                      }}
                      className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      Modifica
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(p.id)}
                      className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      Elimina
                    </button>
                  </div>
                </div>

                {p.images?.length ? (
                  <div className="mt-3 flex gap-2 overflow-x-auto">
                    {p.images.slice(0, 5).map((src) => (
                      <div key={src} className="relative h-16 w-16 flex-none overflow-hidden rounded-md bg-gray-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="thumb" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="mt-3 text-xs text-gray-500">/prodotti/{p.slug}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
