import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CTA_TYPES, PILIERS, type Pilier } from './site';

const articles = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/articles' }),
  // strictObject : une clé mal orthographiée fait échouer le build au lieu d'être ignorée
  schema: z
    .strictObject({
      title: z.string().min(1).max(60),
      description: z.string().min(1).max(160),
      pilier: z.enum(Object.keys(PILIERS) as [Pilier, ...Pilier[]]),
      hub: z.boolean().default(false),
      datePublished: z.coerce.date(),
      dateModified: z.coerce.date(),
      sources: z.array(z.strictObject({ titre: z.string().min(1), url: z.url() })).min(2),
      cta: z.enum(CTA_TYPES),
      noindex: z.boolean().default(false),
    })
    .refine((d) => d.dateModified >= d.datePublished, {
      message: 'dateModified doit être postérieure ou égale à datePublished',
      path: ['dateModified'],
    }),
});

export const collections = { articles };
