export type Locale = 'it' | 'en' | 'de' | 'fr' | 'nl' | 'no' | 'es';

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
  | 'perUnit'
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
  | 'orderSendError'
  | 'noOnlinePayment'
  | 'viewRelatedSolution'
  | 'seeSolutions'
  // page-level
  | 'shopTitle'
  | 'shopSubtitle'
  | 'cartPageTitle'
  | 'solutionsIndexLabel'
  | 'solutionsIndexH1'
  | 'solutionsIndexP'
  | 'componentiLabel'
  | 'openLabel'
  | 'blogBreadcrumb'
  | 'solutionBreadcrumb'
  | 'wantGoShopTitle'
  | 'wantGoShopBody'
  | 'goShopCTA'
  | 'viewSolutionCTA'
  // SolutionKitBuilder
  | 'configurator'
  | 'progressLabel'
  | 'step1Scenario'
  | 'scenarioIntro'
  | 'scenarioDemoButton'
  | 'scenarioResearchButton'
  | 'scenarioIntegrationButton'
  | 'scenarioQuickLabel'
  | 'scenarioResearchLabel'
  | 'scenarioIntegrationLabel'
  | 'totalEstimated'
  | 'unknownPrices'
  | 'unknownPriceHint'
  | 'knownPricingHint'
  | 'step2KitComponents'
  | 'kitAddedNotice'
  | 'addKitToCart'
  | 'step3RequestOptional'
  | 'notePlaceholder'
  | 'noteSavedText'
  | 'step4Gallery'
  | 'imagePrev'
  | 'imageNext';

export const SUPPORTED_LOCALES: Locale[] = ['it', 'en', 'de', 'fr', 'nl', 'no', 'es'];

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
    perUnit: 'cadauno',
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
    orderSendError: 'Errore invio ordine. Riprova.',
    noOnlinePayment:
      'Nessun pagamento online: inviamo la richiesta per confermare disponibilità e spedizione.',
    viewRelatedSolution: 'Vedi la soluzione correlata',
    seeSolutions: 'Vai alle soluzioni',

    shopTitle: 'Shop',
    shopSubtitle: 'Unitree e accessori, con prezzi e carrello.',
    cartPageTitle: 'Carrello',

    solutionsIndexLabel: 'Soluzioni per automazione',
    solutionsIndexH1: 'Scegli la soluzione e configura in 1 minuto',
    solutionsIndexP:
      'Landing dedicate (mobile-first) con immagini coerenti, copy ottimizzato e configurazione interattiva. Poi aggiungi al carrello e invii la richiesta.',
    componentiLabel: 'Componenti',
    openLabel: 'Apri',

    blogBreadcrumb: 'Blog',
    solutionBreadcrumb: 'Soluzione',
    wantGoShopTitle: 'Vuoi passare allo shop?',
    wantGoShopBody: 'Sfoglia i prodotti e costruisci il tuo kit con accessori compatibili.',
    goShopCTA: 'Vai allo shop',
    viewSolutionCTA: 'Vedi la soluzione',

    configurator: 'Configuratore',
    progressLabel: 'Progress',
    step1Scenario: '1) Scenario',
    scenarioIntro:
      'Selezioniamo automaticamente un componente “base” e accessori compatibili. Prezzi trasparenti dove disponibili, altrimenti “su richiesta”.',
    scenarioDemoButton: 'Demo',
    scenarioResearchButton: 'Ricerca',
    scenarioIntegrationButton: 'Integrazione',

    scenarioQuickLabel: 'Demo rapida',
    scenarioResearchLabel: 'Ricerca & prove',
    scenarioIntegrationLabel: 'Integrazione pronta',

    totalEstimated: 'Totale stimato',
    unknownPrices: 'Su richiesta',
    unknownPriceHint: 'Almeno un componente è “prezzo su richiesta”.',
    knownPricingHint: 'Stima basata sui prezzi confermati.',

    step2KitComponents: '2) Componenti nel kit',

    kitAddedNotice: 'Kit aggiunto ✅ (nota salvata)',
    addKitToCart: 'Aggiungi kit al carrello',

    step3RequestOptional: '3) Scrivi la tua richiesta (opzionale)',
    notePlaceholder: 'Esempio: conferma compatibilità, tempi di spedizione, accessori aggiuntivi...',
    noteSavedText: 'La nota viene salvata e precompila il form nel carrello.',

    step4Gallery: '4) Galleria inerente alla soluzione',

    imagePrev: 'Immagine precedente',
    imageNext: 'Immagine successiva',
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
    requestInfoShort: 'REQUEST INFO',
    priceOnRequest: 'Price on request',
    perUnit: 'each',
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
    orderSendError: 'Error sending order. Please try again.',
    noOnlinePayment: 'No online payment: we send the request to confirm availability and shipping.',
    viewRelatedSolution: 'View related solution',
    seeSolutions: 'Go to solutions',

    shopTitle: 'Shop',
    shopSubtitle: 'Unitree robots & accessories, with prices and cart.',
    cartPageTitle: 'Cart',

    solutionsIndexLabel: 'Solutions for automation',
    solutionsIndexH1: 'Choose your solution and configure in 1 minute',
    solutionsIndexP:
      'Dedicated landing pages (mobile-first) with consistent images, optimized copy, and interactive configuration. Then add to cart and send your request.',
    componentiLabel: 'Components',
    openLabel: 'Open',

    blogBreadcrumb: 'Blog',
    solutionBreadcrumb: 'Solution',
    wantGoShopTitle: 'Want to go to the shop?',
    wantGoShopBody: 'Browse products and build your kit with compatible accessories.',
    goShopCTA: 'Go to shop',
    viewSolutionCTA: 'View solution',

    configurator: 'Configurator',
    progressLabel: 'Progress',
    step1Scenario: '1) Scenario',
    scenarioIntro:
      'We automatically select a “base” component and compatible accessories. Transparent prices where available, otherwise “on request”.',
    scenarioDemoButton: 'Demo',
    scenarioResearchButton: 'Research',
    scenarioIntegrationButton: 'Integration',

    scenarioQuickLabel: 'Quick demo',
    scenarioResearchLabel: 'Research & tests',
    scenarioIntegrationLabel: 'Ready integration',

    totalEstimated: 'Estimated total',
    unknownPrices: 'On request',
    unknownPriceHint: 'At least one component is “price on request”.',
    knownPricingHint: 'Estimate based on confirmed prices.',

    step2KitComponents: '2) Kit components',

    kitAddedNotice: 'Kit added ✅ (note saved)',
    addKitToCart: 'Add kit to cart',

    step3RequestOptional: '3) Write your request (optional)',
    notePlaceholder:
      'Example: confirm compatibility, shipping times, extra accessories...',
    noteSavedText: 'The note is saved and pre-fills the cart form.',

    step4Gallery: '4) Solution gallery',

    imagePrev: 'Previous image',
    imageNext: 'Next image',
  },

  de: {
    menu: 'Menü',
    close: 'Schließen',
    solutions: 'Lösungen',
    shop: 'Shop',
    blog: 'Blog',
    cart: 'Warenkorb',
    admin: 'Admin',
    addToCart: 'In den Warenkorb',
    requestInfo: 'Informationen anfordern',
    requestInfoShort: 'INFORMATIONEN ANFORDERN',
    priceOnRequest: 'Preis auf Anfrage',
    perUnit: 'je Stück',
    cartEmptyTitle: 'Warenkorb ist leer',
    cartEmptyBody: 'Fügen Sie Produkte hinzu, um die Summe zu sehen.',
    remove: 'Entfernen',
    total: 'Gesamt',
    subtotalConfirmed: 'Zwischensumme (nur bestätigte Preise)',
    payPal: 'PayPal-Zahlung',
    payPalDescriptionConfirmed: 'Sie senden die Zahlung basierend auf bestätigten Preisen.',
    payPalDescriptionDeposit: 'Sie senden eine Anzahlung für den Teil mit bestätigtem Preis.',
    payPalAmount: 'Betrag',
    name: 'Vor- und Nachname',
    email: 'E-Mail',
    phone: 'Telefon (optional)',
    notes: 'Notizen / Anfragen',
    sendRequest: 'Anfrage senden',
    sending: 'Wird gesendet...',
    sent: 'Anfrage gesendet ✅',
    orderSendError: 'Fehler beim Senden der Bestellung. Bitte erneut versuchen.',
    noOnlinePayment:
      'Keine Online-Zahlung: Wir senden die Anfrage, um Verfügbarkeit und Versand zu bestätigen.',
    viewRelatedSolution: 'Zugehörige Lösung ansehen',
    seeSolutions: 'Zu den Lösungen',

    shopTitle: 'Shop',
    shopSubtitle: 'Unitree & Zubehör, mit Preisen und Warenkorb.',
    cartPageTitle: 'Warenkorb',

    solutionsIndexLabel: 'Lösungen für Automatisierung',
    solutionsIndexH1: 'Wählen Sie Ihre Lösung und konfigurieren Sie in 1 Minute',
    solutionsIndexP:
      'Spezielle Landingpages (mobile-first) mit konsistenten Bildern, optimiertem Text und interaktiver Konfiguration. Danach zum Warenkorb hinzufügen und Anfrage senden.',
    componentiLabel: 'Komponenten',
    openLabel: 'Öffnen',

    blogBreadcrumb: 'Blog',
    solutionBreadcrumb: 'Lösung',
    wantGoShopTitle: 'Möchten Sie zum Shop wechseln?',
    wantGoShopBody: 'Entdecken Sie die Produkte und stellen Sie Ihr Kit mit kompatiblem Zubehör zusammen.',
    goShopCTA: 'Zum Shop',
    viewSolutionCTA: 'Lösung ansehen',

    configurator: 'Konfigurator',
    progressLabel: 'Fortschritt',
    step1Scenario: '1) Szenario',
    scenarioIntro:
      'Wir wählen automatisch eine “Basis”-Komponente und kompatibles Zubehör aus. Transparente Preise, wenn verfügbar, ansonsten “auf Anfrage”.',
    scenarioDemoButton: 'Demo',
    scenarioResearchButton: 'Forschung',
    scenarioIntegrationButton: 'Integration',

    scenarioQuickLabel: 'Schnelle Demo',
    scenarioResearchLabel: 'Forschung & Tests',
    scenarioIntegrationLabel: 'Bereite Integration',

    totalEstimated: 'Geschätzter Gesamtpreis',
    unknownPrices: 'Auf Anfrage',
    unknownPriceHint: 'Mindestens eine Komponente hat “Preis auf Anfrage”.',
    knownPricingHint: 'Schätzung basierend auf bestätigten Preisen.',

    step2KitComponents: '2) Kit-Komponenten',

    kitAddedNotice: 'Kit hinzugefügt ✅ (Notiz gespeichert)',
    addKitToCart: 'Kit in den Warenkorb',

    step3RequestOptional: '3) Schreiben Sie Ihre Anfrage (optional)',
    notePlaceholder:
      'Beispiel: Kompatibilität bestätigen, Lieferzeiten, zusätzliches Zubehör...',
    noteSavedText: 'Die Notiz wird gespeichert und füllt das Warenkorbformular vor.',

    step4Gallery: '4) Lösungsgalerie',

    imagePrev: 'Vorheriges Bild',
    imageNext: 'Nächstes Bild',
  },

  fr: {
    menu: 'Menu',
    close: 'Fermer',
    solutions: 'Solutions',
    shop: 'Boutique',
    blog: 'Blog',
    cart: 'Panier',
    admin: 'Admin',
    addToCart: 'Ajouter au panier',
    requestInfo: 'Demander des informations',
    requestInfoShort: 'DEMANDE D’INFOS',
    priceOnRequest: 'Prix sur demande',
    perUnit: 'par article',
    cartEmptyTitle: 'Panier vide',
    cartEmptyBody: 'Ajoutez des produits pour voir le total.',
    remove: 'Supprimer',
    total: 'Total',
    subtotalConfirmed: 'Sous-total (prix confirmés uniquement)',
    payPal: 'Paiement PayPal',
    payPalDescriptionConfirmed: 'Vous envoyez le paiement basé sur les prix confirmés.',
    payPalDescriptionDeposit: 'Vous envoyez un acompte pour la partie au prix confirmé.',
    payPalAmount: 'Montant',
    name: 'Nom complet',
    email: 'E-mail',
    phone: 'Téléphone (optionnel)',
    notes: 'Notes / demandes',
    sendRequest: 'Envoyer la demande',
    sending: 'Envoi...',
    sent: 'Demande envoyée ✅',
    orderSendError: 'Erreur lors de l’envoi de la commande. Veuillez réessayer.',
    noOnlinePayment: 'Aucun paiement en ligne : nous envoyons la demande pour confirmer disponibilité et expédition.',
    viewRelatedSolution: 'Voir la solution associée',
    seeSolutions: 'Aller aux solutions',

    shopTitle: 'Boutique',
    shopSubtitle: 'Robots Unitree & accessoires, avec prix et panier.',
    cartPageTitle: 'Panier',

    solutionsIndexLabel: 'Solutions pour l’automatisation',
    solutionsIndexH1: 'Choisissez votre solution et configurez en 1 minute',
    solutionsIndexP:
      'Pages d’atterrissage dédiées (mobile-first) avec des images cohérentes, un texte optimisé et une configuration interactive. Ensuite, ajoutez au panier et envoyez la demande.',
    componentiLabel: 'Composants',
    openLabel: 'Ouvrir',

    blogBreadcrumb: 'Blog',
    solutionBreadcrumb: 'Solution',
    wantGoShopTitle: 'Vous voulez passer à la boutique ?',
    wantGoShopBody: "Parcourez les produits et composez votre kit avec des accessoires compatibles.",
    goShopCTA: 'Aller à la boutique',
    viewSolutionCTA: 'Voir la solution',

    configurator: 'Configurateur',
    progressLabel: 'Progression',
    step1Scenario: '1) Scénario',
    scenarioIntro:
      'Nous sélectionnons automatiquement un composant “base” et des accessoires compatibles. Des prix transparents là où ils sont disponibles, sinon “sur demande”.',
    scenarioDemoButton: 'Démo',
    scenarioResearchButton: 'Recherche',
    scenarioIntegrationButton: 'Intégration',

    scenarioQuickLabel: 'Démo rapide',
    scenarioResearchLabel: 'Recherche & tests',
    scenarioIntegrationLabel: 'Intégration prête',

    totalEstimated: 'Total estimé',
    unknownPrices: 'Sur demande',
    unknownPriceHint: 'Au moins un composant est “prix sur demande”.',
    knownPricingHint: 'Estimation basée sur les prix confirmés.',

    step2KitComponents: '2) Composants du kit',

    kitAddedNotice: 'Kit ajouté ✅ (note enregistrée)',
    addKitToCart: 'Ajouter le kit au panier',

    step3RequestOptional: '3) Rédigez votre demande (optionnel)',
    notePlaceholder:
      'Exemple : confirmer la compatibilité, délais d’expédition, accessoires supplémentaires...',
    noteSavedText: 'La note est enregistrée et pré-remplit le formulaire du panier.',

    step4Gallery: '4) Galerie de la solution',

    imagePrev: 'Image précédente',
    imageNext: 'Image suivante',
  },

  nl: {
    menu: 'Menu',
    close: 'Sluiten',
    solutions: 'Oplossingen',
    shop: 'Winkel',
    blog: 'Blog',
    cart: 'Winkelwagen',
    admin: 'Admin',
    addToCart: 'In winkelwagen',
    requestInfo: 'Vraag informatie aan',
    requestInfoShort: 'INFORMATIE AANVRAGEN',
    priceOnRequest: 'Prijs op aanvraag',
    perUnit: 'per stuk',
    cartEmptyTitle: 'Winkelwagen is leeg',
    cartEmptyBody: 'Voeg producten toe om het totaal te zien.',
    remove: 'Verwijderen',
    total: 'Totaal',
    subtotalConfirmed: 'Subtotaal (alleen bevestigde prijzen)',
    payPal: 'PayPal-betaling',
    payPalDescriptionConfirmed: 'Je verzendt de betaling op basis van bevestigde prijzen.',
    payPalDescriptionDeposit: 'Je verzendt een aanbetaling voor het deel met bevestigde prijs.',
    payPalAmount: 'Bedrag',
    name: 'Volledige naam',
    email: 'E-mail',
    phone: 'Telefoon (optioneel)',
    notes: 'Notities / verzoeken',
    sendRequest: 'Verzoek verzenden',
    sending: 'Verzenden...',
    sent: 'Verzoek verzonden ✅',
    orderSendError: 'Fout bij het verzenden van de bestelling. Probeer opnieuw.',
    noOnlinePayment: 'Geen online betaling: we sturen het verzoek om beschikbaarheid en verzending te bevestigen.',
    viewRelatedSolution: 'Gerelateerde oplossing bekijken',
    seeSolutions: 'Ga naar oplossingen',

    shopTitle: 'Winkel',
    shopSubtitle: 'Unitree robots & accessoires, met prijzen en winkelwagen.',
    cartPageTitle: 'Winkelwagen',

    solutionsIndexLabel: 'Oplossingen voor automatisering',
    solutionsIndexH1: 'Kies je oplossing en configureer in 1 minuut',
    solutionsIndexP:
      'Duidelijke landing pages (mobile-first) met consistente afbeeldingen, geoptimaliseerde tekst en interactieve configuratie. Voeg daarna toe aan de winkelwagen en stuur je verzoek.',
    componentiLabel: 'Componenten',
    openLabel: 'Openen',

    blogBreadcrumb: 'Blog',
    solutionBreadcrumb: 'Oplossing',
    wantGoShopTitle: 'Wil je naar de winkel?',
    wantGoShopBody: 'Bekijk de producten en stel je kit samen met compatibele accessoires.',
    goShopCTA: 'Ga naar de winkel',
    viewSolutionCTA: 'Bekijk de oplossing',

    configurator: 'Configurator',
    progressLabel: 'Voortgang',
    step1Scenario: '1) Scenario',
    scenarioIntro:
      'We selecteren automatisch een “basis” component en compatibele accessoires. Transparante prijzen waar beschikbaar, anders “op aanvraag”.',
    scenarioDemoButton: 'Demo',
    scenarioResearchButton: 'Onderzoek',
    scenarioIntegrationButton: 'Integratie',

    scenarioQuickLabel: 'Snelle demo',
    scenarioResearchLabel: 'Onderzoek & tests',
    scenarioIntegrationLabel: 'Klaar voor integratie',

    totalEstimated: 'Geschat totaal',
    unknownPrices: 'Op aanvraag',
    unknownPriceHint: 'Minstens één component is “prijs op aanvraag”.',
    knownPricingHint: 'Schatting op basis van bevestigde prijzen.',

    step2KitComponents: '2) Kit-componenten',

    kitAddedNotice: 'Kit toegevoegd ✅ (notitie opgeslagen)',
    addKitToCart: 'Kit toevoegen aan winkelwagen',

    step3RequestOptional: '3) Schrijf je aanvraag (optioneel)',
    notePlaceholder:
      'Voorbeeld: compatibiliteit bevestigen, verzendtijden, extra accessoires...',
    noteSavedText: 'De notitie wordt opgeslagen en vult het winkelwagenformulier vooraf in.',

    step4Gallery: '4) Oplossing galerij',

    imagePrev: 'Vorige afbeelding',
    imageNext: 'Volgende afbeelding',
  },

  no: {
    menu: 'Meny',
    close: 'Lukk',
    solutions: 'Løsninger',
    shop: 'Butikk',
    blog: 'Blogg',
    cart: 'Handlekurv',
    admin: 'Admin',
    addToCart: 'Legg i handlekurv',
    requestInfo: 'Be om informasjon',
    requestInfoShort: 'BE OM INFORMASJON',
    priceOnRequest: 'Pris på forespørsel',
    perUnit: 'per stk',
    cartEmptyTitle: 'Handlekurven er tom',
    cartEmptyBody: 'Legg til produkter for å se totalen.',
    remove: 'Fjern',
    total: 'Total',
    subtotalConfirmed: 'Delsum (kun bekreftede priser)',
    payPal: 'PayPal-betaling',
    payPalDescriptionConfirmed: 'Du sender betalingen basert på bekreftede priser.',
    payPalDescriptionDeposit: 'Du sender et depositum for den bekreftede prisdelen.',
    payPalAmount: 'Beløp',
    name: 'Fullt navn',
    email: 'E-post',
    phone: 'Telefon (valgfritt)',
    notes: 'Notater / forespørsler',
    sendRequest: 'Send forespørsel',
    sending: 'Sender...',
    sent: 'Forespørsel sendt ✅',
    orderSendError: 'Feil ved sending av bestilling. Prøv igjen.',
    noOnlinePayment: 'Ingen nettbetaling: vi sender forespørselen for å bekrefte tilgjengelighet og frakt.',
    viewRelatedSolution: 'Se relatert løsning',
    seeSolutions: 'Gå til løsninger',

    shopTitle: 'Butikk',
    shopSubtitle: 'Unitree-roboter & tilbehør, med priser og handlekurv.',
    cartPageTitle: 'Handlekurv',

    solutionsIndexLabel: 'Løsninger for automatisering',
    solutionsIndexH1: 'Velg løsning og konfigurer på 1 minutt',
    solutionsIndexP:
      'Dedikerte landingssider (mobile-first) med konsistente bilder, optimalisert tekst og interaktiv konfigurasjon. Legg deretter i handlekurven og send forespørselen.',
    componentiLabel: 'Komponenter',
    openLabel: 'Åpne',

    blogBreadcrumb: 'Blogg',
    solutionBreadcrumb: 'Løsning',
    wantGoShopTitle: 'Vil du gå til butikken?',
    wantGoShopBody: 'Bla gjennom produktene og bygg ditt kit med kompatibelt tilbehør.',
    goShopCTA: 'Gå til butikken',
    viewSolutionCTA: 'Se løsningen',

    configurator: 'Konfigurator',
    progressLabel: 'Fremdrift',
    step1Scenario: '1) Scenario',
    scenarioIntro:
      'Vi velger automatisk en “base”-komponent og kompatible tilbehør. Transparente priser der det er tilgjengelig, ellers “på forespørsel”.',
    scenarioDemoButton: 'Demo',
    scenarioResearchButton: 'Forskning',
    scenarioIntegrationButton: 'Integrasjon',

    scenarioQuickLabel: 'Rask demo',
    scenarioResearchLabel: 'Forskning & tester',
    scenarioIntegrationLabel: 'Klar integrasjon',

    totalEstimated: 'Estimert total',
    unknownPrices: 'På forespørsel',
    unknownPriceHint: 'Minst én komponent er “pris på forespørsel”.',
    knownPricingHint: 'Estimert basert på bekreftede priser.',

    step2KitComponents: '2) Kit-komponenter',

    kitAddedNotice: 'Kit lagt til ✅ (notat lagret)',
    addKitToCart: 'Legg kit i handlekurv',

    step3RequestOptional: '3) Skriv forespørselen (valgfritt)',
    notePlaceholder:
      'Eksempel: bekreft kompatibilitet, leveringstid, ekstra tilbehør...',
    noteSavedText: 'Notatet lagres og fyller ut handlekurvskjemaet på forhånd.',

    step4Gallery: '4) Løsningsgalleri',

    imagePrev: 'Forrige bilde',
    imageNext: 'Neste bilde',
  },

  es: {
    menu: 'Menú',
    close: 'Cerrar',
    solutions: 'Soluciones',
    shop: 'Tienda',
    blog: 'Blog',
    cart: 'Carrito',
    admin: 'Admin',
    addToCart: 'Añadir al carrito',
    requestInfo: 'Solicitar información',
    requestInfoShort: 'SOLICITAR INFORMACIÓN',
    priceOnRequest: 'Precio bajo consulta',
    perUnit: 'por unidad',
    cartEmptyTitle: 'Carrito vacío',
    cartEmptyBody: 'Añade productos para ver el total.',
    remove: 'Eliminar',
    total: 'Total',
    subtotalConfirmed: 'Subtotal (solo precios confirmados)',
    payPal: 'Pago con PayPal',
    payPalDescriptionConfirmed: 'Estás enviando el pago basado en precios confirmados.',
    payPalDescriptionDeposit: 'Estás enviando un depósito para la parte con precio confirmado.',
    payPalAmount: 'Importe',
    name: 'Nombre completo',
    email: 'Correo electrónico',
    phone: 'Teléfono (opcional)',
    notes: 'Notas / solicitudes',
    sendRequest: 'Enviar solicitud',
    sending: 'Enviando...',
    sent: 'Solicitud enviada ✅',
    orderSendError: 'Error al enviar la orden. Inténtalo de nuevo.',
    noOnlinePayment: 'Sin pago en línea: enviamos la solicitud para confirmar disponibilidad y envío.',
    viewRelatedSolution: 'Ver solución relacionada',
    seeSolutions: 'Ir a las soluciones',

    shopTitle: 'Tienda',
    shopSubtitle: 'Robots Unitree y accesorios, con precios y carrito.',
    cartPageTitle: 'Carrito',

    solutionsIndexLabel: 'Soluciones para la automatización',
    solutionsIndexH1: 'Elige tu solución y configúrala en 1 minuto',
    solutionsIndexP:
      'Landings dedicadas (mobile-first) con imágenes coherentes, texto optimizado y configuración interactiva. Luego añádelo al carrito y envía tu solicitud.',
    componentiLabel: 'Componentes',
    openLabel: 'Abrir',

    blogBreadcrumb: 'Blog',
    solutionBreadcrumb: 'Solución',
    wantGoShopTitle: '¿Quieres ir a la tienda?',
    wantGoShopBody: 'Explora los productos y crea tu kit con accesorios compatibles.',
    goShopCTA: 'Ir a la tienda',
    viewSolutionCTA: 'Ver la solución',

    configurator: 'Configurador',
    progressLabel: 'Progreso',
    step1Scenario: '1) Escenario',
    scenarioIntro:
      'Seleccionamos automáticamente un componente “base” y accesorios compatibles. Precios transparentes cuando están disponibles, si no “bajo consulta”.',
    scenarioDemoButton: 'Demo',
    scenarioResearchButton: 'Investigación',
    scenarioIntegrationButton: 'Integración',

    scenarioQuickLabel: 'Demo rápida',
    scenarioResearchLabel: 'Investigación y pruebas',
    scenarioIntegrationLabel: 'Integración lista',

    totalEstimated: 'Total estimado',
    unknownPrices: 'Bajo consulta',
    unknownPriceHint: 'Al menos un componente es “precio bajo consulta”.',
    knownPricingHint: 'Estimación basada en precios confirmados.',

    step2KitComponents: '2) Componentes del kit',

    kitAddedNotice: 'Kit añadido ✅ (nota guardada)',
    addKitToCart: 'Añadir kit al carrito',

    step3RequestOptional: '3) Escribe tu solicitud (opcional)',
    notePlaceholder:
      'Ejemplo: confirma compatibilidad, tiempos de envío, accesorios adicionales...',
    noteSavedText: 'La nota se guarda y precompleta el formulario del carrito.',

    step4Gallery: '4) Galería de la solución',

    imagePrev: 'Imagen anterior',
    imageNext: 'Imagen siguiente',
  },
};

export function t(locale: Locale, key: I18nKey): string {
  return DICT[locale]?.[key] ?? DICT.it[key];
}

export function detectLocaleFromLanguageTag(tag: string | null | undefined): Locale {
  if (!tag) return 'it';
  const first = tag.split(',')?.[0]?.trim().toLowerCase() ?? '';
  if (first.startsWith('de')) return 'de';
  if (first.startsWith('fr')) return 'fr';
  if (first.startsWith('nl')) return 'nl';
  if (first.startsWith('no') || first.startsWith('nb') || first.startsWith('nn')) return 'no';
  if (first.startsWith('es')) return 'es';
  if (first.startsWith('en')) return 'en';
  if (first.startsWith('it')) return 'it';
  return 'it';
}

export function normalizeLocale(maybe: string | null | undefined): Locale {
  const v = (maybe ?? '').toLowerCase();
  if (v === 'en') return 'en';
  if (v === 'it') return 'it';
  if (v === 'de') return 'de';
  if (v === 'fr') return 'fr';
  if (v === 'nl') return 'nl';
  if (v === 'no') return 'no';
  if (v === 'es') return 'es';
  return 'it';
}
