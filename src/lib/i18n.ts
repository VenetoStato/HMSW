export type Locale = 'it' | 'en';

export type I18nKey =
  | 'menu'
  | 'close'
  | 'solutions'
  | 'shop'
  | 'blog'
  | 'cart'
  | 'admin'
  | 'addToCart'
  | 'requestInfo'
  | 'requestInfoShort'
  | 'priceOnRequest'
  | 'cartEmptyTitle'
  | 'cartEmptyBody'
  | 'remove'
  | 'total'
  | 'subtotalConfirmed'
  | 'payPal'
  | 'payPalDescriptionConfirmed'
  | 'payPalDescriptionDeposit'
  | 'payPalAmount'
  | 'name'
  | 'email'
  | 'phone'
  | 'notes'
  | 'sendRequest'
  | 'sending'
  | 'sent'
  | 'noOnlinePayment'
  | 'viewRelatedSolution'
  | 'seeSolutions'
;

export const SUPPORTED_LOCALES: Locale[] = ['it', 'en'];

export const DICT: Record<Locale, Record<I18nKey, string>> = {
  it: {
    menu: 'Menu',
    close: 'Chiudi',
    solutions: 'Soluzioni',
    shop: 'Shop',
    blog: 'Blog',
    cart: 'Carrello',
    admin: 'Admin',
    addToCart: 'Aggiungi al carrello',
    requestInfo: 'Richiedi informazioni',
    requestInfoShort: 'RICHIEDI INFORMAZIONI',
    priceOnRequest: 'Prezzo su richiesta',
    cartEmptyTitle: 'Carrello vuoto',
    cartEmptyBody: 'Aggiungi prodotti per vedere il totale.',
    remove: 'Rimuovi',
    total: 'Totale',
    subtotalConfirmed: 'Subtotale (solo prezzi confermati)',
    payPal: 'Pagamento PayPal',
    payPalDescriptionConfirmed: 'Stai inviando il pagamento sulla base dei prezzi confermati.',
    payPalDescriptionDeposit: 'Stai inviando un acconto sulla parte con prezzo confermato.',
    payPalAmount: 'Importo',
    name: 'Nome e cognome',
    email: 'Email',
    phone: 'Telefono (opzionale)',
    notes: 'Note / richieste',
    sendRequest: 'Invia richiesta',
    sending: 'Invio...',
    sent: 'Richiesta inviata ✅',
    noOnlinePayment: 'Nessun pagamento online: inviamo la richiesta per confermare disponibilità e spedizione.',
    viewRelatedSolution: 'Vedi la soluzione correlata',
    seeSolutions: 'Vai alle soluzioni',
  },
  en: {
    menu: 'Menu',
    close: 'Close',
    solutions: 'Solutions',
    shop: 'Shop',
    blog: 'Blog',
    cart: 'Cart',
    admin: 'Admin',
    addToCart: 'Add to cart',
    requestInfo: 'Request information',
    requestInfoShort: 'Request info',
    priceOnRequest: 'Price on request',
    cartEmptyTitle: 'Cart is empty',
    cartEmptyBody: 'Add products to see the total.',
    remove: 'Remove',
    total: 'Total',
    subtotalConfirmed: 'Subtotal (confirmed prices only)',
    payPal: 'PayPal payment',
    payPalDescriptionConfirmed: 'You are sending the payment based on confirmed prices.',
    payPalDescriptionDeposit: 'You are sending a deposit for the confirmed-price part.',
    payPalAmount: 'Amount',
    name: 'Full name',
    email: 'Email',
    phone: 'Phone (optional)',
    notes: 'Notes / requests',
    sendRequest: 'Send request',
    sending: 'Sending...',
    sent: 'Request sent ✅',
    noOnlinePayment: 'No online payment: we send the request to confirm availability and shipping.',
    viewRelatedSolution: 'View related solution',
    seeSolutions: 'Go to solutions',
  },
};

export function t(locale: Locale, key: I18nKey): string {
  return DICT[locale]?.[key] ?? DICT.it[key];
}

export function detectLocaleFromLanguageTag(tag: string | null | undefined): Locale {
  if (!tag) return 'it';
  const first = tag.split(',')?.[0]?.trim().toLowerCase() ?? '';
  if (first.startsWith('en')) return 'en';
  if (first.startsWith('it')) return 'it';
  return 'it';
}

export function normalizeLocale(maybe: string | null | undefined): Locale {
  const v = (maybe ?? '').toLowerCase();
  if (v === 'en') return 'en';
  return 'it';
}
