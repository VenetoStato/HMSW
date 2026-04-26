import fs from 'node:fs/promises';
import path from 'node:path';
import type { Product } from './types';
import { SOLUTIONS } from './solutions';

const DATA_DIR = path.join(process.cwd(), 'data');

async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw) as T;
}

const VISIBLE_BRANDS = new Set(['Unitree', 'Accessori']);

export async function getProducts(): Promise<Product[]> {
  const filePath = path.join(DATA_DIR, 'products.json');
  const products = await readJsonFile<Product[]>(filePath);

  // Nel dataset possono finire componenti di terze parti (es. MIR/UR). 
  // Il sito deve però mostrare solo Unitree + Accessori.
  return products.filter((p) => {
    const b = (p.brand ?? '').trim();
    return VISIBLE_BRANDS.has(b);
  });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}


export async function getSolutions(): Promise<Array<{ slug: string; title: string; description: string }>> {
  return SOLUTIONS.map((s) => ({ slug: s.slug, title: s.title, description: s.seoDescription }));
}


export type BlogPost = {
  slug: string;
  title: string;
  solutionSlug?: string;
  excerpt: string;
  paragraphs: string[];
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  const solutions = await getSolutions();

  const bySlug: Record<string, { title: string; description: string }> = Object.fromEntries(
    solutions.map((s) => [s.slug, { title: s.title, description: s.description }])
  );

  const posts: BlogPost[] = [
    {
      slug: 'guida-quadrupedi-unitree-go2-b2-go1',
      solutionSlug: 'quadrupedi',
      title: 'Guida ai Quadrupedi Unitree: GO2, B2 e GO1 (e come scegliere gli accessori)',
      excerpt:
        'Stabilità, mobilità e un ecosistema pensato per ricerca e demo: scopri come configurare GO2/B2/GO1 e gli accessori che completano il setup.',
      paragraphs: [
        'I quadrupedi Unitree sono progettati per lavorare in modo fluido in contesti dinamici: dal testing in laboratorio alle dimostrazioni dal vivo.',
        'GO2, B2 e GO1 condividono un approccio “pronto all’integrazione”: scegli il modello che risponde alle tue esigenze di mobilità e durata, poi aggiungi gli accessori fondamentali.',
        'Nello shop trovi batterie, charger e componenti correlati per costruire un kit coerente: obiettivo = ridurre i tempi di setup e aumentare l’affidabilità in campo.',
        'Per iniziare: visita la soluzione Quadrupedi e seleziona i prodotti in base a scenario d’uso (demo, automazione, R&D).' 
      ]
    },
    {
      slug: 'braccia-gripper-z1-come-integrare-rapidamente',
      solutionSlug: 'braccia',
      title: 'Braccia & Gripper Unitree: Z1 e integrazione rapida (Z1 + accessori)',
      excerpt:
        'Presa, assemblaggio e manipolazione: una guida pratica per scegliere Z1 e completare il setup con i componenti più adatti.',
      paragraphs: [
        'Se stai progettando un sistema di manipolazione, la differenza la fanno l’interfacciamento e la coerenza tra braccio, componenti e accessori.',
        'Z1 è una base solida per implementare scenari di presa e assemblaggio con tempi di integrazione ridotti.',
        'Nel nostro catalogo trovi anche accessori e componenti correlati: l’obiettivo è darti una configurazione “pronta” per i tuoi prototipi.',
        'Parti dalla landing Braccia & Gripper: troverai i prodotti consigliati per soluzione.'
      ]
    },
    {
      slug: 'umanoidi-h2-educazione-rd-dimostrazioni',
      solutionSlug: 'umanoidi',
      title: 'Umanoidi Unitree: H2 per educazione, R&D e dimostrazioni',
      excerpt:
        'Costruisci prototipi e fai dimostrazioni con un ecosistema pensato per test e iterazioni veloci.',
      paragraphs: [
        'Gli umanoidi sono ideali quando vuoi combinare sperimentazione e apprendimento: H2 supporta scenari di training, prototipazione e dimostrazioni.',
        'In base alle tue attività (educazione, ricerca o proof-of-concept), puoi definire una configurazione focalizzata sullo scopo e completarla con gli accessori necessari.',
        'La soluzione Umanoidi è pensata per aiutarti a partire più rapidamente: seleziona i componenti e avvia i test.'
      ]
    },
    {
      slug: 'accessori-per-completare-il-tuo-setup',
      solutionSlug: 'accessori',
      title: 'Accessori per robot: batterie, charger e componenti chiave',
      excerpt:
        'Non solo il robot: i componenti giusti rendono il setup stabile, operativo e pronto alle attività quotidiane.',
      paragraphs: [
        'Ogni sistema robotico vive o muore in base a energia, sensori e componenti di supporto. Per questo gli accessori sono essenziali.',
        'Batterie, charger e componenti di alimentazione aiutano a mantenere prestazioni costanti e tempi di ripristino più rapidi.',
        'Nel catalogo Accessori trovi i prodotti per completare la tua configurazione: scegli in base a durata, scenario e necessità operative.'
      ]
    }
  ];

  return posts;
}
