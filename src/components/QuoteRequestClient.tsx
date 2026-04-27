'use client';

import { useMemo, useState } from 'react';
import type { Product, CartItem } from '@/lib/types';
import { useCart } from '@/lib/cart';
import { FancyButton, FancyAnchor } from '@/components/FancyButton';
import type { Locale } from '@/lib/i18n';
import { getLocaleClient } from '@/lib/localeClient';

function cls(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ');
}

type FormState = {
  companyName: string;
  vat: string;
  contactName: string;
  email: string;
  phone: string;
  objective: string;
  details: string;
};

export function QuoteRequestClient({
  products,
  locale,
}: {
  products: Product[];
  locale: Locale;
}) {
  const { items } = useCart();

  const productsById = useMemo(() => Object.fromEntries(products.map((p) => [p.id, p])), [products]);

  const lines = useMemo(() => {
    return items
      .map((it: CartItem) => {
        const p = productsById[it.productId];
        if (!p) return null;
        return { product: p, qty: it.qty };
      })
      .filter(Boolean) as Array<{ product: Product; qty: number }>;
  }, [items, productsById]);

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string>('');

  const [form, setForm] = useState<FormState>({
    companyName: '',
    vat: '',
    contactName: '',
    email: '',
    phone: '',
    objective: 'demo',
    details: '',
  });

  const [files, setFiles] = useState<File[]>([]);

  const uiLocale = locale ?? getLocaleClient();

  const copyByLocale = {
    it: {
      title: 'Richiedi un preventivo',
      subtitle:
        'Compila i moduli e allega eventuali documenti. Ti contattiamo per confermare configurazione e disponibilità.',
      modulesTitle: 'Moduli richiesta preventivo',
      company: 'Dati azienda (opzionale)',
      vat: 'P.IVA (opzionale)',
      contact: 'Contatto (obbligatorio)',
      name: 'Nome',
      email: 'Email',
      phone: 'Telefono',
      objective: 'Obiettivo progetto',
      details: 'Dettagli & vincoli',
      objectiveOptions: {
        demo: 'Demo',
        rd: 'R&D / Ricerca',
        produzione: 'Produzione',
        integrazione: 'Integrazione',
      },
      attachments: 'Allega allegati',
      drop: 'Trascina qui i file oppure scegli dal dispositivo',
      accepted: 'PDF, PNG, JPG, WebP (max 10MB per file)',
      selection: 'Riepilogo selezione',
      empty: 'Il carrello è vuoto: aggiungi prima dei prodotti.',
      send: 'Invia richiesta',
      sending: 'Invio in corso…',
      sent: 'Richiesta inviata ✅',
      serverError: 'Errore invio: riprova tra poco.',
      addFiles: 'Aggiungi file',
      fileCount: (n: number) => `${n} allegato/i`,
      selectionHint: 'I prodotti sotto vengono dal carrello.',
      attachmentsHint:
        'Gli allegati servono per specifiche, layout, requisiti di processo, foto, disegni.',
      required: 'Campo obbligatorio',
    },
    en: {
      title: 'Request a quote',
      subtitle:
        'Fill the modules and attach any documents. We’ll contact you to confirm configuration and availability.',
      modulesTitle: 'Quote request modules',
      company: 'Company data (optional)',
      vat: 'VAT (optional)',
      contact: 'Contact (required)',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      objective: 'Project objective',
      details: 'Details & constraints',
      objectiveOptions: {
        demo: 'Demo',
        rd: 'R&D / Research',
        produzione: 'Production',
        integrazione: 'Integration',
      },
      attachments: 'Attach files',
      drop: 'Drag & drop files here or choose from your device',
      accepted: 'PDF, PNG, JPG, WebP (max 10MB per file)',
      selection: 'Selection summary',
      empty: 'Cart is empty: add products first.',
      send: 'Send request',
      sending: 'Sending…',
      sent: 'Request sent ✅',
      serverError: 'Send error: try again later.',
      addFiles: 'Add files',
      fileCount: (n: number) => `${n} attachment(s)`,
      selectionHint: 'Products below come from your cart.',
      attachmentsHint:
        'Attachments help us with specifications, layouts, process requirements, photos, drawings.',
      required: 'Required field',
    },
  } as const;

  type Copy = typeof copyByLocale.it;
  const copy: Copy =
    ((copyByLocale as unknown) as Record<string, Copy>)[uiLocale] ?? copyByLocale.it;

  // (copy is always available)

  const canSend =
    lines.length > 0 &&
    form.contactName.trim().length > 1 &&
    form.email.trim().includes('@') &&
    status !== 'sent';

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!canSend) {
      setError(copy.empty);
      setStatus('error');
      return;
    }

    try {
      setStatus('sending');

      const fd = new FormData();
      fd.append('companyName', form.companyName);
      fd.append('vat', form.vat);
      fd.append('contactName', form.contactName);
      fd.append('email', form.email);
      fd.append('phone', form.phone);
      fd.append('objective', form.objective);
      fd.append('details', form.details);

      fd.append('items', JSON.stringify(lines.map((l) => ({ productId: l.product.id, qty: l.qty }))));

      for (const f of files) {
        fd.append('attachments', f, f.name);
      }

      const res = await fetch('/api/quote-request', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        setStatus('error');
        setError(copy.serverError);
        return;
      }

      setStatus('sent');

      // Optional: clear cart + reset form
      // Not doing automatic clear here to avoid surprise; backend can still accept.
    } catch {
      setStatus('error');
      setError(copy.serverError);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <h1 className="text-2xl font-bold tracking-tight">{copy.title}</h1>
        <p className="mt-2 text-sm text-gray-200/80">{copy.subtitle}</p>
      </div>

      <form onSubmit={onSubmit} className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">{copy.modulesTitle}</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-gray-200/80">{copy.company}</label>
                <input
                  value={form.companyName}
                  onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                  placeholder="Es. Azienda Srl"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-200/80">{copy.vat}</label>
                <input
                  value={form.vat}
                  onChange={(e) => setForm((p) => ({ ...p, vat: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                  placeholder="Es. IT1234567890"
                />
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold">{copy.contact}</div>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-gray-200/80">{copy.name}</label>
                  <input
                    required
                    value={form.contactName}
                    onChange={(e) => setForm((p) => ({ ...p, contactName: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                    placeholder="Nome e cognome"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-200/80">{copy.email}</label>
                  <input
                    required
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    type="email"
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                    placeholder="nome@azienda.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-200/80">{copy.phone}</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                    placeholder="Opzionale"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-gray-200/80">{copy.objective}</label>
                <select
                  value={form.objective}
                  onChange={(e) => setForm((p) => ({ ...p, objective: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                >
                  <option value="demo">{copy.objectiveOptions.demo}</option>
                  <option value="rd">{copy.objectiveOptions.rd}</option>
                  <option value="produzione">{copy.objectiveOptions.produzione}</option>
                  <option value="integrazione">{copy.objectiveOptions.integrazione}</option>
                </select>
              </div>
              <div>
                <div className="block text-xs font-medium text-gray-200/80">&nbsp;</div>
                <div className="mt-1 text-xs text-gray-200/60">{copy.attachmentsHint}</div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium text-gray-200/80">{copy.details}</label>
              <textarea
                value={form.details}
                onChange={(e) => setForm((p) => ({ ...p, details: e.target.value }))}
                className="mt-1 min-h-[140px] w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                placeholder="Tempi, vincoli tecnici, note su compatibilità, layout, obiettivi…"
              />
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold">{copy.attachments}</div>
                    <div className="mt-1 text-xs text-gray-200/60">{copy.accepted}</div>
                  </div>
                  <div className="text-xs text-gray-200/60">{copy.fileCount(files.length)}</div>
                </div>

                <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div
                    className="rounded-lg border border-dashed border-white/20 bg-black/20 p-5 text-center"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const incoming = Array.from(e.dataTransfer.files ?? []).filter(Boolean);
                      setFiles((prev) => [...prev, ...incoming].slice(0, 12));
                    }}
                  >
                    <div className="text-sm font-semibold text-gray-100">{copy.drop}</div>
                    <div className="mt-1 text-xs text-gray-200/60">{copy.attachmentsHint}</div>
                    <div className="mt-4">
                      <label className="inline-flex cursor-pointer items-center justify-center">
                        <span className="sr-only">Upload</span>
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          accept="application/pdf,image/png,image/jpeg,image/webp"
                          onChange={(e) => {
                            const incoming = Array.from(e.target.files ?? []).filter(Boolean);
                            setFiles((prev) => [...prev, ...incoming].slice(0, 12));
                          }}
                        />
                        <FancyButton
                          type="button"
                          variant="secondary"
                          className="px-4"
                        >
                          {copy.addFiles}
                        </FancyButton>
                      </label>
                    </div>
                  </div>

                  {files.length ? (
                    <div className="mt-4 space-y-2">
                      {files.slice(0, 6).map((f) => (
                        <div
                          key={`${f.name}_${f.size}`}
                          className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                        >
                          <div className="min-w-0 text-xs text-gray-200/80">
                            <div className="truncate font-semibold">{f.name}</div>
                            <div className="text-[11px] text-gray-200/60">{Math.round(f.size / 1024)} KB</div>
                          </div>
                          <FancyButton
                            type="button"
                            variant="ghost"
                            className="px-3 py-1"
                            onClick={() => setFiles((prev) => prev.filter((x) => x !== f))}
                          >
                            Remove
                          </FancyButton>
                        </div>
                      ))}
                      {files.length > 6 ? (
                        <div className="text-xs text-gray-200/60">+ {files.length - 6} altri…</div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">{copy.selection}</h2>
              <div className="text-xs text-gray-200/60">{lines.length ? `${lines.length} righe` : ''}</div>
            </div>
            <p className="mt-2 text-xs text-gray-200/60">{copy.selectionHint}</p>

            {lines.length ? (
              <div className="mt-4 space-y-3">
                {lines.map(({ product, qty }) => (
                  <div key={product.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm font-semibold">{product.name}</div>
                    <div className="mt-1 text-xs text-gray-200/60">
                      {product.brand} • {product.category}
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-4">
                      <div className="text-sm font-semibold">Quantità: {qty}</div>
                      <div className="text-sm font-semibold text-gray-100">
                        {product.priceEur > 0 ? `€ ${product.priceEur.toFixed(2)}` : 'Su richiesta'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 text-sm text-gray-200">{copy.empty}</div>
            )}

            {error ? <div className="mt-4 text-sm text-red-300">{error}</div> : null}

            <div className="mt-5">
              {status === 'sent' ? (
                <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm font-semibold text-green-200">
                  {copy.sent}
                </div>
              ) : (
                <FancyButton
                  type="submit"
                  variant="primary"
                  disabled={!canSend || status === 'sending'}
                  className={cls('w-full justify-center px-6 py-3 text-sm', (!canSend || status === 'sending') && 'opacity-70')}
                >
                  {status === 'sending' ? copy.sending : copy.send}
                </FancyButton>
              )}
            </div>

            <div className="mt-4">
              <FancyAnchor href="/shop" variant="ghost" className="text-sm">
                Torna allo shop
              </FancyAnchor>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-sm font-semibold">Come funziona</div>
            <ul className="mt-3 space-y-2 text-xs text-gray-200/70">
              <li>1) Seleziona prodotti nel kit</li>
              <li>2) Compila i moduli</li>
              <li>3) Allegati inclusi</li>
              <li>4) Invia richiesta</li>
            </ul>

            <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs font-semibold">Nota</div>
              <div className="mt-1 text-xs text-gray-200/60">
                Questa richiesta salva i dati + allegati su server. Non è un checkout.
              </div>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
