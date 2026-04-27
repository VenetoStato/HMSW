import type { Product } from './types';
import type { Locale } from './i18n';
import { SOLUTIONS_I18N } from './solutionsI18n';

export type SolutionDefinition = {
  slug: string;
  title: string;
  seoDescription: string;
  heroCopy: string;
  familyLabel: string;
  bullets: string[];
  fallbackCategories: string[];
  keywordHints: string[];
  imageSearchHints: string[];
  // Negative keywords used to avoid mixing in unrelated products (e.g. dexterous hands in CNC tending)
  negativeKeywordHints?: string[];
  kitScenarioLabels: {
    demo: string;
    rd: string;
    integrato: string;
  };

  // Accent gradient colors (RGB triplets without commas), used for dynamic section backgrounds
  accentRgb?: {
    a: string; // e.g. "56 189 248"
    b: string;
    c: string;
  };

  // Sezioni copy-conversion per landing "macro" (opzionali per non rompere le definizioni esistenti)
  include?: {
    title: string;
    bullets: string[];
  };
  audience?: {
    title: string;
    bullets: string[];
  };
  integration?: {
    title: string;
    bullets: string[];
  };
  faq?: {
    q: string;
    a: string;
  }[];
};

export const SOLUTIONS: SolutionDefinition[] = [
  {
    slug: 'quadrupedi',
    title: 'Quadrupedi Unitree',
    seoDescription:
      'Soluzione Quadrupedi per demo, ricerca e setup rapido: scegli il modello e completa la configurazione con accessori compatibili per partire subito.',
    heroCopy:
      'Se vuoi mobilità e autonomia in scenari dinamici, configura il tuo kit Quadrupedi e aggiungi i componenti necessari direttamente al carrello.',
    familyLabel: 'Mobile robots / Quadrupedi',
    accentRgb: { a: '56 189 248', b: '99 102 241', c: '16 185 129' },
    bullets: [
      'Mobilità e gestione dei percorsi in scenari variabili',
      'Kit configurabile per ricerca e dimostrazioni',
      'Selezione di componenti di supporto in base al tuo scenario',
    ],
    fallbackCategories: ['Mobile robots'],
    keywordHints: ['go2', 'go1', 'b2', 'b2w', 'quadruped', 'self-charging', 'charger', 'battery', 'lidar', 'remote-controller'],
    imageSearchHints: ['quadruped', 'go2', 'robot', 'self-charging', 'mobile robot'],
    kitScenarioLabels: {
      demo: 'Demo & mobilità',
      rd: 'R&D e test',
      integrato: 'Setup pronto',
    },
    include: {
      title: 'Cosa include',
      bullets: [
        'Un quadrupede selezionato dal catalogo in base alla compatibilità',
        'Componenti di supporto per rendere il setup operativo (quando disponibili)',
        'Configurazione guidata dal configuratore a scenario (Demo/Ricerca/Integrazione)',
      ],
    },
    audience: {
      title: 'Per chi è',
      bullets: [
        'Team R&D e prototipazione di robot mobili',
        'Ricerca su locomozione, sensing e interazione in campo',
        'Demo, formazione e proof-of-concept',
      ],
    },
    integration: {
      title: 'Integrazione',
      bullets: [
        'Selezione componenti coerenti con la soluzione scelta',
        'Prezzi trasparenti dove presenti, altrimenti “su richiesta”',
        'Carrello e richiesta per conferma disponibilità e spedizione',
      ],
    },
    faq: [
      {
        q: 'Come scelgo tra GO2, B2 e GO1?',
        a: 'Parti dallo scenario (Demo, Ricerca o Integrazione) e dalla compatibilità nel tuo setup. Poi completa con gli accessori nel configuratore e verifica i componenti disponibili nel carrello.',
      },
      {
        q: 'I prezzi sono definitivi?',
        a: 'Nel carrello vedi i prezzi confermati dove disponibili; per componenti “su richiesta” il totale viene gestito in fase di conferma dell’ordine.',
      },
      {
        q: 'Posso usare solo il robot senza accessori?',
        a: 'Sì: puoi aggiungere dal configuratore solo i componenti necessari. Il carrello ti permette comunque di inviare la richiesta e finalizzare la configurazione.',
      },
    ],
  },
  {
    slug: 'braccia',
    title: 'Braccia & Gripper Unitree',
    seoDescription:
      'Soluzione Braccia & Gripper per presa, assemblaggio e manipolazione: scegli il sistema e completa con accessori compatibili per integrare più velocemente.',
    heroCopy:
      'Costruisci il tuo kit Braccia/Gripper con componenti coerenti e aggiungili al carrello: poi invia la richiesta con la configurazione completa.',
    familyLabel: 'Manipolazione / Robotic arms',
    accentRgb: { a: '236 72 153', b: '244 63 94', c: '99 102 241' },
    bullets: [
      'Presa e manipolazione orientate al task',
      'Kit configurabile con componenti compatibili',
      'Integrazione più rapida grazie a una selezione guidata',
    ],
    fallbackCategories: ['Robotic arms', 'Robotic gripper'],
    keywordHints: ['arm', 'gripper', 'z1', 'dex', 'tactile', 'robotic-arm', 'd405', 'd435'],
    imageSearchHints: ['robot arm', 'gripper', 'dex', 'tactile', 'end effector'],
    kitScenarioLabels: {
      demo: 'Demo di manipolazione',
      rd: 'Ricerca & prove',
      integrato: 'Integrazione pronta',
    },
    include: {
      title: 'Cosa include',
      bullets: [
        'Un braccio/gripper come base del kit',
        'Accessori compatibili selezionati in base allo scenario',
        'Configurazione guidata per aggiungere al carrello i componenti scelti',
      ],
    },
    audience: {
      title: 'Per chi è',
      bullets: [
        'Integrazione di celle robotiche e prototipi',
        'Progetti di presa, assemblaggio e manipolazione',
        'Team che vogliono ridurre tempi di setup e test',
      ],
    },
    integration: {
      title: 'Integrazione',
      bullets: [
        'Selezione componenti coerenti con la soluzione scelta',
        'Prezzi confermati dove disponibili, altrimenti “su richiesta”',
        'Richiesta dal carrello per confermare disponibilità e spedizione',
      ],
    },
    faq: [
      {
        q: 'Posso cambiare la composizione del kit?',
        a: 'Sì: nel configuratore puoi selezionare lo scenario e aggiungere i componenti al carrello. Da lì finalizzi la richiesta con i dettagli necessari.',
      },
      {
        q: 'Come gestite la compatibilità?',
        a: 'La landing usa matching per categorie e keyword e ti mostra i componenti nel carrello. La conferma finale avviene in fase di gestione richiesta.',
      },
    ],
  },
  {
    slug: 'umanoidi',
    title: 'Umanoidi Unitree',
    seoDescription:
      'Soluzione Umanoidi per educazione, R&D e dimostrazioni: scegli lo scenario e completa il setup con componenti compatibili per partire subito.',
    heroCopy:
      'Quando serve flessibilità per training, demo e sviluppo: configura un kit Umanoidi e aggiungilo al carrello con i componenti necessari.',
    familyLabel: 'Humanoid robots',
    accentRgb: { a: '52 211 153', b: '20 184 166', c: '99 102 241' },
    bullets: [
      'Task ripetibili per prove e dimostrazioni',
      'Setup orientato a iterazioni rapide',
      'Kit selezionato in base a scenario e disponibilità',
    ],
    fallbackCategories: ['Humanoid robots'],
    keywordHints: ['h2', 'humanoid', 'unitree', 'dex', 'dex-1', 'revo', 'brainco', 'umano'],
    imageSearchHints: ['humanoid robot', 'unitree', 'h2', 'dex'],
    kitScenarioLabels: {
      demo: 'Demo & training',
      rd: 'Ricerca & prove',
      integrato: 'Integrazione pronta',
    },
    include: {
      title: 'Cosa include',
      bullets: [
        'Umanoide selezionato come base del kit',
        'Componenti compatibili selezionati dal configuratore',
        'Stima totale: prezzi confermati dove disponibili, altrimenti “su richiesta”',
      ],
    },
    audience: {
      title: 'Per chi è',
      bullets: [
        'Educazione e formazione tecnica',
        'R&D e prototipazione',
        'Demo e proof-of-concept in contesti controllati',
      ],
    },
    integration: {
      title: 'Integrazione',
      bullets: [
        'Selezione componenti coerenti con lo scenario scelto',
        'Carrello per inviare la richiesta e completare la configurazione',
        'Supporto nella gestione disponibilità/spedizione in fase di conferma',
      ],
    },
    faq: [
      {
        q: 'Questa soluzione è adatta a R&D?',
        a: 'Sì: la configurazione è pensata per iterazioni rapide. Nel carrello vedi i componenti selezionati e puoi inviare la richiesta per la conferma finale.',
      },
    ],
  },
  {
    slug: 'accessori',
    title: 'Accessori per il tuo setup robotico',
    seoDescription:
      'Accessori e componenti chiave per alimentazione, supporto e completamento del setup: completa la configurazione con un kit guidato dallo scenario.',
    heroCopy:
      'Prepara un setup stabile e operativo: seleziona gli accessori compatibili e aggiungili al carrello per inviare la richiesta con i dettagli della configurazione.',
    familyLabel: 'Accessori / alimentazione e supporto',
    accentRgb: { a: '251 191 36', b: '59 130 246', c: '244 63 94' },
    bullets: [
      'Componenti di supporto per mantenere continuità operativa',
      'Kit selezionato per completare la configurazione',
      'Prezzi confermati dove disponibili, altrimenti su richiesta',
    ],
    fallbackCategories: ['Robotic arms', 'Mobile robots', 'Programmable drones', 'Service robots', 'Robotic gripper'],
    keywordHints: ['battery', 'charger', 'dock', 'power', 'accessory', 'controller', 'cable', 'sensor', 'workstation'],
    imageSearchHints: ['battery', 'charger', 'power supply', 'dock', 'accessories'],
    kitScenarioLabels: {
      demo: 'Demo operativo',
      rd: 'Test e validazione',
      integrato: 'Setup pronto all’uso',
    },
    include: {
      title: 'Cosa include',
      bullets: [
        'Componenti di supporto selezionati per completare il tuo setup',
        'Selezione guidata dal configuratore per scenario e disponibilità',
        'Carrello per inviare la richiesta e confermare i dettagli finali',
      ],
    },
    audience: {
      title: 'Per chi è',
      bullets: [
        'Chi vuole completare il setup senza scegliere a tentativi',
        'Team che preparano demo, test e prototipi',
        'Ingegneri/tecnici che vogliono una configurazione coerente',
      ],
    },
    integration: {
      title: 'Integrazione',
      bullets: [
        'Matching per categorie e keyword per proporre componenti compatibili',
        'Prezzi trasparenti dove disponibili, altrimenti “su richiesta”',
        'Conferma disponibilità/spedizione tramite richiesta dal carrello',
      ],
    },
    faq: [
      {
        q: 'Come faccio a sapere quali accessori mi servono?',
        a: 'Inizia dallo scenario (Demo/Ricerca/Integrazione) e aggiungi al carrello i componenti suggeriti. La richiesta finale serve per verificare la configurazione.',
      },
    ],
  },
  {
    slug: 'cobot-pick-and-place',
    title: 'Cobot Pick & Place',
    seoDescription:
      'Soluzione Cobot per presa, posizionamento e movimentazione pezzi con layout flessibile e tempi di setup ridotti.',
    heroCopy:
      'Riduci i tempi di automazione: un flusso pick/place pensato per integrarsi velocemente in linee nuove o esistenti.',
    familyLabel: 'Cobot / manipolazione',
    bullets: [
      'Niente colli di bottiglia: presa e posizionamento in sequenza',
      'Configura la configurazione con accessori e compatibilità',
      'Riduci i tempi di integrazione con componenti “pronti”',
    ],
    fallbackCategories: ['Robotic arms', 'Robotic gripper'],
    keywordHints: ['pick', 'place', 'gripper', 'pneumatic', 'vacuum', 'suction', 'end effector', 'assembly'],
    imageSearchHints: ['robot arm', 'gripper', 'vacuum', 'pick', 'place'],
    kitScenarioLabels: {
      demo: 'Demo rapida',
      rd: 'Ricerca & prove',
      integrato: 'Integrazione pronta',
    },
  },
  {
    slug: 'cobot-machine-tending',
    title: 'Cobot Machine Tending (CNC / presse)',
    seoDescription:
      'Cobot per alimentazione e scarico macchina: riduci fermo impianto e ottimizza i cicli di produzione.',
    heroCopy:
      'Dal caricamento pezzi allo scarico: un setup pensato per gestire ritmi macchina e mantenere la produzione continua.',
    familyLabel: 'Cobot / tending',
    bullets: ['Supporto a workflow di scarico/carico', 'Riduzione dei tempi di attesa', 'Kit configurabile per processo e accessori'],
    fallbackCategories: ['Robotic arms'],
    keywordHints: ['tending', 'cpc', 'cnc', 'press', 'machine', 'loading', 'unloading', 'workholding'],
    imageSearchHints: ['robot', 'automation', 'industrial'],
    // Evita di mostrare “mani dexterous” (end-effector humanoidi) nella tending per CNC/presse.
    negativeKeywordHints: ['dexterous hand', 'dexterous', 'dex3', 'dex3-1', 'dex3-1 force-controlled', 'three- finger dexterous hand'],
    kitScenarioLabels: {
      demo: 'Demo in tempi rapidi',
      rd: 'Validazione processo',
      integrato: 'Integrazione line-ready',
    },
  },
  {
    slug: 'cobot-palletizing-depalletizing',
    title: 'Cobot Palletizing / Depalletizing',
    seoDescription:
      'Cobot per pallettizzazione e depallettizzazione: riduci sprechi e standardizza la manipolazione in magazzino/linea.',
    heroCopy:
      'Semplifica le operazioni di trasferimento e impilaggio: gestisci volumi con un setup pensato per ripetibilità.',
    familyLabel: 'Cobot / pallet',
    bullets: ['Movimentazione ripetibile', 'Setup scalabile per diverse taglie', 'Componenti e accessori per impilaggio stabile'],
    fallbackCategories: ['Robotic arms', 'Mobile robots'],
    keywordHints: ['pallet', 'stack', 'depallet', 'box', 'case', 'pack', 'handling'],
    imageSearchHints: ['pallet', 'robot arm', 'warehouse', 'stack'],
    kitScenarioLabels: {
      demo: 'Demo di manipolazione',
      rd: 'Prove di layout',
      integrato: 'Kit per ripetibilità',
    },
  },
  {
    slug: 'cobot-screwdriving-assembly-light',
    title: 'Cobot Screwdriving & Assembly leggero',
    seoDescription:
      'Soluzione Cobot per avvitatura e assemblaggio leggero: controllo coppia, ripetibilità e integrazione facile.',
    heroCopy:
      'Dalla guida ai piccoli interventi: una base pronta per avvitatura, montaggi e task ripetibili in produzione.',
    familyLabel: 'Cobot / assembly',
    bullets: ['Avvitatura e montaggio ripetuti', 'Riduzione scarti e rilavorazioni', 'Kit ottimizzato per task di precisione'],
    fallbackCategories: ['Robotic arms', 'Robotic gripper'],
    keywordHints: ['screw', 'screwdriver', 'driving', 'assembly', 'torque', 'fastening'],
    imageSearchHints: ['precision', 'robot arm', 'assembly'],
    kitScenarioLabels: {
      demo: 'Demo controllata',
      rd: 'Validazione precisione',
      integrato: 'Integrazione di processo',
    },
  },
  {
    slug: 'cobot-welding-dispensing-finishing',
    title: 'Cobot Welding / Dispensing / Finishing',
    seoDescription:
      'Cobot per saldatura, distribuzione e finitura: aumenta consistenza e produttività con configurazioni flessibili.',
    heroCopy:
      'Riduci variabilità e tempi di intervento: un kit che aiuta a portare il processo in produzione con meno prove.',
    familyLabel: 'Cobot / processi',
    bullets: ['Stabilità di processo', 'Riduzione tempi di setup', 'Supporto a task di finitura e rilascio'],
    fallbackCategories: ['Robotic arms'],
    keywordHints: ['welding', 'dispensing', 'finishing', 'seal', 'coating', 'spray', 'apply'],
    imageSearchHints: ['welding', 'industrial', 'robot arm'],
    kitScenarioLabels: {
      demo: 'Demo processo',
      rd: 'Ottimizzazione parametri',
      integrato: 'Integrazione robusta',
    },
  },
  {
    slug: 'amr-trasporto-tote-cassette-semilavorati',
    title: 'AMR Trasporto tote / cassette / semilavorati',
    seoDescription:
      'AMR per trasporto: tote, cassette e semilavorati tra aree produttive con continuità operativa.',
    heroCopy:
      'Riduci gli spostamenti manuali: l’AMR ottimizza i flussi interni e rende più fluide le consegne in linea.',
    familyLabel: 'AMR / intralogistica',
    bullets: ['Percorsi ottimizzati e routing', 'Riduzione interruzioni tra reparti', 'Kit pronto per integrazione logistica'],
    fallbackCategories: ['Mobile robots'],
    keywordHints: ['amr', 'transport', 'tote', 'cassette', 'buffer', 'semi', 'material', 'move'],
    imageSearchHints: ['amr', 'mobile robot', 'warehouse', 'tote'],
    kitScenarioLabels: {
      demo: 'Demo in area',
      rd: 'Ricerca routing',
      integrato: 'Line integration',
    },
  },
  {
    slug: 'amr-line-side-replenishment-kitting',
    title: 'AMR Line-side replenishment / kitting',
    seoDescription:
      'AMR per replenishment e kitting: consegne just-in-time e riduzione dei fermi linea.',
    heroCopy:
      'Gestisci scorte e kit in modo dinamico: l’AMR consegna al momento giusto, nel punto giusto.',
    familyLabel: 'AMR / replenishment',
    bullets: ['Kitting e consegne coordinate', 'Riduci carenze e overstock', 'Setup flessibile per layout variabili'],
    fallbackCategories: ['Mobile robots', 'Service robots'],
    keywordHints: ['replenishment', 'kitting', 'line-side', 'just', 'in-time', 'kit', 'delivery'],
    imageSearchHints: ['warehouse', 'mobile robot', 'delivery'],
    kitScenarioLabels: {
      demo: 'Demo replenishment',
      rd: 'Prove di flusso',
      integrato: 'Integrazione kitting',
    },
  },
  {
    slug: 'amr-tugger-traino-carrelli',
    title: 'AMR Tugger / traino carrelli',
    seoDescription:
      'AMR per traino carrelli: gestisci movimentazione accessori e carrelli con integrazione semplice.',
    heroCopy:
      'Ottimizza il traino di carrelli e la gestione dei collegamenti in area operativa con meno manovre.',
    familyLabel: 'AMR / traino',
    bullets: ['Traino e movimentazione carrelli', 'Riduci stress operatore', 'Kit per scenario logistico'],
    fallbackCategories: ['Mobile robots'],
    keywordHints: ['tug', 'tugger', 'train', 'carrello', 'trailer', 'pull'],
    imageSearchHints: ['tug', 'mobile robot', 'logistics'],
    kitScenarioLabels: {
      demo: 'Demo traino',
      rd: 'Validazione area',
      integrato: 'Asservimento',
    },
  },
  {
    slug: 'amr-inventory-scanning-warehouse-support',
    title: 'AMR Inventory scanning / warehouse support',
    seoDescription:
      'AMR per scanning inventario e supporto magazzino: aumenta accuratezza e velocità delle verifiche.',
    heroCopy:
      'Riduci tempi e errori: l’AMR supporta scanning e attività di magazzino con percorso programmato.',
    familyLabel: 'AMR / scanning',
    bullets: ['Scansione e controllo', 'Supporto a procedure di warehouse', 'Kit per integrazione sensori e flussi'],
    fallbackCategories: ['Mobile robots'],
    keywordHints: ['inventory', 'scan', 'scanning', 'warehouse', 'inspection', 'barcode', 'rfid'],
    imageSearchHints: ['scanner', 'warehouse', 'robot'],
    kitScenarioLabels: {
      demo: 'Demo scanning',
      rd: 'Test percorso',
      integrato: 'Warehouse support',
    },
  },
  {
    slug: 'amr-cobot-machine-tending-multi-macchina',
    title: 'AMR + Cobot: Machine tending multi-macchina',
    seoDescription:
      'Soluzione AMR + Cobot per tending multi-macchina: trasferimento tra stazioni e continuità dei cicli.',
    heroCopy:
      'Quando serve coprire più postazioni: AMR per spostamento e Cobot per operazioni di tending.',
    familyLabel: 'AMR+Cobot / multi-macchina',
    bullets: ['Copertura multi-stazione', 'Riduzione fermi e attese', 'Integrazione modulare per scenario'],
    fallbackCategories: ['Mobile robots', 'Robotic arms'],
    keywordHints: ['multi', 'multi-machine', 'tending', 'transfer', 'station'],
    imageSearchHints: ['mobile robot', 'robot arm', 'handover'],
    kitScenarioLabels: {
      demo: 'Demo multi-stazione',
      rd: 'Ottimizzazione flusso',
      integrato: 'Integrazione completa',
    },
  },
  {
    slug: 'amr-cobot-pick-place-mobile-between-stations-inspection-transfer',
    title: 'AMR + Cobot: Pick/place mobile tra stazioni / inspection transfer',
    seoDescription:
      'Soluzione AMR + Cobot per trasferimento pezzi tra stazioni e task di inspection: flusso continuo e gestibile.',
    heroCopy:
      'Riduci micro-pause tra operazioni: AMR sposta e Cobot gestisce presa/posizionamento o ispezione.',
    familyLabel: 'AMR+Cobot / pick/place transfer',
    bullets: ['Handover controllato', 'Riduci tempi tra processi', 'Kit per trasferimento e ispezione'],
    fallbackCategories: ['Mobile robots', 'Robotic arms', 'Humanoid robots'],
    keywordHints: ['inspection', 'transfer', 'handover', 'pick', 'place', 'mobile'],
    imageSearchHints: ['transfer', 'handover', 'robot arm', 'mobile robot'],
    kitScenarioLabels: {
      demo: 'Demo transfer',
      rd: 'Test sicurezza e flow',
      integrato: 'Setup di produzione',
    },
  },
  {
    slug: 'amr-cobot-modula-line-asservimento',
    title: 'AMR + Cobot: Collegamento a Modula per asservimento linee',
    seoDescription:
      'Collegamento AMR + Cobot a Modula per asservimento: sincronizza task e flusso tra moduli della linea.',
    heroCopy:
      'Se hai una linea modulare: un percorso per asservire stazioni e trasferimenti con un kit pronto alla configurazione.',
    familyLabel: 'AMR+Cobot / line asservimento',
    bullets: ['Sincronizzazione tra moduli', 'Riduzione tempi di setup', 'Kit adatto a linee modulari'],
    fallbackCategories: ['Mobile robots', 'Robotic arms'],
    keywordHints: ['modula', 'line', 'asservimento', 'sync', 'module', 'sequencing'],
    imageSearchHints: ['modula', 'factory line', 'robot'],
    kitScenarioLabels: {
      demo: 'Demo integrazione',
      rd: 'Test sequenze',
      integrato: 'Asservimento line-ready',
    },
  },
  {
    slug: 'humanoid-g1-object-handling-logistica',
    title: 'Umanoide G1: Object handling in logistica',
    seoDescription:
      'Umanoide tipo Unitree G1 per handling oggetti in logistica: presa flessibile, task ripetibili e gestione percorsi.',
    heroCopy:
      'Quando serve flessibilità: un umanoide che gestisce oggetti in logistica e semplifica consegne e prelievi.',
    familyLabel: 'Humanoid / logistica',
    bullets: ['Presa flessibile e adattiva', 'Task ripetibili con layout variabile', 'Kit sviluppo e prove rapide'],
    fallbackCategories: ['Humanoid robots'],
    keywordHints: ['g1', 'unitree', 'object', 'handling', 'logistics', 'pick', 'place'],
    imageSearchHints: ['humanoid robot', 'unitree', 'g1'],
    kitScenarioLabels: {
      demo: 'Demo handling',
      rd: 'Ricerca motion',
      integrato: 'Setup task-ready',
    },
  },
  {
    slug: 'humanoid-g1-automotive-line-side-delivery',
    title: 'Umanoide G1: Line-side material delivery (automotive)',
    seoDescription:
      'Umanoide G1 per consegne line-side in automotive: task semplici, velocità operativa e gestione varianti.',
    heroCopy:
      'Trasporta e consegna materiali per supportare le linee automotive: meno micro-azioni manuali, più continuità.',
    familyLabel: 'Humanoid / automotive',
    bullets: ['Consegne line-side', 'Gestione varianti in modo guidato', 'Kit per task semplici ma affidabili'],
    fallbackCategories: ['Humanoid robots'],
    keywordHints: ['automotive', 'line-side', 'delivery', 'material', 'unitree', 'g1'],
    imageSearchHints: ['unitree', 'g1', 'factory'],
    kitScenarioLabels: {
      demo: 'Demo consegna',
      rd: 'Test procedure',
      integrato: 'Integrazione task',
    },
  },
  {
    slug: 'humanoid-g1-general-purpose-platform-development',
    title: 'Umanoide G1: General purpose & piattaforma di sviluppo',
    seoDescription:
      'Piattaforma di sviluppo con umanoide G1 per manipolazione general purpose e prototipazione rapida.',
    heroCopy:
      'Sviluppa e valida: un ecosistema pronto per iterare applicazioni di manipolazione e dimostrazioni.',
    familyLabel: 'Humanoid / sviluppo',
    bullets: ['General purpose manipulation', 'Ambiente pronto per sviluppo e demo', 'Componenti e accessori chiave'],
    fallbackCategories: ['Humanoid robots'],
    keywordHints: ['development', 'platform', 'general', 'manipulation', 'g1', 'unitree'],
    imageSearchHints: ['humanoid', 'unitree g1', 'development'],
    kitScenarioLabels: {
      demo: 'Demo sviluppo',
      rd: 'Prove R&D',
      integrato: 'Integrazione completa',
    },
  },
  {
    slug: 'quadrupede-industrial-inspection-impianti',
    title: 'Quadrupede: Inspection industriale di impianti',
    seoDescription:
      'Quadrupede per ispezione industriale: monitora impianti e riduci accessi non necessari con una piattaforma mobile.',
    heroCopy:
      'Ispeziona in modo rapido e ripetibile: perfetto per ambienti complessi e per ridurre tempi di fermo manutentivo.',
    familyLabel: 'Quadrupede / inspection',
    bullets: ['Ispezione industriale', 'Riduzione accessi e tempi', 'Kit per task di monitoraggio'],
    fallbackCategories: ['Mobile robots'],
    keywordHints: ['inspection', 'industrial', 'impianti', 'monitor', 'remote', 'utility'],
    imageSearchHints: ['quadruped', 'robot', 'inspection'],
    kitScenarioLabels: {
      demo: 'Demo sopralluogo',
      rd: 'R&D su sensori',
      integrato: 'Setup operativo',
    },
  },
  {
    slug: 'quadrupede-power-inspection-utility-remote-areas',
    title: 'Quadrupede: Power inspection / utility / aree remote',
    seoDescription:
      'Quadrupede per ispezioni power e utility: raggiungi aree remote e riduci rischi e tempi di intervento.',
    heroCopy:
      'Quando servono accesso e autonomia: il quadrupede supporta ispezioni in aree difficili con maggiore sicurezza.',
    familyLabel: 'Quadrupede / power',
    bullets: ['Ispezione in aree remote', 'Riduci tempi di intervento', 'Kit pensato per autonomia e gestione task'],
    fallbackCategories: ['Mobile robots'],
    keywordHints: ['power', 'utility', 'remote', 'inspection', 'area', 'line'],
    imageSearchHints: ['utility', 'remote', 'quadruped', 'inspection'],
    kitScenarioLabels: {
      demo: 'Demo remote',
      rd: 'Test autonomia',
      integrato: 'Operativo utility',
    },
  },
  {
    slug: 'quadrupede-security-patrol',
    title: 'Quadrupede: Security / Patrol',
    seoDescription:
      'Quadrupede per security e patrol: monitoraggio e presenza mobile per aree e perimetri.',
    heroCopy:
      'Sorveglianza con mobilità: pattuglia e ispeziona con un setup che supporta procedure di controllo e reporting.',
    familyLabel: 'Quadrupede / security',
    bullets: ['Patrol e monitoraggio', 'Riduzione rischi in accessi', 'Integrazione sensori e task'],
    fallbackCategories: ['Mobile robots'],
    keywordHints: ['security', 'patrol', 'surveillance', 'monitoring', 'perimeter'],
    imageSearchHints: ['security', 'patrol', 'quadruped robot'],
    kitScenarioLabels: {
      demo: 'Demo patrol',
      rd: 'Test percorsi',
      integrato: 'Setup security-ready',
    },
  },
  {
    slug: 'quadrupede-with-arm-valves-levers-small-interventions',
    title: 'Quadrupede con braccio: valvole, leve, piccoli interventi',
    seoDescription:
      'Quadrupede con braccio per interventi localizzati: gestione valvole, leve e task di manutenzione leggera.',
    heroCopy:
      'Unire mobilità e manipolazione: quando serve raggiungere e intervenire su componenti con precisione.',
    familyLabel: 'Quadrupede + braccio',
    bullets: ['Interventi localizzati', 'Riduci passaggi e interventi manuali', 'Kit per task leggeri e ripetibili'],
    fallbackCategories: ['Mobile robots', 'Robotic arms'],
    keywordHints: ['arm', 'braccio', 'valve', 'valvole', 'lever', 'leve', 'intervention', 'small'],
    imageSearchHints: ['quadruped', 'robot arm', 'valve', 'intervention'],
    kitScenarioLabels: {
      demo: 'Demo intervento',
      rd: 'Prove precisione',
      integrato: 'Kit operabile',
    },
  },
];

const normalize = (s: string) => s.toLowerCase();

function includesAny(haystack: string, needles: string[]) {
  for (const n of needles) {
    if (!n) continue;
    if (haystack.includes(n)) return true;
  }
  return false;
}

export function getLocalizedSolution(solution: SolutionDefinition, locale: Locale): SolutionDefinition {
  const overrides =
    SOLUTIONS_I18N[locale]?.[solution.slug] ?? SOLUTIONS_I18N.en?.[solution.slug];
  if (!overrides) return solution;

  return {
    ...solution,
    title: overrides.title ?? solution.title,
    familyLabel: overrides.familyLabel ?? solution.familyLabel,
    heroCopy: overrides.heroCopy ?? solution.heroCopy,
    seoDescription: overrides.seoDescription ?? solution.seoDescription,
    bullets: overrides.bullets ?? solution.bullets,
    include: overrides.include ?? solution.include,
    audience: overrides.audience ?? solution.audience,
    integration: overrides.integration ?? solution.integration,
    faq: overrides.faq ?? solution.faq,
  } as SolutionDefinition;
}

export function matchProductsForSolution(solution: SolutionDefinition, products: Product[]): Product[] {
  // IMPORTANT: in products.json solutionSlug is broad (quadrupedi/braccia/umanoidi/accessori).
  // The detailed /soluzioni/[slug] scenarios must be matched with stronger family restriction,
  // otherwise the keyword fallback mixes wrong products/images.

  const familySlugs = new Set<string>();
  for (const c of solution.fallbackCategories) {
    const lc = c.toLowerCase();
    if (lc.includes('mobile')) familySlugs.add('quadrupedi');
    else if (lc.includes('humanoid')) familySlugs.add('umanoidi');
    else if (lc.includes('arm') || lc.includes('gripper')) familySlugs.add('braccia');
    else if (lc.includes('drone') || lc.includes('service') || lc.includes('accessor') || lc.includes('charg')) familySlugs.add('accessori');
  }
  if (familySlugs.size === 0) familySlugs.add('accessori');

  const negativeNeedles = (solution.negativeKeywordHints ?? []).map(normalize).filter(Boolean);

  const familyCandidates = products
    .filter((p) => familySlugs.has(p.solutionSlug))
    .filter((p) => {
      if (!negativeNeedles.length) return true;
      const hay = normalize([p.name, p.shortDescription, p.category, p.brand].filter(Boolean).join(' '));
      return !includesAny(hay, negativeNeedles);
    });

  // If we have exact matches (rare, but keep deterministic behavior)
  const explicit = familyCandidates.filter((p) => p.solutionSlug === solution.slug);
  if (explicit.length) {
    return explicit
      .slice()
      .sort((a, b) => (b.priceEur ?? 0) - (a.priceEur ?? 0) || a.name.localeCompare(b.name))
      .slice(0, 12);
  }

  // Fallback: keyword scoring within the right family only
  const primaryKeywords = solution.keywordHints.map(normalize).filter(Boolean);
  const secondaryKeywords = solution.imageSearchHints.map(normalize).filter(Boolean);
  const keywords = [...primaryKeywords, ...secondaryKeywords];
  const fallbacks = new Set(solution.fallbackCategories);

  const scored = familyCandidates
    .map((p) => {
      const hay = normalize([p.name, p.shortDescription, p.category, p.brand].filter(Boolean).join(' '));
      let score = 0;

      const hasPrimary = primaryKeywords.some((kw) => {
        if (!kw || kw.length < 3) return false;
        return hay.includes(kw);
      });

      for (const kw of keywords) {
        if (kw.length < 3) continue;
        if (hay.includes(kw)) score += kw.includes('g1') ? 40 : 18;
      }

      if (fallbacks.has(p.category)) score += 10;

      // Extra boost when solution references a known robot family
      if (solution.slug.includes('unitree') || solution.slug.includes('g1')) {
        if (normalize(p.brand).includes('unitree') || normalize(p.name).includes('g1')) score += 30;
      }

      return { p, score, hasPrimary };
    })
    .sort((a, b) => b.score - a.score);

  // Guardrail: se esistono candidati con almeno 1 keyword “primaria”,
  // restringiamo il pool a quelli per evitare componenti troppo “generiche”.
  const anyPrimary = scored.some((x) => x.hasPrimary);
  const picked = (anyPrimary ? scored.filter((x) => x.hasPrimary) : scored).map((x) => x.p);
  const minCount = 9;
  if (picked.length >= minCount) return picked.slice(0, 12);

  const expanded = familyCandidates
    .filter((p) => fallbacks.has(p.category))
    .concat(familyCandidates.filter((p) => !fallbacks.has(p.category)))
    .filter((p, idx, arr) => arr.findIndex((q) => q.slug === p.slug) === idx);

  return expanded.slice(0, 12);
}
