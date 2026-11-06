// Constantes partagées du blog. Le domaine vient de `site` dans astro.config.mjs.
export const SITE = import.meta.env.SITE.replace(/\/$/, '');

export const ORG = {
  name: 'MemoFlow',
  url: `${SITE}/`,
  logo: `${SITE}/favicon.svg`,
};

export const AUTHOR = {
  name: 'François Hatem',
  path: '/blog/auteur/francois-hatem/',
};

export const PILIERS = {
  'rapport-d-alternance': "Rapport d'alternance",
  'rediger-un-memoire': 'Rédiger un mémoire',
  'rapport-de-stage': 'Rapport de stage',
  'ia-memoire': 'IA et écrits académiques',
} as const;
export type Pilier = keyof typeof PILIERS;

// Chaque CTA renvoie à une fonction vérifiée dans docs/seo/product-facts.md
export const CTA_TYPES = ['connecteurs', 'planificateur', 'harvard', 'generique'] as const;
