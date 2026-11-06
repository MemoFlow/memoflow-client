// Nœuds JSON-LD partagés, reliés par @id. Rien d'inventé : pas de sameAs, pas d'image.
import { AUTHOR, ORG, SITE } from './site';

export const ORG_ID = `${SITE}/#organization`;
export const PERSON_ID = `${SITE}${AUTHOR.path}#person`;

export const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: ORG.name,
  url: ORG.url,
  logo: ORG.logo,
};

export const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: AUTHOR.name,
  url: `${SITE}${AUTHOR.path}`,
};

export type Crumb = { name: string; path: string };

export const breadcrumbList = (crumbs: Crumb[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: `${SITE}${c.path}`,
  })),
});
