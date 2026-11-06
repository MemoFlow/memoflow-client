import { articlePath, getArticles, isoDate, listed } from '../articles';
import { SITE } from '../site';

// Généré depuis la collection : pas de noindex (gabarit, page auteur sans bio), pas de pages de l'app.
// lastmod = dateModified réelle ; priority et changefreq omis (ignorés par Google).
export async function GET() {
  const articles = listed(await getArticles());
  const latest = articles.map((a) => a.data.dateModified).sort((a, b) => b.getTime() - a.getTime())[0];

  const urls = [
    { loc: `${SITE}/blog/`, lastmod: latest },
    ...articles.map((a) => ({ loc: `${SITE}${articlePath(a)}`, lastmod: a.data.dateModified })),
  ];

  const body = urls
    .map(({ loc, lastmod }) => `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${isoDate(lastmod)}</lastmod>` : ''}</url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
