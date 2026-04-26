import type { Locale } from './i18n';

type FaqItem = { q: string; a: string };

type Section = { title: string; bullets: string[] };

type SolutionOverrides = {
  title?: string;
  familyLabel?: string;
  heroCopy?: string;
  seoDescription?: string;
  bullets?: string[];
  include?: Section;
  audience?: Section;
  integration?: Section;
  faq?: FaqItem[];
};

export const SOLUTIONS_I18N: Record<Locale, Record<string, SolutionOverrides>> = {
  it: {},

  en: {
    quadrupedi: {
      title: 'Unitree Quadrupeds',
      familyLabel: 'Mobile robots / Quadrupeds',
      heroCopy:
        'If you need mobility and autonomy in dynamic scenarios, configure your Quadruped kit and add the required components directly to your cart.',
      seoDescription:
        'Quadruped solution for demos, research, and fast setup: choose the model and complete the configuration with compatible accessories to get started right away.',
      bullets: [
        'Mobility and path management in variable scenarios',
        'Configurable kit for research and demonstrations',
        'Guided selection of support components based on your scenario',
      ],
      include: {
        title: "What’s included",
        bullets: [
          'A quadruped selected from the catalog based on compatibility',
          'Support components to make the setup operational (when available)',
          'Scenario-driven guided configuration (Demo / Research / Integration)',
        ],
      },
      audience: {
        title: 'Who it’s for',
        bullets: [
          'R&D and mobile robot prototyping teams',
          'Research on locomotion, sensing, and real-world interaction',
          'Demos, training, and proof-of-concept',
        ],
      },
      integration: {
        title: 'Integration',
        bullets: [
          'Selection of components consistent with the chosen solution',
          'Transparent pricing where available; otherwise “on request”',
          'Cart + request to confirm availability and shipping',
        ],
      },
      faq: [
        {
          q: 'How do I choose between GO2, B2 and GO1?',
          a: 'Start from your scenario (Demo, Research, or Integration) and from compatibility in your setup. Then complete with accessories in the configurator and verify the components available in your cart.',
        },
        {
          q: 'Are the prices final?',
          a: 'In the cart you’ll see confirmed prices where available. For “on request” components, the total is handled during order confirmation.',
        },
        {
          q: 'Can I use only the robot without accessories?',
          a: 'Yes: in the configurator you can add only the necessary components. The cart lets you send the request anyway and finalize your configuration.',
        },
      ],
    },
    braccia: {
      title: 'Unitree Arms & Grippers',
      familyLabel: 'Robotic manipulation / Robotic arms',
      heroCopy:
        'Build your Arms/Gripper kit with consistent components and add it to your cart. Then send your request with the complete configuration details.',
      seoDescription:
        'Arms & Grippers solution for grasping, assembly, and manipulation: choose the system and complete it with compatible accessories to integrate faster.',
      bullets: [
        'Task-oriented grasping and manipulation',
        'Configurable kit with compatible components',
        'Faster integration thanks to guided selection',
      ],
      include: {
        title: "What’s included",
        bullets: [
          'An arm/gripper as the kit base',
          'Compatible accessories selected based on the scenario',
          'Guided configuration to add the chosen components to your cart',
        ],
      },
      audience: {
        title: 'Who it’s for',
        bullets: [
          'Integration of robot cells and prototypes',
          'Projects for grasping, assembly, and manipulation',
          'Teams that want to reduce setup and testing time',
        ],
      },
      integration: {
        title: 'Integration',
        bullets: [
          'Selection of components consistent with the chosen solution',
          'Confirmed pricing where available; otherwise “on request”',
          'Cart request to confirm availability and shipping',
        ],
      },
      faq: [
        {
          q: 'Can I change the kit composition?',
          a: 'Yes: in the configurator you can select the scenario and add the components to your cart. From there, you finalize your request with the needed details.',
        },
        {
          q: 'How do you handle compatibility?',
          a: 'The landing uses matching by category and keywords and shows the components in your cart. Final confirmation happens during request management.',
        },
      ],
    },
    umanoidi: {
      title: 'Unitree Humanoids',
      familyLabel: 'Humanoid robots',
      heroCopy:
        'When you need flexibility for training, demos, and development: configure your Humanoid kit and add it to your cart with the required components.',
      seoDescription:
        'Humanoid solution for education, R&D, and demonstrations: choose the scenario and complete the setup with compatible components to get started right away.',
      bullets: [
        'Repeatable tasks for testing and demonstrations',
        'Setup designed for quick iterations',
        'Kit selected based on scenario and availability',
      ],
      include: {
        title: "What’s included",
        bullets: [
          'A humanoid selected as the kit base',
          'Compatible components selected through the configurator',
          'Total estimate: confirmed prices where available; otherwise “on request”',
        ],
      },
      audience: {
        title: 'Who it’s for',
        bullets: [
          'Education and technical training',
          'R&D and prototyping',
          'Demos and proof-of-concept in controlled environments',
        ],
      },
      integration: {
        title: 'Integration',
        bullets: [
          'Selection of components consistent with the chosen scenario',
          'Cart to send the request and complete the configuration',
          'Support for availability/shipping management during confirmation',
        ],
      },
      faq: [
        {
          q: 'Is this solution suitable for R&D?',
          a: 'Yes: the configuration is designed for fast iterations. In the cart you can review the selected components and send your request for final confirmation.',
        },
      ],
    },
    accessori: {
      title: 'Accessories for your robot setup',
      familyLabel: 'Accessories / Power & support',
      heroCopy:
        'Prepare a stable, operational setup: select compatible accessories and add them to your cart to send the request with the configuration details.',
      seoDescription:
        'Accessories and key components for power, support, and setup completion: finalize your configuration with a scenario-guided kit.',
      bullets: [
        'Support components to maintain operational continuity',
        'Kit selected to complete your configuration',
        'Confirmed pricing where available; otherwise “on request”',
      ],
      include: {
        title: "What’s included",
        bullets: [
          'Selected support components to complete your setup',
          'Guided configurator selection for scenario and availability',
          'Cart to send the request and confirm final details',
        ],
      },
      audience: {
        title: 'Who it’s for',
        bullets: [
          'Anyone who wants to complete the setup without trial-and-error',
          'Teams preparing demos, tests, and prototypes',
          'Engineers/technicians who need a consistent configuration',
        ],
      },
      integration: {
        title: 'Integration',
        bullets: [
          'Matching by category and keywords to suggest compatible components',
          'Transparent pricing where available; otherwise “on request”',
          'Availability/shipping confirmation via the cart request',
        ],
      },
      faq: [
        {
          q: 'How do I know which accessories I need?',
          a: 'Start from the scenario (Demo / Research / Integration) and add the suggested components to your cart. The final request is used to validate your configuration.',
        },
      ],
    },

    'cobot-pick-and-place': {
      title: 'Cobot Pick & Place',
      familyLabel: 'Cobot / handling',
      heroCopy:
        'Reduce automation cycle times: a pick/place workflow designed to integrate quickly into new or existing lines.',
      seoDescription:
        'Cobot solution for picking, positioning, and moving parts with a flexible layout and shorter setup times.',
      bullets: [
        'No bottlenecks: pick and place in sequence',
        'Configure the workflow with accessories and compatibility',
        'Reduce integration time with “ready” components',
      ],
    },
    'cobot-machine-tending': {
      title: 'Cobot Machine Tending (CNC / presses)',
      familyLabel: 'Cobot / tending',
      heroCopy:
        'From loading to unloading: a setup designed to manage machine rhythms and keep production running continuously.',
      seoDescription:
        'Cobot for machine feeding and unloading: reduce downtime and optimize production cycles.',
      bullets: [
        'Support for load/unload workflow',
        'Reduced waiting times',
        'Configurable kit for process and accessories',
      ],
    },
    'cobot-palletizing-depalletizing': {
      title: 'Cobot Palletizing / Depalletizing',
      familyLabel: 'Cobot / pallet',
      heroCopy:
        'Simplify transfer and stacking operations: manage volume with a setup designed for repeatability.',
      seoDescription:
        'Cobot solution for palletizing and depalletizing: reduce waste and standardize handling in warehouse/line environments.',
      bullets: [
        'Repeatable material movement',
        'Scalable setup for different sizes',
        'Components and accessories for stable stacking',
      ],
    },
    'cobot-screwdriving-assembly-light': {
      title: 'Cobot Screwdriving & Light Assembly',
      familyLabel: 'Cobot / assembly',
      heroCopy:
        'From guiding to small interventions: a ready base for screwdriving, assembly, and repeatable tasks in production.',
      seoDescription:
        'Cobot solution for screwdriving and light assembly: torque control, repeatability, and easy integration.',
      bullets: [
        'Repeatable screwdriving and assembly',
        'Reduced scrap and rework',
        'Optimized kit for precision tasks',
      ],
    },
    'cobot-welding-dispensing-finishing': {
      title: 'Cobot Welding / Dispensing / Finishing',
      familyLabel: 'Cobot / processes',
      heroCopy:
        'Reduce variability and intervention time: a kit that helps bring the process into production with fewer trials.',
      seoDescription:
        'Cobot solution for welding, dispensing, and finishing: increase consistency and productivity with flexible configurations.',
      bullets: [
        'Process stability',
        'Reduced setup times',
        'Support for finishing and release tasks',
      ],
    },

    'amr-trasporto-tote-cassette-semilavorati': {
      title: 'AMR Transport: totes / crates / semi-finished goods',
      familyLabel: 'AMR / intralogistics',
      heroCopy:
        'Reduce manual moves: your AMR optimizes internal flows and makes line deliveries smoother.',
      seoDescription:
        'AMR solution for transport: totes, crates, and semi-finished goods between production areas with operational continuity.',
      bullets: [
        'Optimized routes and routing',
        'Fewer interruptions between departments',
        'Kit ready for logistics integration',
      ],
    },
    'amr-line-side-replenishment-kitting': {
      title: 'AMR Line-side replenishment / kitting',
      familyLabel: 'AMR / replenishment',
      heroCopy:
        'Manage inventory and kits dynamically: the AMR delivers at the right time and to the right point.',
      seoDescription:
        'AMR for replenishment and kitting: just-in-time deliveries and reduced line downtime.',
      bullets: [
        'Kitting and coordinated deliveries',
        'Reduce shortages and overstock',
        'Flexible setup for variable layouts',
      ],
    },
    'amr-tugger-traino-carrelli': {
      title: 'AMR Tugger / Tow Carts',
      familyLabel: 'AMR / towing',
      heroCopy:
        'Optimize towing of carts and connection management in the operations area with fewer maneuvers.',
      seoDescription:
        'AMR for towing carts: manage accessories and carts with simple integration.',
      bullets: [
        'Towing and cart movement',
        'Reduced operator stress',
        'Kit for a logistics scenario',
      ],
    },
    'amr-inventory-scanning-warehouse-support': {
      title: 'AMR Inventory Scanning / Warehouse Support',
      familyLabel: 'AMR / scanning',
      heroCopy:
        'Reduce time and errors: the AMR supports scanning and warehouse tasks with a programmed route.',
      seoDescription:
        'AMR for inventory scanning and warehouse support: improve accuracy and verification speed.',
      bullets: [
        'Scanning and checking',
        'Support for warehouse procedures',
        'Kit for sensor integration and workflows',
      ],
    },
    'amr-cobot-machine-tending-multi-macchina': {
      title: 'AMR + Cobot: Multi-machine tending',
      familyLabel: 'AMR+Cobot / multi-station',
      heroCopy:
        'When you need to cover multiple stations: AMR handles relocation, while the Cobot performs tending operations.',
      seoDescription:
        'AMR + Cobot solution for multi-machine tending: transfer between stations and continuous cycles.',
      bullets: [
        'Multi-station coverage',
        'Reduced downtime and waiting',
        'Modular integration for your scenario',
      ],
    },
    'amr-cobot-pick-place-mobile-between-stations-inspection-transfer': {
      title: 'AMR + Cobot: Mobile pick/place between stations & inspection transfer',
      familyLabel: 'AMR+Cobot / pick/place transfer',
      heroCopy:
        'Reduce micro-pauses between operations: the AMR moves, and the Cobot handles pick/place or inspection.',
      seoDescription:
        'AMR + Cobot for part transfer between stations and inspection tasks: a continuous, manageable flow.',
      bullets: [
        'Controlled handover',
        'Less time between process steps',
        'Kit for transfer and inspection',
      ],
    },
    'amr-cobot-modula-line-asservimento': {
      title: 'AMR + Cobot: Modula line control & servicing',
      familyLabel: 'AMR+Cobot / line control',
      heroCopy:
        'If you have a modular line: a path to coordinate station control and transfers with a kit ready for configuration.',
      seoDescription:
        'AMR + Cobot connection to Modula for line control: synchronize tasks and flow across line modules.',
      bullets: [
        'Synchronization between modules',
        'Reduced setup times',
        'Kit suited for modular lines',
      ],
    },

    'humanoid-g1-object-handling-logistica': {
      title: 'Humanoid G1: Object handling in logistics',
      familyLabel: 'Humanoid / logistics',
      heroCopy:
        'Need flexibility: a humanoid that handles objects in logistics, simplifying handovers and picking.',
      seoDescription:
        'Unitree G1 humanoid for object handling in logistics: flexible grasping, repeatable tasks, and route management.',
      bullets: [
        'Flexible, adaptive grasping',
        'Repeatable tasks with variable layout',
        'Development kit for fast testing',
      ],
    },
    'humanoid-g1-automotive-line-side-delivery': {
      title: 'Humanoid G1: Line-side material delivery (automotive)',
      familyLabel: 'Humanoid / automotive',
      heroCopy:
        'Deliver materials to support automotive lines: fewer manual micro-actions, more continuity.',
      seoDescription:
        'Humanoid G1 for line-side delivery in automotive: simple tasks, operational speed, and variant handling.',
      bullets: [
        'Line-side deliveries',
        'Guided variant handling',
        'Kit for simple but reliable tasks',
      ],
    },
    'humanoid-g1-general-purpose-platform-development': {
      title: 'Humanoid G1: General purpose & development platform',
      familyLabel: 'Humanoid / development',
      heroCopy:
        'Develop and validate: an ecosystem ready to iterate manipulation applications and demos.',
      seoDescription:
        'Development platform with Humanoid G1 for general-purpose manipulation and rapid prototyping.',
      bullets: [
        'General purpose manipulation',
        'Ready environment for development and demos',
        'Key components and accessories',
      ],
    },

    'quadrupede-industrial-inspection-impianti': {
      title: 'Quadruped: Industrial inspection of facilities',
      familyLabel: 'Quadruped / inspection',
      heroCopy:
        'Inspect quickly and repeatably: ideal for complex environments and for reducing maintenance downtime.',
      seoDescription:
        'Quadruped for industrial inspection: monitor facilities and reduce unnecessary access with a mobile platform.',
      bullets: [
        'Industrial inspection',
        'Reduced access and time',
        'Kit for monitoring tasks',
      ],
    },
    'quadrupede-power-inspection-utility-remote-areas': {
      title: 'Quadruped: Power inspection / utilities / remote areas',
      familyLabel: 'Quadruped / power',
      heroCopy:
        'When you need access and autonomy: the quadruped supports inspections in hard-to-reach areas with increased safety.',
      seoDescription:
        'Quadruped for power and utility inspections: reach remote areas and reduce risks and intervention time.',
      bullets: [
        'Inspections in remote areas',
        'Reduced intervention time',
        'Kit designed for autonomy and task management',
      ],
    },
    'quadrupede-security-patrol': {
      title: 'Quadruped: Security / Patrol',
      familyLabel: 'Quadruped / security',
      heroCopy:
        'Patrol with mobility: scout and inspect with a setup that supports inspection procedures and reporting.',
      seoDescription:
        'Quadruped for security and patrol: monitoring and mobile presence for areas and perimeters.',
      bullets: [
        'Patrol and monitoring',
        'Reduced risks at access points',
        'Sensor and task integration',
      ],
    },
    'quadrupede-with-arm-valves-levers-small-interventions': {
      title: 'Quadruped with arm: valves, levers & small interventions',
      familyLabel: 'Quadruped + arm',
      heroCopy:
        'Combine mobility and manipulation: when you need to reach and precisely intervene on components.',
      seoDescription:
        'Quadruped with arm for localized interventions: manage valves, levers, and light maintenance tasks.',
      bullets: [
        'Localized interventions',
        'Fewer passes and manual steps',
        'Kit for light, repeatable tasks',
      ],
    },
  },


  de: {
    quadrupedi: {
      title: 'Unitree Quadrupedi',
      familyLabel: 'Mobile Roboter / Quadrupedi',
      heroCopy:
        'Wenn du in dynamischen Szenarien Mobilität und Autonomie brauchst, konfiguriere dein Quadruped‑Kit und lege die benötigten Komponenten direkt in den Warenkorb.',
      seoDescription:
        'Quadruped‑Lösung für Demos, Forschung und schnelle Einrichtung: wähle das Modell und vervollständige die Konfiguration mit kompatiblem Zubehör, um sofort zu starten.',
      bullets: [
        'Mobilität und Routenmanagement in variablen Szenarien',
        'Konfigurierbares Kit für Forschung und Demonstrationen',
        'Geführte Auswahl der Support‑Komponenten basierend auf deinem Szenario',
      ],
      include: {
        title: 'Das ist enthalten',
        bullets: [
          'Ein Quadruped aus dem Katalog – basierend auf Kompatibilität ausgewählt',
          'Support‑Komponenten, damit das Setup betriebsbereit ist (falls verfügbar)',
          'Szenario‑gesteuerte, geführte Konfiguration (Demo / Forschung / Integration)',
        ],
      },
      audience: {
        title: 'Für wen es ist',
        bullets: [
          'R&D‑Teams und Prototyping‑Teams für mobile Roboter',
          'Forschung zu Lokomotion, Sensorik und Interaktion im Feld',
          'Demos, Training und Proof‑of‑Concept',
        ],
      },
      integration: {
        title: 'Integration',
        bullets: [
          'Auswahl konsistenter Komponenten zur gewählten Lösung',
          'Transparente Preise, wo verfügbar; sonst „auf Anfrage“',
          'Warenkorb + Anfrage zur Bestätigung von Verfügbarkeit und Versand',
        ],
      },
      faq: [
        {
          q: 'Wie wähle ich zwischen GO2, B2 und GO1?',
          a: 'Starte mit dem Szenario (Demo, Forschung oder Integration) und prüfe die Kompatibilität in deinem Setup. Danach ergänze im Konfigurator die Zubehörteile und verifiziere die verfügbaren Komponenten im Warenkorb.',
        },
        {
          q: 'Sind die Preise endgültig?',
          a: 'Im Warenkorb siehst du bestätigte Preise, wo verfügbar. Für „auf Anfrage“ Komponenten wird die Gesamtsumme in der Bestellbestätigung behandelt.',
        },
        {
          q: 'Kann ich nur den Roboter ohne Zubehör nutzen?',
          a: 'Ja: Im Konfigurator kannst du nur die notwendigen Komponenten auswählen. Der Warenkorb ermöglicht dir trotzdem, die Anfrage zu senden und die Konfiguration zu finalisieren.',
        },
      ],
    },
    braccia: {
      title: 'Unitree Arme & Greifer',
      familyLabel: 'Robotik‑Manipulation / Robot Arms',
      heroCopy:
        'Stelle dein Arms/Gripper‑Kit mit konsistenten Komponenten zusammen und lege es in den Warenkorb. Danach sende deine Anfrage mit der vollständigen Konfiguration.',
      seoDescription:
        'Arms & Grippers‑Lösung für Greifen, Montage und Manipulation: System wählen und mit kompatiblem Zubehör ergänzen – für eine schnellere Integration.',
      bullets: [
        'Aufgabenorientiertes Greifen und Manipulieren',
        'Konfigurierbares Kit mit kompatiblen Komponenten',
        'Schnellere Integration durch geführte Auswahl',
      ],
      include: {
        title: 'Das ist enthalten',
        bullets: [
          'Ein Arm/Greifer als Basis des Kits',
          'Kompatibles Zubehör – basierend auf dem Szenario ausgewählt',
          'Geführte Konfiguration, um die gewählten Komponenten in den Warenkorb zu legen',
        ],
      },
      audience: {
        title: 'Für wen es ist',
        bullets: [
          'Integration von Robot‑Zellen und Prototypen',
          'Projekte für Greifen, Montage und Manipulation',
          'Teams, die Setup‑ und Testzeiten reduzieren möchten',
        ],
      },
      integration: {
        title: 'Integration',
        bullets: [
          'Auswahl konsistenter Komponenten zur gewählten Lösung',
          'Bestätigte Preise, wo verfügbar; sonst „auf Anfrage“',
          'Anfrage im Warenkorb zur Bestätigung von Verfügbarkeit und Versand',
        ],
      },
      faq: [
        {
          q: 'Kann ich die Kit‑Zusammensetzung ändern?',
          a: 'Ja: Im Konfigurator kannst du das Szenario auswählen und die Komponenten in den Warenkorb hinzufügen. Danach finalisierst du die Anfrage mit den benötigten Details.',
        },
        {
          q: 'Wie geht ihr mit Kompatibilität um?',
          a: 'Die Landing nutzt Matching nach Kategorie und Keywords und zeigt die Komponenten im Warenkorb. Die finale Bestätigung erfolgt bei der Bearbeitung der Anfrage.',
        },
      ],
    },
    humanoide: {
      title: 'Unitree‑Humanoide',
      familyLabel: 'Humanoide Roboter',
      heroCopy:
        'Wenn du Flexibilität für Training, Demos und Entwicklung brauchst: konfiguriere dein Humanoid‑Kit und füge es mit den notwendigen Komponenten in deinen Warenkorb ein.',
      seoDescription:
        'Humanoid‑Lösung für Education, R&D und Demos: Szenario wählen und das Setup mit kompatiblen Komponenten vervollständigen – starte direkt.',
      bullets: [
        'Wiederholbare Aufgaben für Tests und Demonstrationen',
        'Setup für schnelle Iterationen ausgelegt',
        'Kit‑Auswahl basierend auf Szenario und Verfügbarkeit',
      ],
      include: {
        title: 'Das ist enthalten',
        bullets: [
          'Humanoid als Basis des Kits',
          'Kompatible Komponenten – ausgewählt über den Konfigurator',
          'Gesamtschätzung: bestätigte Preise, wo verfügbar; sonst „auf Anfrage“',
        ],
      },
      audience: {
        title: 'Für wen es ist',
        bullets: [
          'Education und technische Schulungen',
          'R&D und Prototyping',
          'Demos und Proof‑of‑Concept in kontrollierten Umgebungen',
        ],
      },
      integration: {
        title: 'Integration',
        bullets: [
          'Auswahl konsistenter Komponenten zum gewählten Szenario',
          'Warenkorb zum Senden der Anfrage und Vervollständigen der Konfiguration',
          'Support bei Verfügbarkeit/Versand – während der Bestätigung',
        ],
      },
      faq: [
        {
          q: 'Ist diese Lösung für R&D geeignet?',
          a: 'Ja: Die Konfiguration ist für schnelle Iterationen gedacht. Im Warenkorb kannst du die ausgewählten Komponenten prüfen und die Anfrage für die finale Bestätigung senden.',
        },
      ],
    },
    accessori: {
      title: 'Zubehör für dein Robot‑Setup',
      familyLabel: 'Zubehör / Power & Support',
      heroCopy:
        'Bereite ein stabiles, betriebsfähiges Setup vor: wähle kompatibles Zubehör und füge es in deinen Warenkorb ein, um die Anfrage mit den Konfigurationsdetails zu senden.',
      seoDescription:
        'Zubehör und zentrale Komponenten für Stromversorgung, Support und Setup‑Abschluss: finalisiere deine Konfiguration mit einem szenario‑gesteuerten Kit.',
      bullets: [
        'Support‑Komponenten für kontinuierlichen Betrieb',
        'Kit zur Vervollständigung deiner Konfiguration',
        'Bestätigte Preise, wo verfügbar; sonst „auf Anfrage“',
      ],
      include: {
        title: 'Das ist enthalten',
        bullets: [
          'Ausgewählte Support‑Komponenten zum Abschluss deines Setups',
          'Geführte Auswahl im Konfigurator für Szenario und Verfügbarkeit',
          'Warenkorb zum Senden der Anfrage und Bestätigen der finalen Details',
        ],
      },
      audience: {
        title: 'Für wen es ist',
        bullets: [
          'Für alle, die ihr Setup ohne Trial‑and‑Error vervollständigen möchten',
          'Teams, die Demos, Tests und Prototypen vorbereiten',
          'Ingenieure/Techniker, die eine konsistente Konfiguration benötigen',
        ],
      },
      integration: {
        title: 'Integration',
        bullets: [
          'Matching nach Kategorie und Keywords, um kompatible Komponenten vorzuschlagen',
          'Transparente Preise, wo verfügbar; sonst „auf Anfrage“',
          'Verfügbarkeits-/Versandbestätigung über die Warenkorb‑Anfrage',
        ],
      },
      faq: [
        {
          q: 'Wie weiß ich, welches Zubehör ich brauche?',
          a: 'Starte mit dem Szenario (Demo / Forschung / Integration) und füge die vorgeschlagenen Komponenten in deinen Warenkorb ein. Die finale Anfrage dient zur Validierung deiner Konfiguration.',
        },
      ],
    },

    'cobot-pick-and-place': {
      title: 'Cobot Pick & Place',
      familyLabel: 'Cobot / Handling',
      heroCopy:
        'Reduziere Automationszeiten: ein Pick‑/Place‑Workflow, der sich schnell in neue oder bestehende Linien integrieren lässt.',
      seoDescription:
        'Cobot‑Lösung für Greifen, Positionieren und Bewegen von Bauteilen – mit flexibler Anordnung und kürzeren Setup‑Zeiten.',
      bullets: [
        'Keine Engpässe: Greifen und Ablegen in Sequenz',
        'Konfiguriere mit Zubehör und Kompatibilität',
        'Reduziere Integrationszeit mit „ready“ Komponenten',
      ],
    },
    'cobot-machine-tending': {
      title: 'Cobot Machine Tending (CNC / Pressen)',
      familyLabel: 'Cobot / Tending',
      heroCopy:
        'Von Beladen bis Entladen: ein Setup, das Maschinentakte managt und die Produktion kontinuierlich hält.',
      seoDescription:
        'Cobot für Zuführung und Entnahme: reduziere Stillstand und optimiere Produktionszyklen.',
      bullets: [
        'Support für Load/Unload‑Workflow',
        'Weniger Wartezeiten',
        'Konfigurierbares Kit für Prozess und Zubehör',
      ],
    },
    'cobot-palletizing-depalletizing': {
      title: 'Cobot Palettieren / Depalettieren',
      familyLabel: 'Cobot / Palettieren',
      heroCopy:
        'Vereinfach die Transfer‑ und Stapeloperationen: manage Volumen mit einem Setup für Wiederholbarkeit.',
      seoDescription:
        'Cobot‑Lösung für Palettieren und Depalettieren: reduziere Verschwendung und standardisiere das Handling in Lager/Line‑Umgebungen.',
      bullets: [
        'Wiederholbare Materialbewegung',
        'Skalierbares Setup für verschiedene Größen',
        'Komponenten und Zubehör für stabiles Stapeln',
      ],
    },
    'cobot-screwdriving-assembly-light': {
      title: 'Cobot Schraub-/Leichtmontage',
      familyLabel: 'Cobot / Montage',
      heroCopy:
        'Von der Führung bis zu kleinen Eingriffen: eine bereitgestellte Basis für Schrauben, Montage und wiederholbare Aufgaben in der Produktion.',
      seoDescription:
        'Cobot‑Lösung für Schrauben und leichte Montage: Drehmoment‑Kontrolle, Wiederholbarkeit und einfache Integration.',
      bullets: [
        'Wiederholtes Schrauben und Montieren',
        'Weniger Ausschuss und Nacharbeit',
        'Optimiertes Kit für Präzisionsaufgaben',
      ],
    },
    'cobot-welding-dispensing-finishing': {
      title: 'Cobot Schweißen / Dosieren / Finishing',
      familyLabel: 'Cobot / Prozesse',
      heroCopy:
        'Reduziere Variabilität und Eingriffszeiten: ein Kit, das hilft, den Prozess mit weniger Versuchen in die Produktion zu bringen.',
      seoDescription:
        'Cobot‑Lösung für Schweißen, Dosieren und Finishing: mehr Konsistenz und Produktivität mit flexiblen Konfigurationen.',
      bullets: [
        'Prozessstabilität',
        'Weniger Setup‑Zeit',
        'Support für Finishing‑ und Freigabeaufgaben',
      ],
    },

    'amr-trasporto-tote-cassette-semilavorati': {
      title: 'AMR Transport: Totes / Kisten / Halbfertigteile',
      familyLabel: 'AMR / Intralogistik',
      heroCopy:
        'Reduziere manuelle Wege: dein AMR optimiert interne Flows und macht Line‑Lieferungen flüssiger.',
      seoDescription:
        'AMR‑Lösung für Transport: Totes, Kisten und Halbfertigteile zwischen Produktionsbereichen – mit betrieblicher Kontinuität.',
      bullets: [
        'Optimierte Routen und Routing',
        'Weniger Unterbrechungen zwischen Bereichen',
        'Kit bereit für Logistik‑Integration',
      ],
    },
    'amr-line-side-replenishment-kitting': {
      title: 'AMR Line‑Side Replenishment / Kitting',
      familyLabel: 'AMR / Replenishment',
      heroCopy:
        'Steuere Bestände und Kits dynamisch: der AMR liefert zur richtigen Zeit und an den richtigen Ort.',
      seoDescription:
        'AMR für Replenishment und Kitting: Just‑in‑Time‑Lieferungen und weniger Line‑Downtime.',
      bullets: [
        'Kitting und abgestimmte Lieferungen',
        'Weniger Engpässe und Overstock',
        'Flexibles Setup für variable Layouts',
      ],
    },
    'amr-tugger-traino-carrelli': {
      title: 'AMR Tugger / Zugarme für Wagen',
      familyLabel: 'AMR / Schlepplösungen',
      heroCopy:
        'Optimiert das Ziehen von Wagen und das Management von Verbindungen im Einsatzbereich – mit weniger Manövern.',
      seoDescription:
        'AMR für das Ziehen von Wagen: Zubehör und Wagen mit einfacher Integration handhaben.',
      bullets: [
        'Ziehen und Bewegen von Wagen',
        'Weniger Belastung für Operatoren',
        'Kit für ein Logistik‑Szenario',
      ],
    },
    'amr-inventory-scanning-warehouse-support': {
      title: 'AMR Inventur‑Scanning / Warehouse Support',
      familyLabel: 'AMR / Scanning',
      heroCopy:
        'Weniger Zeit und Fehler: Der AMR unterstützt Scanning und Warehouse‑Aufgaben mit einer programmierten Route.',
      seoDescription:
        'AMR für Inventur‑Scanning und Warehouse‑Support: steigere Genauigkeit und Geschwindigkeit der Prüfungen.',
      bullets: [
        'Scannen und Prüfen',
        'Support für Warehouse‑Prozesse',
        'Kit für Sensor‑Integration und Workflows',
      ],
    },
    'amr-cobot-machine-tending-multi-macchina': {
      title: 'AMR + Cobot: Multi‑Machine Tending',
      familyLabel: 'AMR+Cobot / Multi‑Station',
      heroCopy:
        'Wenn mehrere Stationen abgedeckt werden müssen: AMR übernimmt die Verlagerung, der Cobot führt Tending‑Operationen aus.',
      seoDescription:
        'AMR + Cobot‑Lösung für Multi‑Machine Tending: Transfer zwischen Stationen und durchgängige Zyklen.',
      bullets: [
        'Abdeckung mehrerer Stationen',
        'Weniger Stillstand und Wartezeiten',
        'Modulare Integration für dein Szenario',
      ],
    },
    'amr-cobot-pick-place-mobile-between-stations-inspection-transfer': {
      title: 'AMR + Cobot: Mobiles Pick/Place zwischen Stationen & Inspektions‑Transfer',
      familyLabel: 'AMR+Cobot / Pick/Place Transfer',
      heroCopy:
        'Reduziere Mikro‑Pausen zwischen Arbeitsgängen: AMR fährt, Cobot übernimmt Pick/Place oder Inspektion.',
      seoDescription:
        'AMR + Cobot für Teiltransfer zwischen Stationen und Inspektions‑Tasks: ein kontinuierlicher, gut steuerbarer Flow.',
      bullets: [
        'Kontrolliertes Handover',
        'Weniger Zeit zwischen Prozessschritten',
        'Kit für Transfer und Inspektion',
      ],
    },
    'amr-cobot-modula-line-asservimento': {
      title: 'AMR + Cobot: Modula‑Anbindung für Line‑Control',
      familyLabel: 'AMR+Cobot / Line Control',
      heroCopy:
        'Wenn du eine modulare Linie hast: ein Weg, um Stationen und Transfers mit einem kit‑fähigen Setup zu koordinieren.',
      seoDescription:
        'AMR + Cobot Verbindung zu Modula für Line‑Control: Tasks und Flow zwischen den Line‑Modulen synchronisieren.',
      bullets: [
        'Synchronisierung zwischen Modulen',
        'Weniger Setup‑Zeiten',
        'Kit passend für modulare Linien',
      ],
    },

    'humanoid-g1-object-handling-logistica': {
      title: 'Humanoid G1: Object Handling in der Logistik',
      familyLabel: 'Humanoid / Logistik',
      heroCopy:
        'Mehr Flexibilität: ein Humanoid, das Objekte in der Logistik handhabt und Übergaben sowie Pick‑Prozesse vereinfacht.',
      seoDescription:
        'Unitree G1 Humanoid für Objekt‑Handling in der Logistik: flexibles Greifen, wiederholbare Tasks und Routen‑Management.',
      bullets: [
        'Flexibles, adaptives Greifen',
        'Wiederholbare Tasks mit variablem Layout',
        'Entwicklungskit für schnelle Tests',
      ],
    },
    'humanoid-g1-automotive-line-side-delivery': {
      title: 'Humanoid G1: Line‑Side Material Delivery (Automotive)',
      familyLabel: 'Humanoid / Automotive',
      heroCopy:
        'Material liefern, um Automotive‑Lines zu unterstützen: weniger manuelle Mikro‑Aktionen, mehr Kontinuität.',
      seoDescription:
        'Humanoid G1 für Line‑Side‑Lieferungen im Automotive: einfache Tasks, operative Geschwindigkeit und Variant‑Handling.',
      bullets: [
        'Line‑Side‑Lieferungen',
        'Geführtes Variant‑Handling',
        'Kit für einfache, zuverlässige Tasks',
      ],
    },
    'humanoid-g1-general-purpose-platform-development': {
      title: 'Humanoid G1: General Purpose & Entwicklungsplattform',
      familyLabel: 'Humanoid / Entwicklung',
      heroCopy:
        'Entwickeln und validieren: ein Ecosystem, bereit, Manipulations‑Anwendungen und Demos iterativ zu testen.',
      seoDescription:
        'Entwicklungsplattform mit Humanoid G1 für General‑Purpose‑Manipulation und schnelles Prototyping.',
      bullets: [
        'General‑Purpose‑Manipulation',
        'Bereite Umgebung für Entwicklung und Demos',
        'Wichtige Komponenten und Zubehör',
      ],
    },

    'quadrupede-industrial-inspection-impianti': {
      title: 'Quadruped: Industrielle Inspektion von Anlagen',
      familyLabel: 'Quadruped / Inspektion',
      heroCopy:
        'Schnell und wiederholbar inspizieren: ideal für komplexe Umgebungen und um Wartungs‑Stillstände zu reduzieren.',
      seoDescription:
        'Quadruped für industrielle Inspektion: Anlagen überwachen und unnötigen Zugang reduzieren – mit einer mobilen Plattform.',
      bullets: [
        'Industrielle Inspektion',
        'Weniger Zugänge und Zeit',
        'Kit für Monitoring‑Tasks',
      ],
    },
    'quadrupede-power-inspection-utility-remote-areas': {
      title: 'Quadruped: Power‑Inspection / Utilities / Remote Areas',
      familyLabel: 'Quadruped / Power',
      heroCopy:
        'Wenn du Zugang und Autonomie brauchst: unterstützt Inspektionen in schwer erreichbaren Bereichen – mit höherer Sicherheit.',
      seoDescription:
        'Quadruped für Power‑ und Utility‑Inspektionen: erreiche Remote‑Areas und reduziere Risiken sowie Interventionszeit.',
      bullets: [
        'Inspektion in Remote‑Areas',
        'Weniger Interventionszeit',
        'Kit für Autonomie und Task‑Management',
      ],
    },
    'quadrupede-security-patrol': {
      title: 'Quadruped: Security / Patrol',
      familyLabel: 'Quadruped / Security',
      heroCopy:
        'Sicherheit mit Mobilität: patrouillieren und inspizieren – mit einem Setup, das Kontrollverfahren und Reporting unterstützt.',
      seoDescription:
        'Quadruped für Security & Patrol: Monitoring und mobile Präsenz für Areale und Perimeter.',
      bullets: [
        'Patrol und Monitoring',
        'Weniger Risiken bei Zugängen',
        'Sensor‑ und Task‑Integration',
      ],
    },
    'quadrupede-with-arm-valves-levers-small-interventions': {
      title: 'Quadruped mit Arm: Ventile, Hebel & kleine Interventionen',
      familyLabel: 'Quadruped + Arm',
      heroCopy:
        'Mobilität und Manipulation verbinden: wenn du präzise an Komponenten eingreifen musst.',
      seoDescription:
        'Quadruped mit Arm für lokalisierte Eingriffe: Ventile, Hebel und leichte Wartungs‑Tasks.',
      bullets: [
        'Lokalisierte Interventionen',
        'Weniger Wege und manuelle Schritte',
        'Kit für leichte, wiederholbare Tasks',
      ],
    },
  },


  fr: {
    quadrupedi: {
      title: 'Quadrupèdes Unitree',
      familyLabel: 'Robots mobiles / Quadrupèdes',
      heroCopy:
        'Si vous avez besoin de mobilité et d’autonomie dans des scénarios dynamiques, configurez votre kit Quadrupède et ajoutez les composants nécessaires directement dans votre panier.',
      seoDescription:
        'Solution Quadrupède pour les démos, la recherche et une mise en place rapide : choisissez le modèle et complétez la configuration avec des accessoires compatibles pour démarrer tout de suite.',
      bullets: [
        'Mobilité et gestion des parcours dans des scénarios variables',
        'Kit configurable pour la recherche et les démonstrations',
        'Sélection guidée des composants de support selon votre scénario',
      ],
      include: {
        title: "Ce qu’il y a dedans",
        bullets: [
          'Un quadrupède sélectionné dans le catalogue selon la compatibilité',
          'Des composants de support pour rendre la configuration opérationnelle (si disponibles)',
          'Configuration guidée pilotée par le scénario (Démo / Recherche / Intégration)',
        ],
      },
      audience: {
        title: 'Pour qui',
        bullets: [
          'Équipes R&D et prototypage de robots mobiles',
          'Recherche sur la locomotion, la perception (sensing) et l’interaction terrain',
          'Démos, formation et preuve de concept',
        ],
      },
      integration: {
        title: 'Intégration',
        bullets: [
          'Sélection de composants cohérente avec la solution choisie',
          'Tarifs transparents lorsqu’ils sont disponibles ; sinon « sur demande »',
          'Panier + demande pour confirmer la disponibilité et l’expédition',
        ],
      },
      faq: [
        {
          q: 'Comment choisir entre GO2, B2 et GO1 ?',
          a: 'Commencez par le scénario (Démo, Recherche ou Intégration) et par la compatibilité dans votre configuration. Ensuite, complétez avec les accessoires dans le configurateur et vérifiez les composants disponibles dans le panier.',
        },
        {
          q: 'Les prix sont-ils définitifs ?',
          a: 'Dans le panier, vous verrez les prix confirmés quand ils sont disponibles. Pour les composants « sur demande », le total est géré lors de la confirmation de la commande.',
        },
        {
          q: 'Puis-je utiliser uniquement le robot sans accessoires ?',
          a: 'Oui : dans le configurateur, vous pouvez ajouter uniquement les composants nécessaires. Le panier vous permet quand même d’envoyer la demande et de finaliser la configuration.',
        },
      ],
    },
    braccia: {
      title: 'Bras & Pinces Unitree',
      familyLabel: 'Manipulation robotique / Bras robotiques',
      heroCopy:
        'Constituez votre kit Bras/Pinces avec des composants cohérents et ajoutez-le à votre panier. Ensuite, envoyez la demande avec la configuration complète.',
      seoDescription:
        'Solution Bras & Pinces pour la préhension, l’assemblage et la manipulation : choisissez le système et complétez avec des accessoires compatibles pour intégrer plus rapidement.',
      bullets: [
        'Préhension et manipulation orientées tâche',
        'Kit configurable avec des composants compatibles',
        "Intégration plus rapide grâce à une sélection guidée",
      ],
      include: {
        title: "Ce qu’il y a dedans",
        bullets: [
          'Un bras/une pince comme base du kit',
          'Accessoires compatibles sélectionnés selon le scénario',
          'Configuration guidée pour ajouter au panier les composants choisis',
        ],
      },
      audience: {
        title: 'Pour qui',
        bullets: [
          'Intégration de cellules robotisées et de prototypes',
          'Projets de préhension, assemblage et manipulation',
          'Équipes qui veulent réduire les délais de mise en place et de test',
        ],
      },
      integration: {
        title: 'Intégration',
        bullets: [
          'Sélection de composants cohérente avec la solution choisie',
          'Prix confirmés quand ils sont disponibles ; sinon « sur demande »',
          'Demande via le panier pour confirmer disponibilité et expédition',
        ],
      },
      faq: [
        {
          q: 'Puis-je modifier la composition du kit ?',
          a: 'Oui : dans le configurateur, choisissez le scénario puis ajoutez les composants au panier. Finalisez ensuite la demande avec les détails nécessaires.',
        },
        {
          q: 'Comment gérez-vous la compatibilité ?',
          a: 'La landing utilise un matching par catégories et mots-clés et vous montre les composants dans le panier. La confirmation finale se fait pendant la gestion de la demande.',
        },
      ],
    },
    humanoidi: {
      title: 'Humanoïdes Unitree',
      familyLabel: 'Robots humanoïdes',
      heroCopy:
        'Quand vous avez besoin de flexibilité pour la formation, les démos et le développement : configurez votre kit Humanoïde et ajoutez-le au panier avec les composants nécessaires.',
      seoDescription:
        'Solution Humanoïdes pour l’éducation, la R&D et les démonstrations : choisissez le scénario puis complétez le setup avec des composants compatibles pour démarrer tout de suite.',
      bullets: [
        'Tâches répétables pour tests et démonstrations',
        'Setup orienté pour des itérations rapides',
        'Kit sélectionné selon le scénario et la disponibilité',
      ],
      include: {
        title: "Ce qu’il y a dedans",
        bullets: [
          'Humanoïde sélectionné comme base du kit',
          'Composants compatibles sélectionnés via le configurateur',
          'Estimation totale : prix confirmés quand ils sont disponibles ; sinon « sur demande »',
        ],
      },
      audience: {
        title: 'Pour qui',
        bullets: [
          'Éducation et formation technique',
          'R&D et prototypage',
          'Démos et preuve de concept en environnements contrôlés',
        ],
      },
      integration: {
        title: 'Intégration',
        bullets: [
          'Sélection de composants cohérente avec le scénario choisi',
          'Panier pour envoyer la demande et finaliser la configuration',
          'Support pour la gestion disponibilité/expédition lors de la confirmation',
        ],
      },
      faq: [
        {
          q: 'Cette solution convient-elle à la R&D ?',
          a: 'Oui : la configuration est pensée pour des itérations rapides. Dans le panier, vous pouvez vérifier les composants sélectionnés et envoyer la demande pour la confirmation finale.',
        },
      ],
    },
    accessori: {
      title: 'Accessoires pour votre setup robotique',
      familyLabel: 'Accessoires / Alimentation & support',
      heroCopy:
        'Préparez un setup stable et opérationnel : choisissez des accessoires compatibles et ajoutez-les au panier pour envoyer la demande avec les détails de configuration.',
      seoDescription:
        'Accessoires et composants clés pour l’alimentation, le support et la finalisation du setup : complétez votre configuration avec un kit guidé par le scénario.',
      bullets: [
        'Composants de support pour assurer la continuité opérationnelle',
        'Kit sélectionné pour compléter la configuration',
        'Prix confirmés quand disponibles ; sinon « sur demande »',
      ],
      include: {
        title: "Ce qu’il y a dedans",
        bullets: [
          'Composants de support sélectionnés pour compléter votre setup',
          'Sélection guidée via le configurateur pour scénario et disponibilité',
          'Panier pour envoyer la demande et confirmer les détails finaux',
        ],
      },
      audience: {
        title: 'Pour qui',
        bullets: [
          'Ceux qui veulent compléter le setup sans tâtonner',
          'Équipes qui préparent démos, tests et prototypes',
          'Ingénieurs/techniciens qui veulent une configuration cohérente',
        ],
      },
      integration: {
        title: 'Intégration',
        bullets: [
          'Matching par catégories et mots-clés pour proposer des composants compatibles',
          'Prix transparents quand disponibles ; sinon « sur demande »',
          "Confirmation de disponibilité/expédition via la demande du panier",
        ],
      },
      faq: [
        {
          q: 'Comment savoir quels accessoires me faut-il ?',
          a: 'Commencez par le scénario (Démo / Recherche / Intégration) puis ajoutez au panier les composants suggérés. La demande finale sert à valider la configuration.',
        },
      ],
    },

    'cobot-pick-and-place': {
      title: 'Cobot Pick & Place',
      familyLabel: 'Cobot / Manipulation',
      heroCopy:
        'Réduisez les temps de cycle d’automatisation : un flux pick/place conçu pour s’intégrer rapidement dans de nouvelles ou existantes lignes.',
      seoDescription:
        'Solution Cobot pour la préhension, le positionnement et la manutention de pièces avec une implantation flexible et des temps de setup réduits.',
      bullets: [
        'Zéro goulot d’étranglement : pick et place en séquence',
        'Configurez avec accessoires et compatibilité',
        'Réduisez l’intégration grâce à des composants « prêts »',
      ],
    },
    // Remaining slugs: translate title/familyLabel/heroCopy/seoDescription/bullets (no include/audience/integration/faq).
    'cobot-machine-tending': {
      title: 'Cobot Machine Tending (CNC / presses)',
      familyLabel: 'Cobot / tending',
      heroCopy:
        'Du chargement au déchargement : un setup pensé pour gérer le rythme machine et maintenir une production continue.',
      seoDescription:
        'Cobot pour l’alimentation et le déchargement machine : réduire les arrêts et optimiser les cycles de production.',
      bullets: [
        'Support pour le workflow chargement/déchargement',
        'Réduction des temps d’attente',
        'Kit configurable pour le process et les accessoires',
      ],
    },
    'cobot-palletizing-depalletizing': {
      title: 'Cobot Palettisation / Dépalettisation',
      familyLabel: 'Cobot / palette',
      heroCopy:
        'Simplifiez les transferts et l’empilage : gérez les volumes avec un setup conçu pour la répétabilité.',
      seoDescription:
        'Cobot pour palettisation et dépalettisation : réduire les pertes et standardiser la manutention en entrepôt/ligne.',
      bullets: [
        'Mouvements répétables',
        'Setup scalable pour différentes tailles',
        'Composants et accessoires pour un empilage stable',
      ],
    },
    'cobot-screwdriving-assembly-light': {
      title: 'Cobot Vissage & Assemblage léger',
      familyLabel: 'Cobot / assemblage',
      heroCopy:
        'De la guidage aux petites interventions : une base prête pour le vissage, les montages et les tâches répétables en production.',
      seoDescription:
        'Solution Cobot pour vissage et assemblage léger : contrôle du couple, répétabilité et intégration facile.',
      bullets: [
        'Vissage et montage répétitifs',
        'Réduction des rebuts et retouches',
        'Kit optimisé pour les tâches de précision',
      ],
    },
    'cobot-welding-dispensing-finishing': {
      title: 'Cobot Soudage / Dispensing / Finition',
      familyLabel: 'Cobot / procédés',
      heroCopy:
        'Réduisez la variabilité et le temps d’intervention : un kit pour amener le procédé en production avec moins d’essais.',
      seoDescription:
        'Cobot pour soudage, distribution et finition : augmenter la consistance et la productivité avec des configurations flexibles.',
      bullets: [
        'Stabilité du procédé',
        'Réduction des temps de setup',
        'Support pour les tâches de finition et relâche',
      ],
    },
    'amr-trasporto-tote-cassette-semilavorati': {
      title: 'AMR Transport : bacs / caisses / semi-finis',
      familyLabel: 'AMR / intralogistique',
      heroCopy:
        'Réduisez les déplacements manuels : l’AMR optimise les flux internes et rend les livraisons plus fluides en ligne.',
      seoDescription:
        'AMR pour transport : bacs, caisses et semi-finis entre zones de production, avec continuité opérationnelle.',
      bullets: [
        'Parcours optimisés et routing',
        'Réduction des interruptions entre départements',
        'Kit prêt pour l’intégration logistique',
      ],
    },
    'amr-line-side-replenishment-kitting': {
      title: 'AMR Replenishment line‑side / kitting',
      familyLabel: 'AMR / replenishment',
      heroCopy:
        'Gérez stocks et kits de façon dynamique : l’AMR délivre au bon moment, au bon point.',
      seoDescription:
        'AMR pour replenishment et kitting : livraisons just‑in‑time et réduction des arrêts de ligne.',
      bullets: [
        'Kitting et livraisons coordonnées',
        'Réduction des manques et surstocks',
        'Setup flexible pour des layouts variables',
      ],
    },
    'amr-tugger-traino-carrelli': {
      title: 'AMR Tugger / remorquage de chariots',
      familyLabel: 'AMR / remorquage',
      heroCopy:
        'Optimisez le remorquage de chariots et la gestion des connexions avec moins de manœuvres.',
      seoDescription:
        'AMR pour remorquage : gérer accessoires et chariots avec une intégration simple.',
      bullets: [
        'Remorquage et déplacement de chariots',
        'Réduction du stress opérateur',
        'Kit pour un scénario logistique',
      ],
    },
    'amr-inventory-scanning-warehouse-support': {
      title: 'AMR Scan d’inventaire / support entrepôt',
      familyLabel: 'AMR / scanning',
      heroCopy:
        'Réduisez le temps et les erreurs : l’AMR supporte le scanning et les tâches d’entrepôt avec un parcours programmé.',
      seoDescription:
        'AMR pour scanning inventaire et support entrepôt : améliorez la précision et la vitesse des contrôles.',
      bullets: [
        'Scan et vérification',
        'Support des procédures d’entrepôt',
        'Kit pour intégration capteurs et flux',
      ],
    },
    'amr-cobot-machine-tending-multi-macchina': {
      title: 'AMR + Cobot : tending multi‑machines',
      familyLabel: 'AMR+Cobot / multi‑machine',
      heroCopy:
        'Quand il faut couvrir plusieurs postes : l’AMR gère les déplacements et le Cobot effectue les opérations de tending.',
      seoDescription:
        'Solution AMR + Cobot pour le tending multi‑machines : transferts entre stations et continuité des cycles.',
      bullets: [
        'Couverture multi‑postes',
        'Réduction des arrêts et des attentes',
        'Intégration modulaire pour votre scénario',
      ],
    },
    'amr-cobot-pick-place-mobile-between-stations-inspection-transfer': {
      title: 'AMR + Cobot : pick/place mobile entre stations & inspection',
      familyLabel: 'AMR+Cobot / transfert pick/place',
      heroCopy:
        'Réduisez les micro‑pauses : l’AMR déplace et le Cobot assure la prise/posi ou l’inspection.',
      seoDescription:
        'AMR + Cobot pour transfert entre stations et tâches d’inspection : un flux continu et maîtrisable.',
      bullets: [
        'Handover contrôlé',
        'Moins de temps entre étapes',
        'Kit pour transfert et inspection',
      ],
    },
    'amr-cobot-modula-line-asservimento': {
      title: 'AMR + Cobot : connexion à Modula pour asservissement',
      familyLabel: 'AMR+Cobot / asservissement',
      heroCopy:
        'Si vous avez une ligne modulaire : un parcours pour asservir stations et transferts avec un kit prêt à configurer.',
      seoDescription:
        'Connexion AMR + Cobot à Modula pour asservissement : synchronise les tasks et le flux entre les modules.',
      bullets: [
        'Synchronisation entre modules',
        'Réduction des temps de setup',
        'Kit adapté aux lignes modulaires',
      ],
    },

    'humanoid-g1-object-handling-logistica': {
      title: 'Humanoïde G1 : object handling en logistique',
      familyLabel: 'Humanoïde / logistique',
      heroCopy:
        'Besoin de flexibilité : un humanoïde qui gère les objets en logistique et simplifie les prises et remises.',
      seoDescription:
        'Humanoïde type Unitree G1 pour l’handling en logistique : prise flexible, tâches répétables et gestion des parcours.',
      bullets: [
        'Préhension flexible et adaptative',
        'Tâches répétables avec layout variable',
        'Kit de développement pour tests rapides',
      ],
    },
    'humanoid-g1-automotive-line-side-delivery': {
      title: 'Humanoïde G1 : livraison line‑side (automotive)',
      familyLabel: 'Humanoïde / automobile',
      heroCopy:
        'Transport et livraison de matériaux pour soutenir les lignes automotive : moins d’actions manuelles, plus de continuité.',
      seoDescription:
        'Humanoïde G1 pour livraisons line‑side en automobile : tâches simples, vitesse opérationnelle et gestion de variantes.',
      bullets: [
        'Livraisons line‑side',
        'Gestion des variantes guidée',
        'Kit pour tâches simples mais fiables',
      ],
    },
    'humanoid-g1-general-purpose-platform-development': {
      title: 'Humanoïde G1 : general purpose & plateforme de développement',
      familyLabel: 'Humanoïde / développement',
      heroCopy:
        'Développer et valider : un écosystème prêt à itérer des applications de manipulation et des démonstrations.',
      seoDescription:
        'Plateforme de développement avec humanoïde G1 pour manipulation general purpose et prototypage rapide.',
      bullets: [
        'Manipulation general purpose',
        'Environnement prêt pour développement et démos',
        'Composants clés et accessoires',
      ],
    },

    'quadrupede-industrial-inspection-impianti': {
      title: 'Quadrupède : inspection industrielle des installations',
      familyLabel: 'Quadrupède / inspection',
      heroCopy:
        'Inspectez rapidement et de façon répétable : idéal pour les environnements complexes et pour réduire les temps d’arrêt de maintenance.',
      seoDescription:
        'Quadrupède pour inspection industrielle : surveillez les installations et réduisez les accès inutiles grâce à une plateforme mobile.',
      bullets: [
        'Inspection industrielle',
        'Réduction des accès et du temps',
        'Kit pour tâches de monitoring',
      ],
    },
    'quadrupede-power-inspection-utility-remote-areas': {
      title: 'Quadrupède : inspection power / utilités / zones éloignées',
      familyLabel: 'Quadrupède / power',
      heroCopy:
        'Quand il faut accès et autonomie : le quadrupède supporte les inspections dans les zones difficiles d’accès avec une sécurité renforcée.',
      seoDescription:
        'Quadrupède pour inspections power et utilities : atteindre les zones éloignées et réduire les risques et les temps d’intervention.',
      bullets: [
        'Inspections en zones éloignées',
        'Temps d’intervention réduit',
        'Kit conçu pour l’autonomie et la gestion de tâches',
      ],
    },
    'quadrupede-security-patrol': {
      title: 'Quadrupède : sécurité / patrouille',
      familyLabel: 'Quadrupède / sécurité',
      heroCopy:
        'Surveillance avec mobilité : patrouillez et inspectez avec une configuration qui supporte les procédures de contrôle et le reporting.',
      seoDescription:
        'Quadrupède pour sécurité et patrouille : monitoring et présence mobile pour zones et périmètres.',
      bullets: [
        'Patrouille et monitoring',
        'Réduction des risques aux accès',
        'Intégration capteurs et tâches',
      ],
    },
    'quadrupede-with-arm-valves-levers-small-interventions': {
      title: 'Quadrupède avec bras : vannes, leviers & petites interventions',
      familyLabel: 'Quadrupède + bras',
      heroCopy:
        'Allier mobilité et manipulation : quand il faut atteindre et intervenir précisément sur des composants.',
      seoDescription:
        'Quadrupède avec bras pour interventions localisées : gestion des vannes, leviers et tâches de maintenance légère.',
      bullets: [
        'Interventions localisées',
        'Moins de passages et moins d’actions manuelles',
        'Kit pour tâches légères et répétables',
      ],
    },
  },
  nl: {},
  no: {},
  es: {},
};
