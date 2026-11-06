import { getCollection, type CollectionEntry } from 'astro:content';
import type { Pilier } from './site';

export type Article = CollectionEntry<'articles'>;

export const articlePath = (a: Article) => `/blog/${a.id}/`;

/** Tous les articles, du plus récent au plus ancien */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('articles');
  return all.sort((a, b) => b.data.datePublished.getTime() - a.data.datePublished.getTime());
}

/** Ce qui apparaît dans les listes et le sitemap : jamais les noindex */
export const listed = (all: Article[]) => all.filter((a) => !a.data.noindex);

/** Le hub d'un pilier ; deux hubs sur le même pilier font échouer le build */
export function hubOf(all: Article[], pilier: Pilier): Article | undefined {
  const hubs = all.filter((a) => a.data.hub && a.data.pilier === pilier);
  if (hubs.length > 1) {
    throw new Error(`Plusieurs hubs pour le pilier ${pilier} : ${hubs.map((h) => h.id).join(', ')}`);
  }
  return hubs[0];
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
